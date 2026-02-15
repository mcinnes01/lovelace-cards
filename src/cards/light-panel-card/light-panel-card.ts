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

@customElement("light-panel-card")
export class LightPanelCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;
  @state() private activeTab: SectionTab = "all";
  // null = "All" (control everything in the tab), or a specific entity_id
  @state() private selectedEntity: string | null = null;

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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-panel-card": LightPanelCard;
  }
}
