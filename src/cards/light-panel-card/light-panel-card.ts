import { html, LitElement, css, TemplateResult, nothing, PropertyValues } from "lit";
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

const SCENE_COLORS = [
  "rgba(100, 150, 255, 0.35)",
  "rgba(76, 175, 80, 0.35)",
  "rgba(156, 39, 176, 0.35)",
  "rgba(255, 152, 0, 0.35)",
  "rgba(233, 30, 99, 0.35)",
  "rgba(0, 188, 212, 0.35)",
  "rgba(255, 87, 34, 0.35)",
  "rgba(63, 81, 181, 0.35)",
  "rgba(139, 195, 74, 0.35)",
  "rgba(121, 85, 72, 0.35)",
];

// HA-style quick colour swatches (warm → cool)
const HA_COLOR_SWATCHES: Array<[number, number, number]> = [
  [255, 130, 0],
  [255, 185, 100],
  [255, 225, 180],
  [255, 255, 240],
  [160, 180, 255],
  [190, 150, 255],
  [255, 160, 220],
  [255, 100, 130],
];

// 24-colour hexagonal grid (4 rows × 6 cols)
const HEX_GRID_COLORS: Array<[number, number, number]> = [
  [255, 0, 0],    [255, 128, 0],  [255, 220, 0],  [100, 220, 0],  [0, 200, 80],   [0, 200, 200],
  [0, 100, 255],  [80, 0, 255],   [200, 0, 255],  [255, 0, 180],  [255, 80, 80],  [200, 200, 0],
  [255, 150, 150],[255, 200, 130],[255, 240, 150],[180, 255, 150],[150, 240, 255],[150, 180, 255],
  [220, 150, 255],[255, 150, 220],[200, 220, 255],[220, 255, 220],[255, 230, 200],[200, 200, 200],
];

@customElement("light-panel-card")
export class LightPanelCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;
  @state() private activeTab: SectionTab = "all";
  // null = "All" (control everything in the tab), or a specific entity_id
  @state() private selectedEntity: string | null = null;
  @state() private _colorPickerOpen = false;
  @state() private _colorPickerHex = "#ff8800";
  @state() private _colorPickerTargets: string[] = [];
  @state() private _colorPickerMode: "color" | "grid" | "temp" = "color";
  @state() private _colorH = 0;
  @state() private _colorS = 1;
  @state() private _isDragging = false;
  @state() private _colorPickerKelvin = 4000;
  @state() private _showEffects = false;
  @state() private _selectedEffect: string | null = null;

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

  private getEntityModes(entity: string): string[] {
    return this.hass?.states[entity]?.attributes?.supported_color_modes || [];
  }

  private entitySupportsBrightness(entity: string): boolean {
    const modes = this.getEntityModes(entity);
    return modes.length > 0 && !modes.every((m: string) => m === "onoff");
  }

  private entitySupportsColorTemp(entity: string): boolean {
    return this.getEntityModes(entity).includes("color_temp");
  }

  private entitySupportsColor(entity: string): boolean {
    const modes = this.getEntityModes(entity);
    return modes.includes("hs") || modes.includes("rgb") || modes.includes("xy");
  }

  private filterBrightness(entities: string[]): string[] {
    return entities.filter((e) => this.entitySupportsBrightness(e));
  }

  private filterColorTemp(entities: string[]): string[] {
    return entities.filter((e) => this.entitySupportsColorTemp(e));
  }

  private filterColor(entities: string[]): string[] {
    return entities.filter((e) => this.entitySupportsColor(e));
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

    // When using area/label targeting, filter by entity naming convention
    // so lights don't appear under lamps and vice versa.
    // Direct entity_id picks are never filtered (user chose them explicitly).
    if ((areaIds.length > 0 || labelIds.length > 0) && domain === "light") {
      const suffixMap: Record<string, RegExp> = {
        lights: /[_](light|lights)$/,
        lamps:  /[_](lamp|lamps)$/,
        accents: /[_](accent|accents|led|strip|rgb)$/,
      };
      const pattern = suffixMap[sectionKey as string];
      if (pattern) {
        const directSet = new Set(directEntities);
        matched.forEach((entityId) => {
          if (directSet.has(entityId)) return; // keep explicit picks
          const name = entityId.replace(/^light\./, "");
          if (!pattern.test(name)) {
            matched.delete(entityId);
          }
        });
      }
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

  /** Get the entities for the current tab section (not "all") */
  private getTabEntities(): string[] {
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

  /**
   * The entities that sliders/on-off should control.
   * - "all" tab: all light entities
   * - type tab with no selection (or "All" selected): all entities of that type
   * - type tab with specific entity selected: just that entity
   */
  private getControlTargets(): string[] {
    const tabEntities = this.getTabEntities();
    if (this.activeTab !== "all" && this.selectedEntity && tabEntities.includes(this.selectedEntity)) {
      return [this.selectedEntity];
    }
    return tabEntities;
  }

  private isAnyOn(entities: string[]): boolean {
    return entities.some((e) => this.hass?.states[e]?.state === "on");
  }

  private getAverageBrightness(entities: string[]): number {
    const capable = this.filterBrightness(entities);
    const onEntities = capable.filter((e) => this.hass?.states[e]?.state === "on");
    if (onEntities.length === 0) return 0;
    const total = onEntities.reduce((sum, e) => {
      const br = this.hass?.states[e]?.attributes?.brightness || 0;
      return sum + br;
    }, 0);
    return Math.round((total / onEntities.length / 255) * 100);
  }

  private getEntityBrightness(entity: string): number {
    const st = this.hass?.states[entity];
    if (!st || st.state !== "on") return 0;
    return Math.round(((st.attributes?.brightness || 0) / 255) * 100);
  }

  // ─── Actions ───────────────────────────────────────────────────────

  private toggleEntity(entity: string): void {
    if (!this.hass) return;
    const state = this.hass.states[entity];
    this.hass.callService("light", state?.state === "on" ? "turn_off" : "turn_on", {
      entity_id: entity,
    });
  }

  private turnOnAll(entities: string[]): void {
    if (!this.hass) return;
    entities.forEach((entity) => {
      this.hass!.callService("light", "turn_on", { entity_id: entity });
    });
  }

  private turnOffAll(entities: string[]): void {
    if (!this.hass) return;
    entities.forEach((entity) => {
      this.hass!.callService("light", "turn_off", { entity_id: entity });
    });
  }

  private selectEntity(entity: string | null): void {
    this.selectedEntity = this.selectedEntity === entity ? null : entity;
  }

  private setTab(tab: SectionTab): void {
    this.activeTab = tab;
    this.selectedEntity = null;
  }

  private setBrightnessAll(entities: string[], brightness: number): void {
    if (!this.hass) return;
    this.filterBrightness(entities).forEach((entity) => {
      this.hass!.callService("light", "turn_on", {
        entity_id: entity,
        brightness: Math.round((brightness / 100) * 255),
      });
    });
  }

  private setColorTempAll(entities: string[], kelvin: number): void {
    if (!this.hass) return;
    this.filterColorTemp(entities).forEach((entity) => {
      this.hass!.callService("light", "turn_on", {
        entity_id: entity,
        color_temp_kelvin: kelvin,
        brightness_pct: 100,
      });
    });
  }

  private setRGBAll(entities: string[], color: [number, number, number]): void {
    if (!this.hass) return;
    this.filterColor(entities).forEach((entity) => {
      this.hass!.callService("light", "turn_on", {
        entity_id: entity,
        rgb_color: color,
        brightness_pct: 100,
      });
    });
  }

  private activateScene(entity: string): void {
    if (!this.hass) return;
    this.hass.callService("scene", "turn_on", { entity_id: entity });
  }

  // ─── Color conversion helpers ─────────────────────────────────────

  private _hexToRgb(hex: string): [number, number, number] {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }

  private _rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
  }

  private _hsvToRgb(h: number, s: number, v: number): [number, number, number] {
    h = ((h % 360) + 360) % 360;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  private _rgbToHsv(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    let h = 0;
    if (max !== min) {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [h * 360, s, v];
  }

  // ─── Picker state helpers ─────────────────────────────────────────

  private _getCurrentEntityColor(): string {
    const target = this._colorPickerTargets[0];
    if (!target) return "#ff8800";
    const st = this.hass?.states[target];
    if (!st || st.state !== "on") return "#ff8800";
    const rgb = st.attributes?.rgb_color;
    if (rgb) return this._rgbToHex(rgb[0], rgb[1], rgb[2]);
    return "#ff8800";
  }

  private _getEffects(): string[] {
    const effects = new Set<string>();
    for (const entity of this._colorPickerTargets) {
      const list = this.hass?.states[entity]?.attributes?.effect_list;
      if (Array.isArray(list)) list.forEach((e: string) => effects.add(e));
    }
    return Array.from(effects);
  }

  private _setEffect(effect: string): void {
    if (!this.hass) return;
    this._colorPickerTargets.forEach((entity) => {
      this.hass!.callService("light", "turn_on", { entity_id: entity, effect });
    });
    this._selectedEffect = effect;
  }

  private _pickSwatchColor(color: [number, number, number]): void {
    const [h, s] = this._rgbToHsv(color[0], color[1], color[2]);
    this._colorH = h;
    this._colorS = s;
    this._colorPickerHex = this._rgbToHex(color[0], color[1], color[2]);
    if (this._colorPickerMode === "grid") this._colorPickerMode = "color";
    requestAnimationFrame(() => this._drawWheelWithSelector());
  }

  private _onHexInput(value: string): void {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      const [r, g, b] = this._hexToRgb(value);
      const [h, s] = this._rgbToHsv(r, g, b);
      this._colorH = h;
      this._colorS = s;
      this._colorPickerHex = value.toLowerCase();
      requestAnimationFrame(() => this._drawWheelWithSelector());
    }
  }

  private async _tryEyeDropper(): Promise<void> {
    try {
      const dropper = new (window as any).EyeDropper();
      const result = await dropper.open();
      const [r, g, b] = this._hexToRgb(result.sRGBHex);
      const [h, s] = this._rgbToHsv(r, g, b);
      this._colorH = h;
      this._colorS = s;
      this._colorPickerHex = result.sRGBHex;
      requestAnimationFrame(() => this._drawWheelWithSelector());
    } catch {
      // user cancelled or not supported
    }
  }

  // ─── Canvas colour wheel ─────────────────────────────────────────

  private _drawColorWheel(canvas: HTMLCanvasElement): void {
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius) {
          const hue = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
          const sat = dist / radius;
          const [r, g, b] = this._hsvToRgb(hue, sat, 1);
          const idx = (py * size + px) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  private _drawWheelWithSelector(): void {
    const canvas = this.shadowRoot?.querySelector("#color-wheel") as HTMLCanvasElement | null;
    if (!canvas) return;
    this._drawColorWheel(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 4;
    const angle = (this._colorH * Math.PI) / 180;
    const dist = this._colorS * radius;
    const sx = cx + dist * Math.cos(angle);
    const sy = cy + dist * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(sx, sy, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(sx, sy, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private _applyWheelCoords(canvas: HTMLCanvasElement, clientX: number, clientY: number): void {
    const rect = canvas.getBoundingClientRect();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const x = (clientX - rect.left) * (canvas.width / rect.width) - cx;
    const y = (clientY - rect.top) * (canvas.height / rect.height) - cy;
    const hue = ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
    const sat = Math.min(Math.sqrt(x * x + y * y) / cx, 1);
    const [r, g, b] = this._hsvToRgb(hue, sat, 1);
    this._colorH = hue;
    this._colorS = sat;
    this._colorPickerHex = this._rgbToHex(r, g, b);
    this._drawWheelWithSelector();
  }

  private _onWheelPointerDown(e: PointerEvent): void {
    this._isDragging = true;
    const canvas = e.currentTarget as HTMLCanvasElement;
    canvas.setPointerCapture(e.pointerId);
    this._applyWheelCoords(canvas, e.clientX, e.clientY);
  }

  private _onWheelPointerMove(e: PointerEvent): void {
    if (!this._isDragging) return;
    this._applyWheelCoords(e.currentTarget as HTMLCanvasElement, e.clientX, e.clientY);
  }

  private _onWheelPointerUp(_e: PointerEvent): void {
    this._isDragging = false;
  }

  private _openColorPicker(entities: string[]): void {
    this._colorPickerTargets = entities;
    this._colorPickerMode = "color";
    this._showEffects = false;
    this._selectedEffect = null;
    const hex = this._getCurrentEntityColor();
    const [r, g, b] = this._hexToRgb(hex);
    const [h, s] = this._rgbToHsv(r, g, b);
    this._colorH = h;
    this._colorS = s;
    this._colorPickerHex = hex;
    const firstTarget = entities[0];
    this._colorPickerKelvin = firstTarget
      ? (this.hass?.states[firstTarget]?.attributes?.color_temp_kelvin ?? 4000)
      : 4000;
    this._colorPickerOpen = true;
  }

  private _closeColorPicker(): void {
    this._colorPickerOpen = false;
  }

  private _applyCustomColor(): void {
    if (this._colorPickerMode === "temp") {
      this.setColorTempAll(this._colorPickerTargets, this._colorPickerKelvin);
    } else {
      const [r, g, b] = this._hsvToRgb(this._colorH, this._colorS, 1);
      this.setRGBAll(this._colorPickerTargets, [r, g, b]);
    }
    this._colorPickerOpen = false;
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (
      (changedProperties.has("_colorPickerOpen") && this._colorPickerOpen && this._colorPickerMode === "color") ||
      (changedProperties.has("_colorPickerMode") && this._colorPickerMode === "color" && this._colorPickerOpen)
    ) {
      requestAnimationFrame(() => this._drawWheelWithSelector());
    }
  }

  // ─── Rendering ─────────────────────────────────────────────────────

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const title = this.config.title || "Light Control Panel";
    const sceneEntities = this.getSectionEntities("scenes", "scene");
    const showTabs = this.config.show_section_tabs !== false;

    return html`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${title}</h2>
          ${showTabs ? this.renderTabs() : nothing}
          ${this.activeTab === "all" ? this.renderAllTab() : this.renderTypeTab()}
          ${sceneEntities.length > 0 ? this.renderSceneButtons(sceneEntities) : nothing}
        </div>
      </ha-card>
      ${this._colorPickerOpen ? this.renderColorPickerModal() : nothing}
    `;
  }

  // ─── Color Picker Modal ────────────────────────────────────────────

  private renderColorPickerModal(): TemplateResult {
    const [r, g, b] = this._hsvToRgb(this._colorH, this._colorS, 1);
    const selectedHex = this._rgbToHex(r, g, b);
    const currentHex = this._getCurrentEntityColor();
    const effects = this._getEffects();
    const hasTemp = this._colorPickerTargets.some((e) => this.entitySupportsColorTemp(e));
    const presets = this.config?.color_temp_presets || DEFAULT_TEMP_PRESETS;
    const hasEyeDropper = "EyeDropper" in window;

    return html`
      <div class="color-modal-overlay" @click=${this._closeColorPicker}>
        <div class="color-modal" @click=${(e: Event) => e.stopPropagation()}>

          <!-- Mode tabs -->
          <div class="picker-mode-tabs">
            <button
              class="picker-mode-tab ${this._colorPickerMode === "color" ? "active" : ""}"
              @click=${() => { this._colorPickerMode = "color"; }}
              title="Colour wheel"
            >
              <ha-icon icon="mdi:palette"></ha-icon>
            </button>
            <button
              class="picker-mode-tab ${this._colorPickerMode === "grid" ? "active" : ""}"
              @click=${() => { this._colorPickerMode = "grid"; }}
              title="Colour grid"
            >
              <ha-icon icon="mdi:view-grid"></ha-icon>
            </button>
            ${hasTemp ? html`
              <button
                class="picker-mode-tab ${this._colorPickerMode === "temp" ? "active" : ""}"
                @click=${() => { this._colorPickerMode = "temp"; }}
                title="Colour temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
              </button>
            ` : nothing}
          </div>

          <!-- Colour wheel (fine picker) -->
          ${this._colorPickerMode === "color" ? html`
            <div class="wheel-wrapper">
              <canvas
                id="color-wheel"
                width="260"
                height="260"
                class="color-wheel-canvas"
                @pointerdown=${this._onWheelPointerDown}
                @pointermove=${this._onWheelPointerMove}
                @pointerup=${this._onWheelPointerUp}
              ></canvas>
              ${hasEyeDropper ? html`
                <button class="eyedropper-btn" @click=${this._tryEyeDropper} title="Pick colour from screen">
                  <ha-icon icon="mdi:eyedropper-variant"></ha-icon>
                </button>
              ` : nothing}
            </div>

          <!-- Hex grid (coarse picker) -->
          ` : this._colorPickerMode === "grid" ? html`
            <div class="hex-grid">
              ${HEX_GRID_COLORS.map((c) => html`
                <button
                  class="hex-cell"
                  style="background: rgb(${c[0]}, ${c[1]}, ${c[2]})"
                  @click=${() => this._pickSwatchColor(c)}
                ></button>
              `)}
            </div>

          <!-- Colour temperature mode -->
          ` : html`
            <div class="temp-picker-area">
              <div class="temp-gradient-track">
                <input
                  type="range"
                  min="2700"
                  max="6500"
                  .value=${String(this._colorPickerKelvin)}
                  @input=${(e: Event) => {
                    this._colorPickerKelvin = Number((e.target as HTMLInputElement).value);
                  }}
                />
              </div>
              <div class="temp-presets-mini">
                ${presets.map((p: ColorTempPreset) => html`
                  <button
                    class="temp-mini-btn"
                    style="background: ${p.color}; color: ${p.text_color || "#fff"}"
                    @click=${() => { this._colorPickerKelvin = p.kelvin; }}
                  >${p.name}</button>
                `)}
              </div>
            </div>
          `}

          <!-- Colour preview + values (colour modes only) -->
          ${this._colorPickerMode !== "temp" ? html`
            <div class="color-info-row">
              <div class="color-preview-pair">
                <div class="preview-box" style="background: ${currentHex}" title="Current colour"></div>
                <div class="preview-box selected-preview" style="background: ${selectedHex}" title="Selected colour"></div>
              </div>
              <div class="color-values-col">
                <input
                  class="hex-input"
                  type="text"
                  .value=${selectedHex}
                  maxlength="7"
                  @change=${(e: Event) => this._onHexInput((e.target as HTMLInputElement).value)}
                />
                <span class="rgb-value">rgb(${r}, ${g}, ${b})</span>
              </div>
            </div>

            <!-- Quick swatches -->
            <div class="quick-swatches">
              ${HA_COLOR_SWATCHES.map((c) => html`
                <button
                  class="quick-swatch"
                  style="background: rgb(${c[0]}, ${c[1]}, ${c[2]})"
                  @click=${() => this._pickSwatchColor(c)}
                ></button>
              `)}
            </div>
          ` : nothing}

          <!-- Effects -->
          ${effects.length > 0 ? html`
            <button class="effects-toggle-btn" @click=${() => { this._showEffects = !this._showEffects; }}>
              <ha-icon icon="mdi:auto-fix"></ha-icon>
              <span>Effect</span>
              <ha-icon icon=${this._showEffects ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
            ${this._showEffects ? html`
              <div class="effects-list">
                ${effects.map((effect: string) => html`
                  <button
                    class="effect-btn ${this._selectedEffect === effect ? "active" : ""}"
                    @click=${() => this._setEffect(effect)}
                  >${effect}</button>
                `)}
              </div>
            ` : nothing}
          ` : nothing}

          <!-- Actions -->
          <div class="color-modal-actions">
            <button class="color-modal-cancel" @click=${this._closeColorPicker}>Cancel</button>
            <button class="color-modal-apply" @click=${this._applyCustomColor}>Apply</button>
          </div>

        </div>
      </div>
    `;
  }

  // ─── "All" Tab ────────────────────────────────────────────────────

  private renderAllTab(): TemplateResult {
    const allEntities = this.getAllLightEntities();
    if (allEntities.length === 0) {
      return html`<div class="empty-state">No lights configured</div>`;
    }

    const controlTargets = allEntities;
    const dimmable = this.filterBrightness(controlTargets);
    const colorTemp = this.filterColorTemp(controlTargets);
    const color = this.filterColor(controlTargets);

    const showBrightness = this.config!.show_brightness !== false && dimmable.length > 0;
    const showColorTemp = this.config!.show_color_temp !== false && colorTemp.length > 0;
    const showTempPresets = this.config!.show_temp_presets !== false && colorTemp.length > 0;
    const showColorPresets = this.config!.show_color_presets !== false && color.length > 0;

    return html`
      ${this.renderOnOffButtons(controlTargets)}
      ${showBrightness ? this.renderBrightnessSlider(controlTargets) : nothing}
      ${showColorTemp ? this.renderColorTempSlider(controlTargets) : nothing}
      ${showTempPresets ? this.renderTempPresets(controlTargets) : nothing}
      ${showColorPresets ? this.renderColorPresets(controlTargets) : nothing}
    `;
  }

  // ─── Type Tab (lights / lamps / accents) ──────────────────────────

  private renderTypeTab(): TemplateResult {
    const tabEntities = this.getTabEntities();

    if (tabEntities.length === 0) {
      return html`<div class="empty-state">No lights configured for this section</div>`;
    }

    const controlTargets = this.getControlTargets();
    const dimmable = this.filterBrightness(controlTargets);
    const colorTemp = this.filterColorTemp(controlTargets);
    const color = this.filterColor(controlTargets);

    const showBrightness = this.config!.show_brightness !== false && dimmable.length > 0;
    const showColorTemp = this.config!.show_color_temp !== false && colorTemp.length > 0;
    const showTempPresets = this.config!.show_temp_presets !== false && colorTemp.length > 0;
    const showColorPresets = this.config!.show_color_presets !== false && color.length > 0;

    return html`
      ${this.renderEntityCards(tabEntities)}
      ${this.renderOnOffButtons(controlTargets)}
      ${showBrightness ? this.renderBrightnessSlider(controlTargets) : nothing}
      ${showColorTemp ? this.renderColorTempSlider(controlTargets) : nothing}
      ${showTempPresets ? this.renderTempPresets(controlTargets) : nothing}
      ${showColorPresets ? this.renderColorPresets(controlTargets) : nothing}
    `;
  }

  // ─── Section Tabs ──────────────────────────────────────────────────

  private renderTabs(): TemplateResult {
    return html`
      <div class="tab-bar">
        ${TABS.map((tab) => {
          const entities =
            tab.key === "all"
              ? this.getAllLightEntities()
              : this.getSectionEntities(tab.entityKey, "light");
          const isActive = this.activeTab === tab.key;
          const anyOn = this.isAnyOn(entities);

          return html`
            <button
              class="tab-btn ${isActive ? "active" : ""} ${anyOn ? "on" : "off"}"
              @click=${() => this.setTab(tab.key)}
            >
              <ha-icon .icon=${tab.icon}></ha-icon>
              <span>${tab.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  // ─── Entity Cards ──────────────────────────────────────────────────

  private renderEntityCards(entities: string[]): TemplateResult {
    const showAllOption = entities.length > 1;

    return html`
      <div class="entity-grid">
        ${showAllOption
          ? html`
              <div
                class="entity-card all-card ${this.selectedEntity === null ? "selected" : ""}"
                @click=${() => this.selectEntity(null)}
              >
                <ha-icon icon="mdi:lightbulb-group" class="entity-icon ${this.isAnyOn(entities) ? "on" : ""}"></ha-icon>
                <span class="entity-name">All</span>
              </div>
            `
          : nothing}
        ${entities.map((entity) => {
          const st = this.hass!.states[entity];
          if (!st) return nothing;
          const isOn = st.state === "on";
          const isSelected = this.selectedEntity === entity;
          const name = st.attributes?.friendly_name || entity.split(".").pop() || entity;
          const hasBrightness = this.entitySupportsBrightness(entity);
          const brightnessVal = hasBrightness ? this.getEntityBrightness(entity) : 0;
          const icon = st.attributes?.icon || (hasBrightness ? "mdi:lamp" : "mdi:lightbulb");

          // If only 1 entity, it's always selected (no "All" option)
          const singleEntity = entities.length === 1;
          const effectiveSelected = singleEntity || isSelected;

          return html`
            <div
              class="entity-card ${isOn ? "on" : "off"} ${effectiveSelected ? "selected" : ""}"
              @click=${() => {
                if (!singleEntity) this.selectEntity(entity);
              }}
            >
              <button
                class="entity-power ${isOn ? "on" : "off"}"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.toggleEntity(entity);
                }}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <ha-icon .icon=${icon} class="entity-icon ${isOn ? "on" : ""}"></ha-icon>
              <span class="entity-name">${name}</span>
              ${hasBrightness && isOn
                ? html`<span class="entity-brightness">${brightnessVal}%</span>`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  // ─── On/Off Buttons ───────────────────────────────────────────────

  private renderOnOffButtons(entities: string[]): TemplateResult {
    const anyOn = this.isAnyOn(entities);
    const allOn = entities.length > 0 && entities.every((e) => this.hass?.states[e]?.state === "on");
    const allOff = entities.length > 0 && entities.every((e) => this.hass?.states[e]?.state !== "on");

    return html`
      <div class="onoff-controls">
        <button
          class="onoff-big ${allOn ? "active" : ""}"
          @click=${() => this.turnOnAll(entities)}
        >
          <ha-icon icon="mdi:lightbulb-on"></ha-icon>
          <span>On</span>
        </button>
        <button
          class="onoff-big ${allOff ? "active" : ""}"
          @click=${() => this.turnOffAll(entities)}
        >
          <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
          <span>Off</span>
        </button>
      </div>
    `;
  }

  // ─── Brightness Slider ────────────────────────────────────────────

  private renderBrightnessSlider(entities: string[]): TemplateResult {
    const brightnessPercent = this.getAverageBrightness(entities);
    const dimmable = this.filterBrightness(entities);
    const anyOn = this.isAnyOn(dimmable);

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
    const capable = this.filterColorTemp(entities);
    const onEntities = capable.filter((e) => this.hass?.states[e]?.state === "on");
    let tempPercent = 50;
    if (onEntities.length > 0) {
      const totalKelvin = onEntities.reduce((sum, e) => {
        const k = this.hass?.states[e]?.attributes?.color_temp_kelvin || 4000;
        return sum + k;
      }, 0);
      const avgKelvin = totalKelvin / onEntities.length;
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
    const colorCapable = this.filterColor(entities);
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
        ${colorCapable.length > 0
          ? html`
              <button
                class="preset-btn temp-preset color-picker-btn"
                @click=${() => this._openColorPicker(colorCapable)}
              >
                <ha-icon icon="mdi:palette" class="preset-icon"></ha-icon>
                <span>Custom</span>
              </button>
            `
          : nothing}
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
    let colorIdx = 0;
    return html`
      <div class="scene-section">
        <div class="scene-row">
          ${entities.map((entity) => {
            const st = this.hass!.states[entity];
            if (!st || st.state === "unavailable" || st.state === "unknown") {
              return nothing;
            }
            const name = st.attributes?.friendly_name || entity.split(".").pop() || entity;
            const icon = st.attributes?.icon || "mdi:palette";
            const bg = SCENE_COLORS[colorIdx % SCENE_COLORS.length];
            colorIdx++;

            return html`
              <button
                class="scene-btn"
                style="background: ${bg}"
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
      --panel-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
      --amber-glow: rgba(255, 193, 7, 0.5);
      --amber-bright: #ffc107;
      --grey-dim: rgba(128, 128, 128, 0.2);
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
      font-style: italic;
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

    /* ── Entity Cards Grid ───────────────────────── */
    .entity-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px;
    }

    .entity-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 14px 8px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid transparent;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .entity-card:active {
      transform: scale(0.96);
    }

    .entity-card.on {
      background: rgba(255, 193, 7, 0.12);
    }

    .entity-card.selected {
      border-color: var(--amber-bright);
      box-shadow: 0 0 12px rgba(255, 193, 7, 0.3);
    }

    .entity-card.all-card {
      background: rgba(255, 255, 255, 0.04);
    }

    .entity-card.all-card.selected {
      background: rgba(255, 193, 7, 0.1);
    }

    .entity-icon {
      --mdc-icon-size: 28px;
      color: var(--panel-secondary);
      transition: color 0.2s;
    }

    .entity-icon.on {
      color: var(--amber-bright);
    }

    .entity-name {
      font-size: 0.75em;
      font-weight: 500;
      color: var(--panel-text);
      text-align: center;
      line-height: 1.2;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .entity-brightness {
      font-size: 0.65em;
      color: var(--panel-secondary);
    }

    .entity-power {
      position: absolute;
      top: 4px;
      right: 4px;
      padding: 2px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
      transition: color 0.2s;
      line-height: 0;
    }

    .entity-power ha-icon {
      --mdc-icon-size: 16px;
    }

    .entity-power.on {
      color: var(--amber-bright);
    }

    .entity-power.off {
      color: var(--panel-secondary);
    }

    .entity-power:active {
      transform: scale(0.85);
    }

    /* ── On/Off Buttons ─────────────────────────── */
    .onoff-controls {
      display: flex;
      gap: 10px;
    }

    .onoff-big {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 18px 16px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 600;
      color: var(--panel-secondary);
      background: rgba(255, 255, 255, 0.04);
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s;
    }

    .onoff-big ha-icon {
      --mdc-icon-size: 28px;
    }

    .onoff-big.active {
      background: var(--amber-glow);
      border-color: rgba(255, 193, 7, 0.6);
      color: var(--panel-text);
    }

    .onoff-big:active {
      transform: scale(0.95);
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
      color: var(--amber-bright);
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
      background: linear-gradient(
        90deg,
        rgba(50, 50, 50, 0.6) 0%,
        rgba(255, 193, 7, 0.3) 50%,
        rgba(255, 152, 0, 0.8) 100%
      );
    }

    .temp-track {
      background: linear-gradient(
        90deg,
        rgba(255, 152, 0, 0.8) 0%,
        rgba(255, 200, 100, 0.5) 30%,
        rgba(255, 255, 255, 0.4) 60%,
        rgba(135, 206, 250, 0.6) 100%
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
      background: linear-gradient(
        90deg,
        rgba(255, 152, 0, 0.9) 0%,
        rgba(255, 193, 7, 0.95) 100%
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
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .slider-track input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 28px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      border: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
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
      gap: 4px;
      padding: 14px 8px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 600;
      min-height: 46px;
      transition: transform 0.1s, filter 0.1s;
    }

    .preset-btn:active {
      transform: scale(0.93);
    }

    .preset-btn:hover {
      filter: brightness(1.15);
    }

    .temp-preset {
      padding: 10px 6px;
    }

    .temp-preset .preset-icon {
      --mdc-icon-size: 24px;
    }

    .color-preset {
      padding: 14px 8px;
      font-size: 0.88em;
      min-height: 46px;
      border-radius: 8px;
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
      color: var(--panel-text);
      transition: transform 0.1s, filter 0.1s;
    }

    .scene-btn:active {
      transform: scale(0.95);
    }

    .scene-btn:hover {
      filter: brightness(1.3);
    }

    .scene-btn ha-icon {
      --mdc-icon-size: 32px;
    }

    /* ── Colour Picker Button ───────────────────── */
    .color-picker-btn {
      background: linear-gradient(
        135deg,
        rgba(255, 100, 100, 0.5) 0%,
        rgba(100, 200, 100, 0.5) 33%,
        rgba(100, 100, 255, 0.5) 66%,
        rgba(255, 200, 100, 0.5) 100%
      );
      color: #fff;
    }

    /* ── Colour Picker Modal ────────────────────── */
    .color-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .color-modal {
      background: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      width: min(320px, calc(100vw - 32px));
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    }

    /* Mode tabs */
    .picker-mode-tabs {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .picker-mode-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    .picker-mode-tab.active {
      background: var(--amber-glow);
      color: var(--primary-text-color, #fff);
    }

    .picker-mode-tab ha-icon {
      --mdc-icon-size: 22px;
    }

    /* Colour wheel */
    .wheel-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .color-wheel-canvas {
      width: 100%;
      max-width: 260px;
      height: auto;
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: crosshair;
      touch-action: none;
      display: block;
    }

    .eyedropper-btn {
      position: absolute;
      top: 4px;
      right: calc(50% - 130px + 4px);
      width: 36px;
      height: 36px;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(4px);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      transition: background 0.15s;
    }

    .eyedropper-btn:hover {
      background: rgba(0, 0, 0, 0.55);
    }

    .eyedropper-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    /* Hex grid (coarse picker) */
    .hex-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 4px 0;
    }

    .hex-cell {
      aspect-ratio: 0.866;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      border: none;
      cursor: pointer;
      transition: transform 0.1s, filter 0.1s;
    }

    .hex-cell:hover {
      filter: brightness(1.25);
      transform: scale(1.12);
    }

    .hex-cell:active {
      transform: scale(0.9);
    }

    /* Colour temperature mode */
    .temp-picker-area {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 0;
    }

    .temp-gradient-track {
      position: relative;
      height: 36px;
      border-radius: 18px;
      overflow: hidden;
      background: linear-gradient(
        to right,
        rgba(255, 140, 0, 0.9) 0%,
        rgba(255, 200, 130, 0.8) 30%,
        rgba(255, 255, 255, 0.9) 55%,
        rgba(180, 220, 255, 0.9) 80%,
        rgba(140, 195, 250, 0.9) 100%
      );
    }

    .temp-gradient-track input[type="range"] {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    .temp-gradient-track input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 36px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .temp-gradient-track input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 36px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      border: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .temp-presets-mini {
      display: flex;
      gap: 6px;
    }

    .temp-mini-btn {
      flex: 1;
      padding: 8px 4px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.75em;
      font-weight: 600;
      text-align: center;
      transition: transform 0.1s, filter 0.1s;
    }

    .temp-mini-btn:hover { filter: brightness(1.15); }
    .temp-mini-btn:active { transform: scale(0.95); }

    /* Colour info row */
    .color-info-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .color-preview-pair {
      display: flex;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    .preview-box {
      width: 36px;
      height: 36px;
    }

    .selected-preview {
      border-left: 2px solid rgba(255, 255, 255, 0.15);
    }

    .color-values-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .hex-input {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      color: var(--primary-text-color, #fff);
      font-size: 0.85em;
      font-family: monospace;
      padding: 5px 8px;
      width: 100%;
      box-sizing: border-box;
    }

    .rgb-value {
      font-size: 0.72em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      font-family: monospace;
    }

    /* Quick swatches */
    .quick-swatches {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }

    .quick-swatch {
      height: 34px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.1s, filter 0.1s;
    }

    .quick-swatch:hover {
      filter: brightness(1.2);
      transform: scale(1.06);
    }

    .quick-swatch:active { transform: scale(0.92); }

    /* Effects */
    .effects-toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.07);
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 600;
      transition: background 0.15s;
      box-sizing: border-box;
    }

    .effects-toggle-btn:hover { background: rgba(255, 255, 255, 0.12); }

    .effects-toggle-btn ha-icon:last-child { margin-left: auto; }

    .effects-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .effect-btn {
      padding: 7px 14px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font-size: 0.82em;
      transition: background 0.1s, border-color 0.1s;
    }

    .effect-btn.active {
      background: var(--amber-glow);
      border-color: var(--amber-bright);
    }

    /* Modal actions */
    .color-modal-actions {
      display: flex;
      gap: 10px;
    }

    .color-modal-cancel,
    .color-modal-apply {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 600;
      transition: filter 0.1s, transform 0.1s;
    }

    .color-modal-cancel:active,
    .color-modal-apply:active {
      transform: scale(0.96);
    }

    .color-modal-cancel {
      background: rgba(255, 255, 255, 0.1);
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    }

    .color-modal-cancel:hover { filter: brightness(1.3); }

    .color-modal-apply {
      background: var(--amber-glow);
      color: var(--primary-text-color, #fff);
    }

    .color-modal-apply:hover {
      filter: brightness(1.2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-panel-card": LightPanelCard;
  }
}
