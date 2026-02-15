import { html, LitElement, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  LightPanelCardConfig,
  LightPanelSectionConfig,
  DEFAULT_TEMP_PRESETS,
  DEFAULT_COLOR_PRESETS,
  ColorTempPreset,
  RGBColorPreset,
} from "./light-panel-card-config";

type SectionTab = "all" | "lights" | "lamps" | "accents";

interface TabDef {
  key: SectionTab;
  label: string;
  icon: string;
  entityKey: keyof LightPanelCardConfig;
}

const TABS: TabDef[] = [
  { key: "all", label: "All", icon: "mdi:lightbulb-group", entityKey: "lights" },
  { key: "lights", label: "Light", icon: "mdi:ceiling-light", entityKey: "lights" },
  { key: "lamps", label: "Lamps", icon: "mdi:lamp", entityKey: "lamps" },
  { key: "accents", label: "Accent", icon: "mdi:led-strip-variant", entityKey: "accents" },
];

@customElement("light-panel-card")
export class LightPanelCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;
  @state() private activeTab: SectionTab = "all";

  public setConfig(config: LightPanelCardConfig): void {
    this.config = config;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("light-panel-card-editor");
  }

  public static getStubConfig(): LightPanelCardConfig {
    return {
      type: "custom:light-panel-card",
      title: "Light Control Panel",
      lights: { targets: {} },
      lamps: { targets: {} },
      accents: { targets: {} },
      scenes: { targets: {} },
    };
  }

  public getCardSize(): number {
    return 6;
  }

  // ─── Helpers ───────────────────────────────────────────────────────

  private toArray(val: unknown): string[] {
    return Array.isArray(val) ? val : typeof val === "string" ? [val] : [];
  }

  private getSectionEntities(sectionKey: keyof LightPanelCardConfig, domain: string): string[] {
    if (!this.hass || !this.config) return [];
    const section = (this.config[sectionKey] as LightPanelSectionConfig) || {};
    const targets = section.targets || {};

    const directEntities = this.toArray(targets.entity_id).length
      ? this.toArray(targets.entity_id)
      : this.toArray(section.entities);

    const areaIds = this.toArray(targets.area_id).length
      ? this.toArray(targets.area_id)
      : this.toArray(section.area);

    const labelIds = this.toArray(targets.label_id);

    if (directEntities.length === 0 && areaIds.length === 0 && labelIds.length === 0) {
      return [];
    }

    const matched = new Set(directEntities);

    if (areaIds.length > 0 || labelIds.length > 0) {
      Object.keys(this.hass.states).forEach((entityId) => {
        if (!entityId.startsWith(`${domain}.`)) return;

        if (areaIds.length > 0) {
          const entityReg = this.hass.entities?.[entityId];
          const entityAreaId = entityReg?.area_id;
          if (entityAreaId && areaIds.includes(entityAreaId)) {
            matched.add(entityId);
            return;
          }
          const deviceId = entityReg?.device_id;
          if (deviceId && this.hass.devices?.[deviceId]) {
            const deviceAreaId = this.hass.devices[deviceId].area_id;
            if (deviceAreaId && areaIds.includes(deviceAreaId)) {
              matched.add(entityId);
              return;
            }
          }
        }

        if (labelIds.length > 0) {
          const entityReg = this.hass.entities?.[entityId];
          const labels = entityReg?.labels || [];
          if (Array.isArray(labels) && labels.some((l: string) => labelIds.includes(l))) {
            matched.add(entityId);
          }
        }
      });
    }

    return Array.from(matched);
  }

  private getAllLightEntities(): string[] {
    const lights = this.getSectionEntities("lights", "light");
    const lamps = this.getSectionEntities("lamps", "light");
    const accents = this.getSectionEntities("accents", "light");
    const seen = new Set<string>();
    const result: string[] = [];
    [...lights, ...lamps, ...accents].forEach((e) => {
      if (!seen.has(e)) {
        seen.add(e);
        result.push(e);
      }
    });
    return result;
  }

  private getActiveEntities(): string[] {
    switch (this.activeTab) {
      case "lights":
        return this.getSectionEntities("lights", "light");
      case "lamps":
        return this.getSectionEntities("lamps", "light");
      case "accents":
        return this.getSectionEntities("accents", "light");
      case "all":
      default:
        return this.getAllLightEntities();
    }
  }

  private isAnyOn(entities: string[]): boolean {
    return entities.some((e) => this.hass?.states[e]?.state === "on");
  }

  private getAverageBrightness(entities: string[]): number {
    const onEntities = entities.filter((e) => this.hass?.states[e]?.state === "on");
    if (onEntities.length === 0) return 0;
    const total = onEntities.reduce((sum, e) => {
      const br = this.hass?.states[e]?.attributes?.brightness || 0;
      return sum + br;
    }, 0);
    return Math.round((total / onEntities.length / 255) * 100);
  }

  private supportsColorTemp(entities: string[]): boolean {
    return entities.some((e) => {
      const modes = this.hass?.states[e]?.attributes?.supported_color_modes || [];
      return modes.includes("color_temp");
    });
  }

  private supportsColor(entities: string[]): boolean {
    return entities.some((e) => {
      const modes = this.hass?.states[e]?.attributes?.supported_color_modes || [];
      return modes.includes("hs") || modes.includes("rgb") || modes.includes("xy");
    });
  }

  // ─── Actions ───────────────────────────────────────────────────────

  private toggleEntities(entities: string[]): void {
    if (!this.hass) return;
    const anyOn = this.isAnyOn(entities);
    const action = anyOn ? "turn_off" : "turn_on";
    entities.forEach((entity) => {
      this.hass!.callService("light", action, { entity_id: entity });
    });
  }

  private setBrightnessAll(entities: string[], brightness: number): void {
    if (!this.hass) return;
    entities.forEach((entity) => {
      this.hass!.callService("light", "turn_on", {
        entity_id: entity,
        brightness: Math.round((brightness / 100) * 255),
      });
    });
  }

  private setColorTempAll(entities: string[], kelvin: number): void {
    if (!this.hass) return;
    entities.forEach((entity) => {
      const modes = this.hass?.states[entity]?.attributes?.supported_color_modes || [];
      if (modes.includes("color_temp")) {
        this.hass!.callService("light", "turn_on", {
          entity_id: entity,
          color_temp_kelvin: kelvin,
          brightness_pct: 100,
        });
      }
    });
  }

  private setRGBAll(entities: string[], color: [number, number, number]): void {
    if (!this.hass) return;
    entities.forEach((entity) => {
      const modes = this.hass?.states[entity]?.attributes?.supported_color_modes || [];
      if (modes.includes("hs") || modes.includes("rgb") || modes.includes("xy")) {
        this.hass!.callService("light", "turn_on", {
          entity_id: entity,
          rgb_color: color,
          brightness_pct: 100,
        });
      }
    });
  }

  private activateScene(entity: string): void {
    if (!this.hass) return;
    this.hass.callService("scene", "turn_on", { entity_id: entity });
  }

  // ─── Rendering ─────────────────────────────────────────────────────

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const title = this.config.title || "Light Control Panel";
    const activeEntities = this.getActiveEntities();
    const sceneEntities = this.getSectionEntities("scenes", "scene");
    const showTabs = this.config.show_section_tabs !== false;
    const showBrightness = this.config.show_brightness !== false;
    const showColorTemp = this.config.show_color_temp !== false;
    const showTempPresets = this.config.show_temp_presets !== false;
    const showColorPresets = this.config.show_color_presets !== false;

    return html`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${title}</h2>

          ${showTabs ? this.renderTabs() : nothing}

          ${activeEntities.length > 0
            ? html`
                ${showBrightness ? this.renderBrightnessSlider(activeEntities) : nothing}
                ${showColorTemp && this.supportsColorTemp(activeEntities)
                  ? this.renderColorTempSlider(activeEntities)
                  : nothing}
                ${showTempPresets && this.supportsColorTemp(activeEntities)
                  ? this.renderTempPresets(activeEntities)
                  : nothing}
                ${showColorPresets && this.supportsColor(activeEntities)
                  ? this.renderColorPresets(activeEntities)
                  : nothing}
              `
            : html`<div class="empty-state">No lights configured for this section</div>`}

          ${sceneEntities.length > 0 ? this.renderSceneButtons(sceneEntities) : nothing}
        </div>
      </ha-card>
    `;
  }

  // ─── Section Tabs ──────────────────────────────────────────────────

  private renderTabs(): TemplateResult {
    return html`
      <div class="tab-bar">
        ${TABS.map((tab) => {
          const entities = tab.key === "all"
            ? this.getAllLightEntities()
            : this.getSectionEntities(tab.entityKey, "light");
          const isActive = this.activeTab === tab.key;
          const anyOn = this.isAnyOn(entities);

          return html`
            <button
              class="tab-btn ${isActive ? "active" : ""} ${anyOn ? "on" : "off"}"
              @click=${() => { this.activeTab = tab.key; }}
            >
              <ha-icon .icon=${tab.icon}></ha-icon>
              <span>${tab.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  // ─── Brightness Slider ────────────────────────────────────────────

  private renderBrightnessSlider(entities: string[]): TemplateResult {
    const brightnessPercent = this.getAverageBrightness(entities);
    const anyOn = this.isAnyOn(entities);

    return html`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:brightness-6" class="slider-icon ${anyOn ? "on" : ""}"></ha-icon>
          <div class="slider-info">
            <span class="slider-label">Brightness</span>
            <span class="slider-value">${brightnessPercent}%</span>
          </div>
        </div>
        <div class="slider-track brightness-track">
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(brightnessPercent)}
            @input=${(e: Event) => {
              const val = Number((e.target as HTMLInputElement).value);
              this.setBrightnessAll(entities, val);
            }}
          />
          <div class="slider-fill brightness-fill" style="width: ${brightnessPercent}%"></div>
        </div>
      </div>
    `;
  }

  // ─── Color Temperature Slider ─────────────────────────────────────

  private renderColorTempSlider(entities: string[]): TemplateResult {
    // Get average color temp as percentage (2700K = warm/right, 6500K = cool/left)
    const onEntities = entities.filter((e) => this.hass?.states[e]?.state === "on");
    let tempPercent = 50;
    if (onEntities.length > 0) {
      const totalKelvin = onEntities.reduce((sum, e) => {
        const k = this.hass?.states[e]?.attributes?.color_temp_kelvin || 4000;
        return sum + k;
      }, 0);
      const avgKelvin = totalKelvin / onEntities.length;
      // Map kelvin 2700-6500 to 0-100 percent
      tempPercent = Math.round(((avgKelvin - 2700) / (6500 - 2700)) * 100);
    }

    return html`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:thermometer" class="slider-icon on"></ha-icon>
          <div class="slider-info">
            <span class="slider-label">Color Temperature</span>
            <span class="slider-value">${tempPercent}%</span>
          </div>
        </div>
        <div class="slider-track temp-track">
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(tempPercent)}
            @input=${(e: Event) => {
              const val = Number((e.target as HTMLInputElement).value);
              const kelvin = Math.round(2700 + (val / 100) * (6500 - 2700));
              this.setColorTempAll(entities, kelvin);
            }}
          />
          <div class="slider-fill temp-fill" style="width: ${tempPercent}%"></div>
        </div>
      </div>
    `;
  }

  // ─── Temperature Presets ──────────────────────────────────────────

  private renderTempPresets(entities: string[]): TemplateResult {
    const presets = this.config?.color_temp_presets || DEFAULT_TEMP_PRESETS;
    return html`
      <div class="preset-row">
        ${presets.map(
          (p: ColorTempPreset) => html`
            <button
              class="preset-btn temp-preset"
              style="background: ${p.color}; color: ${p.text_color || "#fff"}"
              @click=${() => this.setColorTempAll(entities, p.kelvin)}
            >
              <ha-icon icon="mdi:lamp" class="preset-icon"></ha-icon>
              <span>${p.name}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  // ─── Color Presets ────────────────────────────────────────────────

  private renderColorPresets(entities: string[]): TemplateResult {
    const presets = this.config?.color_presets || DEFAULT_COLOR_PRESETS;
    return html`
      <div class="preset-row">
        ${presets.map(
          (p: RGBColorPreset) => html`
            <button
              class="preset-btn color-preset"
              style="background: ${p.background}; color: #fff"
              @click=${() => this.setRGBAll(entities, p.color)}
            >
              ${p.name}
            </button>
          `
        )}
      </div>
    `;
  }

  // ─── Scene Buttons ────────────────────────────────────────────────

  private renderSceneButtons(entities: string[]): TemplateResult {
    return html`
      <div class="scene-section">
        <div class="scene-row">
          ${entities.map((entity) => {
            const state = this.hass!.states[entity];
            if (!state || state.state === "unavailable" || state.state === "unknown") {
              return nothing;
            }
            const name = state.attributes?.friendly_name || entity.split(".").pop() || entity;
            const icon = state.attributes?.icon || "mdi:palette";

            return html`
              <button
                class="scene-btn"
                @click=${() => this.activateScene(entity)}
              >
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ─── Styles ────────────────────────────────────────────────────────

  static styles = css`
    :host {
      --panel-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --panel-radius: 12px;
      --panel-text: var(--primary-text-color, #fff);
      --panel-secondary: var(--secondary-text-color, rgba(255,255,255,0.6));
      --amber-glow: rgba(255, 193, 7, 0.5);
      --grey-dim: rgba(128, 128, 128, 0.2);
      --scene-green: rgba(76, 175, 80, 0.3);
    }

    ha-card {
      background: var(--panel-bg);
      border-radius: var(--panel-radius);
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
      font-size: 1.3em;
      font-weight: 600;
      color: var(--panel-text);
    }

    .empty-state {
      color: var(--panel-secondary);
      text-align: center;
      padding: 16px;
    }

    /* ── Section Tabs ───────────────────────────── */
    .tab-bar {
      display: flex;
      gap: 8px;
    }

    .tab-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 8px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 0.8em;
      font-weight: 600;
      transition: background 0.2s, transform 0.1s;
      background: var(--grey-dim);
      color: var(--panel-secondary);
    }

    .tab-btn:active {
      transform: scale(0.95);
    }

    .tab-btn.active {
      background: var(--amber-glow);
      color: var(--panel-text);
    }

    .tab-btn.on:not(.active) {
      background: rgba(255, 193, 7, 0.2);
      color: var(--panel-text);
    }

    .tab-btn ha-icon {
      --mdc-icon-size: 24px;
      color: inherit;
    }

    /* ── Slider Card ────────────────────────────── */
    .slider-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 14px 16px;
    }

    .slider-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .slider-icon {
      --mdc-icon-size: 22px;
      color: var(--panel-secondary);
    }

    .slider-icon.on {
      color: #ffc107;
    }

    .slider-info {
      display: flex;
      flex-direction: column;
    }

    .slider-label {
      font-size: 0.9em;
      font-weight: 500;
      color: var(--panel-text);
    }

    .slider-value {
      font-size: 0.75em;
      color: var(--panel-secondary);
    }

    .slider-track {
      position: relative;
      height: 28px;
      border-radius: 14px;
      overflow: hidden;
    }

    .brightness-track {
      background: linear-gradient(90deg,
        rgba(50,50,50,0.6) 0%,
        rgba(255,193,7,0.3) 50%,
        rgba(255,152,0,0.8) 100%
      );
    }

    .temp-track {
      background: linear-gradient(90deg,
        rgba(255,152,0,0.8) 0%,
        rgba(255,200,100,0.5) 30%,
        rgba(255,255,255,0.4) 60%,
        rgba(135,206,250,0.6) 100%
      );
    }

    .slider-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 14px;
      pointer-events: none;
      transition: width 0.1s ease-out;
    }

    .brightness-fill {
      background: linear-gradient(90deg,
        rgba(255,152,0,0.9) 0%,
        rgba(255,193,7,0.95) 100%
      );
    }

    .temp-fill {
      background: transparent;
    }

    .slider-track input[type="range"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
      z-index: 2;
    }

    .slider-track input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 28px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      border: none;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    }

    .slider-track input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 28px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      border: none;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    }

    /* ── Preset Buttons ─────────────────────────── */
    .preset-row {
      display: flex;
      gap: 6px;
    }

    .preset-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 10px 6px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.78em;
      font-weight: 600;
      transition: transform 0.1s, filter 0.1s;
    }

    .preset-btn:active {
      transform: scale(0.93);
    }

    .preset-btn:hover {
      filter: brightness(1.15);
    }

    .temp-preset .preset-icon {
      --mdc-icon-size: 22px;
    }

    .color-preset {
      padding: 10px 6px;
      font-size: 0.8em;
    }

    /* ── Scene Buttons ──────────────────────────── */
    .scene-section {
      margin-top: 4px;
    }

    .scene-row {
      display: flex;
      gap: 8px;
    }

    .scene-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 16px 12px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 600;
      background: var(--scene-green);
      color: var(--panel-text);
      transition: transform 0.1s, filter 0.1s;
    }

    .scene-btn:active {
      transform: scale(0.95);
    }

    .scene-btn:hover {
      filter: brightness(1.2);
    }

    .scene-btn ha-icon {
      --mdc-icon-size: 32px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-panel-card": LightPanelCard;
  }
}
