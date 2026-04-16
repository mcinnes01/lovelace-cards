import { html, LitElement, css, TemplateResult, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CoverPanelCardConfig, CoverBlindConfig, TargetSelectorValue } from "./cover-panel-card-config";

// ── Resolved blind (one entity per card column) ──────────────────────
interface ResolvedBlind {
  entityId: string;
  label: string;
  tiltDownPct: number;
  tiltUpPct: number;
}

@customElement("cover-panel-card")
export class CoverPanelCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: CoverPanelCardConfig;
  // per-entity drag state: entityId → current drag tilt (0-100)
  @state() private _dragTilt: Record<string, number> = {};
  @state() private _dragging: Record<string, boolean> = {};

  public setConfig(config: CoverPanelCardConfig): void {
    this.config = config;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("cover-panel-card-editor");
  }

  public static getStubConfig(): CoverPanelCardConfig {
    return {
      type: "custom:cover-panel-card",
      title: "Cover Control",
      blinds: [{ targets: {}, tilt_down_pct: 25, tilt_up_pct: 75 }],
    };
  }

  public getCardSize(): number {
    return 5;
  }

  // ── Entity resolution ──────────────────────────────────────────────

  private _toArray(val: unknown): string[] {
    return Array.isArray(val) ? val : typeof val === "string" ? [val] : [];
  }

  private _resolveEntities(blindCfg: CoverBlindConfig): string[] {
    if (!this.hass) return [];
    const targets = blindCfg.targets || {};
    const direct = this._toArray(targets.entity_id);
    if (direct.length) return direct;
    if (blindCfg.entity) return [blindCfg.entity];

    const areaIds = this._toArray(targets.area_id);
    const labelIds = this._toArray(targets.label_id);
    const matched = new Set<string>();

    Object.keys(this.hass.states).forEach((entityId) => {
      if (!entityId.startsWith("cover.")) return;
      if (areaIds.length > 0) {
        const reg = this.hass.entities?.[entityId];
        const areaId = reg?.area_id;
        if (areaId && areaIds.includes(areaId)) { matched.add(entityId); return; }
        const deviceId = reg?.device_id;
        if (deviceId && this.hass.devices?.[deviceId]) {
          const devArea = this.hass.devices[deviceId].area_id;
          if (devArea && areaIds.includes(devArea)) { matched.add(entityId); return; }
        }
      }
      if (labelIds.length > 0) {
        const labels = this.hass.entities?.[entityId]?.labels || [];
        if (Array.isArray(labels) && labels.some((l: string) => labelIds.includes(l))) {
          matched.add(entityId);
        }
      }
    });
    return Array.from(matched);
  }

  private _resolveAllBlinds(): ResolvedBlind[] {
    if (!this.config?.blinds) return [];
    const result: ResolvedBlind[] = [];
    const seen = new Set<string>();

    this.config.blinds.forEach((bc, idx) => {
      const entities = this._resolveEntities(bc);
      entities.forEach((entityId) => {
        if (seen.has(entityId)) return;
        seen.add(entityId);
        const name =
          bc.label ||
          this.hass?.states[entityId]?.attributes?.friendly_name ||
          entityId.split(".").pop() ||
          entityId;
        result.push({
          entityId,
          label: name,
          tiltDownPct: bc.tilt_down_pct ?? 25,
          tiltUpPct: bc.tilt_up_pct ?? 75,
        });
      });
      // If no entities resolved yet but we have a blind config, show placeholder
      if (entities.length === 0) {
        result.push({
          entityId: `__placeholder_${idx}`,
          label: bc.label || `Blind ${idx + 1}`,
          tiltDownPct: bc.tilt_down_pct ?? 25,
          tiltUpPct: bc.tilt_up_pct ?? 75,
        });
      }
    });
    return result;
  }

  // ── Related entity lookup (battery, light sensor) ─────────────────

  private _findRelatedEntity(coverEntityId: string, deviceClass: string): string | null {
    if (!this.hass) return null;
    const reg = this.hass.entities?.[coverEntityId];
    const deviceId = reg?.device_id;
    if (!deviceId) return null;
    // Find sensor with matching device_class on same device
    for (const [entityId, entry] of Object.entries(this.hass.entities || {})) {
      const e = entry as any;
      if (e.device_id !== deviceId) continue;
      const state = this.hass.states[entityId];
      if (!state) continue;
      if (state.attributes?.device_class === deviceClass) return entityId;
    }
    return null;
  }

  // ── Tilt helpers ───────────────────────────────────────────────────

  private _getTilt(entityId: string): number {
    if (this._dragging[entityId]) return this._dragTilt[entityId] ?? 50;
    const tiltPct = this.hass?.states[entityId]?.attributes?.current_tilt_position;
    if (tiltPct !== undefined) return tiltPct;
    // Fall back to position as rough proxy
    return this.hass?.states[entityId]?.attributes?.current_position ?? 50;
  }

  private _setTilt(entityId: string, tilt: number): void {
    if (!this.hass) return;
    this.hass.callService("cover", "set_cover_tilt_position", {
      entity_id: entityId,
      tilt_position: Math.round(tilt),
    });
  }

  private _setPreset(entityId: string, preset: "closed_down" | "open" | "closed_up" | "angled_down" | "angled_up", tiltDownPct: number, tiltUpPct: number): void {
    if (!this.hass) return;
    const tiltMap: Record<string, number> = {
      closed_down: 0,
      open: 50,
      closed_up: 100,
      angled_down: tiltDownPct,
      angled_up: tiltUpPct,
    };
    const tilt = tiltMap[preset];
    this.hass.callService("cover", "set_cover_tilt_position", {
      entity_id: entityId,
      tilt_position: tilt,
    });
  }

  // ── Drag handling ──────────────────────────────────────────────────

  private _onDragPointerDown(e: PointerEvent, entityId: string, track: HTMLElement): void {
    track.setPointerCapture(e.pointerId);
    this._dragging = { ...this._dragging, [entityId]: true };
    this._dragTilt = { ...this._dragTilt, [entityId]: this._getTilt(entityId) };
    this._updateDragFromEvent(e, entityId, track);
  }

  private _onDragPointerMove(e: PointerEvent, entityId: string, track: HTMLElement): void {
    if (!this._dragging[entityId]) return;
    this._updateDragFromEvent(e, entityId, track);
  }

  private _onDragPointerUp(e: PointerEvent, entityId: string, track: HTMLElement): void {
    if (!this._dragging[entityId]) return;
    this._updateDragFromEvent(e, entityId, track);
    const tilt = this._dragTilt[entityId] ?? 50;
    this._dragging = { ...this._dragging, [entityId]: false };
    this._setTilt(entityId, tilt);
  }

  private _updateDragFromEvent(e: PointerEvent, entityId: string, track: HTMLElement): void {
    const rect = track.getBoundingClientRect();
    // 0 = top (closed down), 100 = bottom (closed up) mapping:
    // We invert so dragging UP = higher tilt (more open towards up)
    const rawY = e.clientY - rect.top;
    const pct = Math.max(0, Math.min(100, (rawY / rect.height) * 100));
    // Invert: top of track = 100 (closed up), bottom = 0 (closed down)
    const tilt = Math.round(100 - pct);
    this._dragTilt = { ...this._dragTilt, [entityId]: tilt };
    this.requestUpdate();
  }

  // ── SVG slat animation ─────────────────────────────────────────────

  private _renderSlats(tilt: number): TemplateResult {
    // tilt 0 = closed horizontal (facing down), 50 = fully open, 100 = closed (facing up)
    // We map tilt 0..100 → angle −80..+80 degrees (negative = down-facing, positive = up-facing)
    const angleDeg = (tilt / 100) * 160 - 80;
    const rad = (angleDeg * Math.PI) / 180;
    const W = 100; // SVG viewBox width
    const H = 200; // SVG viewBox height
    const slatCount = 9;
    const slatSpacing = H / (slatCount + 1);
    const halfW = W / 2;
    const slatThickness = 4;
    // Each slat is a rotated rectangle centred at (50, y)
    const slats = Array.from({ length: slatCount }, (_, i) => {
      const cy = slatSpacing * (i + 1);
      return svg`
        <rect
          x="${halfW - 44}"
          y="${cy - slatThickness / 2}"
          width="88"
          height="${slatThickness}"
          rx="2"
          transform="rotate(${angleDeg} ${halfW} ${cy})"
          fill="rgba(180,190,210,0.9)"
          stroke="rgba(130,140,160,0.6)"
          stroke-width="0.5"
        />
      `;
    });

    // Vertical rail lines
    const rails = [10, 90].map(
      (x) => svg`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(150,160,180,0.4)" stroke-width="1.5"/>`
    );

    return html`
      <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="slat-svg">
        ${rails}
        ${slats}
      </svg>
    `;
  }

  // ── Rendering ──────────────────────────────────────────────────────

  protected render(): TemplateResult {
    if (!this.hass || !this.config) return html`<div>Loading...</div>`;

    const title = this.config.title || "Cover Control";
    const blinds = this._resolveAllBlinds();
    const illuminanceEntityId = this.config.illuminance_entity;
    const illuminanceState = illuminanceEntityId ? this.hass.states[illuminanceEntityId] : null;

    return html`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${title}</h2>

          ${illuminanceState
            ? html`
                <div class="room-sensor-row">
                  <ha-icon icon="mdi:brightness-5" class="sensor-icon"></ha-icon>
                  <span class="sensor-label">${illuminanceState.attributes?.friendly_name || "Illuminance"}</span>
                  <span class="sensor-value">${illuminanceState.state} ${illuminanceState.attributes?.unit_of_measurement || "lx"}</span>
                </div>
              `
            : nothing}

          <div class="blinds-row ${blinds.length === 1 ? "single" : ""}">
            ${blinds.map((b) => this._renderBlind(b))}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderBlind(blind: ResolvedBlind): TemplateResult {
    const isPlaceholder = blind.entityId.startsWith("__placeholder_");
    const state = isPlaceholder ? null : this.hass?.states[blind.entityId];
    const tilt = isPlaceholder ? 50 : this._getTilt(blind.entityId);
    const isDragging = this._dragging[blind.entityId] ?? false;

    // Related entities
    const batteryEntityId = isPlaceholder ? null : this._findRelatedEntity(blind.entityId, "battery");
    const lightEntityId = isPlaceholder ? null : this._findRelatedEntity(blind.entityId, "illuminance");
    const batteryState = batteryEntityId ? this.hass?.states[batteryEntityId] : null;
    const lightState = lightEntityId ? this.hass?.states[lightEntityId] : null;

    const batteryPct = batteryState ? Number(batteryState.state) : null;
    const batteryIcon = batteryPct === null
      ? "mdi:battery-unknown"
      : batteryPct > 80
        ? "mdi:battery"
        : batteryPct > 60
          ? "mdi:battery-80"
          : batteryPct > 40
            ? "mdi:battery-60"
            : batteryPct > 20
              ? "mdi:battery-40"
              : "mdi:battery-20";
    const batteryClass = batteryPct !== null && batteryPct <= 20 ? "low" : batteryPct !== null && batteryPct <= 40 ? "medium" : "";

    return html`
      <div class="blind-col">

        <!-- Sensor badges -->
        <div class="sensor-badges">
          ${batteryState !== null
            ? html`
                <div class="sensor-badge battery ${batteryClass}">
                  <ha-icon .icon=${batteryIcon}></ha-icon>
                  <span>${batteryPct}%</span>
                </div>
              `
            : nothing}
          ${lightState !== null
            ? html`
                <div class="sensor-badge light-lux">
                  <ha-icon icon="mdi:brightness-6"></ha-icon>
                  <span>${lightState.state} ${lightState.attributes?.unit_of_measurement || "lx"}</span>
                </div>
              `
            : nothing}
        </div>

        <!-- Blind label -->
        <div class="blind-label">${blind.label}</div>

        <!-- Slat visualisation + drag track -->
        <div
          class="blind-visual-wrap"
          @pointerdown=${(e: PointerEvent) =>
            isPlaceholder ? null : this._onDragPointerDown(e, blind.entityId, e.currentTarget as HTMLElement)}
          @pointermove=${(e: PointerEvent) =>
            isPlaceholder ? null : this._onDragPointerMove(e, blind.entityId, e.currentTarget as HTMLElement)}
          @pointerup=${(e: PointerEvent) =>
            isPlaceholder ? null : this._onDragPointerUp(e, blind.entityId, e.currentTarget as HTMLElement)}
          style="touch-action: none;"
        >
          ${this._renderSlats(tilt)}
          <!-- Drag handle overlay -->
          <div class="drag-handle" style="top: ${100 - tilt}%">
            <div class="drag-pill ${isDragging ? "dragging" : ""}"></div>
          </div>
        </div>

        <!-- Tilt readout -->
        <div class="tilt-readout">
          <span class="tilt-pct">${Math.round(tilt)}%</span>
          <span class="tilt-desc">${this._tiltDescription(tilt)}</span>
        </div>

        <!-- Preset buttons -->
        <div class="preset-buttons">
          <button class="preset-btn" @click=${() => isPlaceholder ? null : this._setPreset(blind.entityId, "closed_down", blind.tiltDownPct, blind.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal-closed"></ha-icon>
            <span>Closed Down</span>
          </button>
          <button class="preset-btn full-open" @click=${() => isPlaceholder ? null : this._setPreset(blind.entityId, "open", blind.tiltDownPct, blind.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal"></ha-icon>
            <span>Full Open</span>
          </button>
          <button class="preset-btn" @click=${() => isPlaceholder ? null : this._setPreset(blind.entityId, "closed_up", blind.tiltDownPct, blind.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal-closed"></ha-icon>
            <span>Closed Up</span>
          </button>
        </div>

        <div class="preset-buttons secondary">
          <button class="preset-btn angled" @click=${() => isPlaceholder ? null : this._setPreset(blind.entityId, "angled_down", blind.tiltDownPct, blind.tiltUpPct)}>
            <ha-icon icon="mdi:angle-acute"></ha-icon>
            <span>${blind.tiltDownPct}% Down</span>
          </button>
          <button class="preset-btn angled" @click=${() => isPlaceholder ? null : this._setPreset(blind.entityId, "angled_up", blind.tiltDownPct, blind.tiltUpPct)}>
            <ha-icon icon="mdi:angle-obtuse"></ha-icon>
            <span>${blind.tiltUpPct}% Up</span>
          </button>
        </div>

      </div>
    `;
  }

  private _tiltDescription(tilt: number): string {
    if (tilt <= 5) return "Closed Down";
    if (tilt <= 30) return "Angled Down";
    if (tilt >= 45 && tilt <= 55) return "Full Open";
    if (tilt >= 70) return tilt >= 95 ? "Closed Up" : "Angled Up";
    return tilt < 50 ? "Slightly Down" : "Slightly Up";
  }

  // ── Styles ─────────────────────────────────────────────────────────

  static styles = css`
    :host {
      --panel-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --panel-text: var(--primary-text-color, #fff);
      --panel-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
      --blue-dim: rgba(100, 150, 220, 0.15);
      --blue-glow: rgba(100, 150, 220, 0.5);
      --blue-bright: #6496dc;
    }

    ha-card {
      background: var(--panel-bg);
      border-radius: 12px;
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .title {
      margin: 0;
      font-size: 1.25em;
      font-weight: 600;
      color: var(--panel-text);
    }

    /* ── Room sensor row ───────────────────────── */
    .room-sensor-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--blue-dim);
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 0.88em;
    }

    .sensor-icon {
      --mdc-icon-size: 18px;
      color: var(--blue-bright);
    }

    .sensor-label {
      flex: 1;
      color: var(--panel-text);
    }

    .sensor-value {
      font-weight: 600;
      color: var(--panel-text);
    }

    /* ── Blinds row layout ─────────────────────── */
    .blinds-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .blinds-row.single {
      justify-content: center;
    }

    .blind-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    /* ── Sensor badges ─────────────────────────── */
    .sensor-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .sensor-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 0.75em;
      font-weight: 600;
    }

    .sensor-badge ha-icon {
      --mdc-icon-size: 14px;
    }

    .sensor-badge.battery {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    .sensor-badge.battery.medium {
      background: rgba(255, 152, 0, 0.2);
      color: #ff9800;
    }

    .sensor-badge.battery.low {
      background: rgba(244, 67, 54, 0.2);
      color: #f44336;
    }

    .sensor-badge.light-lux {
      background: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }

    /* ── Blind label ───────────────────────────── */
    .blind-label {
      font-size: 0.85em;
      font-weight: 600;
      color: var(--panel-text);
      text-align: center;
    }

    /* ── Slat visualisation ────────────────────── */
    .blind-visual-wrap {
      position: relative;
      width: 100%;
      max-width: 140px;
      cursor: ns-resize;
      user-select: none;
      -webkit-user-select: none;
      background: rgba(180, 190, 210, 0.06);
      border-radius: 6px;
      border: 1px solid rgba(180, 190, 210, 0.12);
      overflow: hidden;
    }

    .slat-svg {
      display: block;
      width: 100%;
      height: auto;
    }

    .drag-handle {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: top 0.1s ease-out;
    }

    .drag-pill {
      width: 32px;
      height: 6px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 3px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
      transition: background 0.15s;
    }

    .drag-pill.dragging {
      background: var(--blue-bright);
      box-shadow: 0 0 8px var(--blue-glow);
    }

    /* ── Tilt readout ──────────────────────────── */
    .tilt-readout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
    }

    .tilt-pct {
      font-size: 1.1em;
      font-weight: 700;
      color: var(--panel-text);
    }

    .tilt-desc {
      font-size: 0.72em;
      color: var(--panel-secondary);
    }

    /* ── Preset buttons ────────────────────────── */
    .preset-buttons {
      display: flex;
      gap: 4px;
      width: 100%;
      justify-content: center;
    }

    .preset-buttons.secondary {
      gap: 6px;
    }

    .preset-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px 4px;
      border: 1px solid rgba(180, 190, 210, 0.2);
      border-radius: 10px;
      background: rgba(180, 190, 210, 0.08);
      color: var(--panel-text);
      cursor: pointer;
      font-size: 0.68em;
      font-weight: 600;
      text-align: center;
      transition: background 0.15s, transform 0.1s;
      line-height: 1.2;
    }

    .preset-btn ha-icon {
      --mdc-icon-size: 18px;
    }

    .preset-btn:active {
      transform: scale(0.93);
    }

    .preset-btn:hover {
      background: rgba(180, 190, 210, 0.18);
    }

    .preset-btn.full-open {
      background: var(--blue-dim);
      border-color: rgba(100, 150, 220, 0.3);
      color: var(--blue-bright);
    }

    .preset-btn.angled {
      background: rgba(255, 193, 7, 0.1);
      border-color: rgba(255, 193, 7, 0.25);
      color: #ffc107;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cover-panel-card": CoverPanelCard;
  }
}
