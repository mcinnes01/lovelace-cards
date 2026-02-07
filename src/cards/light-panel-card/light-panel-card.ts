import { html, LitElement, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LightPanelCardConfig, LightPanelSectionConfig } from "./light-panel-card-config";

@customElement("light-panel-card")
export class LightPanelCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;

  public setConfig(config: LightPanelCardConfig): void {
    this.config = config;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("light-panel-card-editor");
  }

  public static getStubConfig(): LightPanelCardConfig {
    return {
      type: "custom:light-panel-card",
      title: "Light Control",
      lights: { targets: {} },
      lamps: { targets: {} },
      accents: { targets: {} },
      scenes: { targets: {} },
    };
  }

  public getCardSize(): number {
    return 4;
  }

  private getSectionEntities(sectionKey: keyof LightPanelCardConfig, domain: string): string[] {
    if (!this.hass || !this.config) return [];
    const section = (this.config[sectionKey] as LightPanelSectionConfig) || {};
    const targets = section.targets || {};
    const directEntities = Array.isArray(targets.entity_id)
      ? targets.entity_id
      : Array.isArray(section.entities)
        ? section.entities
        : [];

    const areaIds = Array.isArray(targets.area_id)
      ? targets.area_id
      : section.area
        ? [section.area]
        : [];

    const labelIds = Array.isArray(targets.label_id) ? targets.label_id : [];

    if (directEntities.length === 0 && areaIds.length === 0 && labelIds.length === 0) {
      return [];
    }

    const matched = new Set(directEntities);

    Object.keys(this.hass.states).forEach((entityId) => {
      if (!entityId.startsWith(`${domain}.`)) return;
      const state = this.hass.states[entityId];
      const areaId = state?.attributes?.area_id;
      if (areaId && areaIds.includes(areaId)) {
        matched.add(entityId);
        return;
      }
      if (labelIds.length > 0) {
        const registry = this.hass.entities?.[entityId];
        const labels = registry?.labels || registry?.label_ids || [];
        if (Array.isArray(labels) && labels.some((label: string) => labelIds.includes(label))) {
          matched.add(entityId);
        }
      }
    });

    return Array.from(matched);
  }

  private toggleLight(entity: string): void {
    if (!this.hass) return;
    const state = this.hass.states[entity];
    this.hass.callService("light", state.state === "on" ? "turn_off" : "turn_on", {
      entity_id: entity,
    });
  }

  private setBrightness(entity: string, brightness: number): void {
    if (!this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      brightness: Math.round((brightness / 100) * 255),
    });
  }

  private setColorTemp(entity: string, kelvin: number): void {
    if (!this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      color_temp_kelvin: kelvin,
    });
  }

  private setRGB(entity: string, color: [number, number, number]): void {
    if (!this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      rgb_color: color,
    });
  }

  private activateScene(entity: string): void {
    if (!this.hass) return;
    this.hass.callService("scene", "turn_on", { entity_id: entity });
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const title = this.config.title || "Light Control";
    const lightEntities = this.getSectionEntities("lights", "light");
    const lampEntities = this.getSectionEntities("lamps", "light");
    const accentEntities = this.getSectionEntities("accents", "light");
    const sceneEntities = this.getSectionEntities("scenes", "scene");

    return html`
      <ha-card>
        <div class="card-content">
          <h2>${title}</h2>
          ${this.renderLightSection("Lights", lightEntities)}
          ${this.renderLightSection("Lamps", lampEntities)}
          ${this.renderLightSection("Accents", accentEntities)}
          ${this.renderSceneSection("Scenes", sceneEntities)}
        </div>
      </ha-card>
    `;
  }

  private renderLightSection(title: string, entities: string[]): TemplateResult {
    if (!entities.length) return html``;
    return html`
      <div class="section">
        <h3>${title}</h3>
        <div class="lights-container">
          ${entities.map((entity) => this.renderLight(entity))}
        </div>
      </div>
    `;
  }

  private renderSceneSection(title: string, entities: string[]): TemplateResult {
    if (!entities.length) return html``;
    return html`
      <div class="section">
        <h3>${title}</h3>
        <div class="scene-buttons">
          ${entities.map((entity) => this.renderScene(entity))}
        </div>
      </div>
    `;
  }

  private renderScene(entity: string): TemplateResult {
    const state = this.hass!.states[entity];
    const name = state?.attributes?.friendly_name || entity;

    return html`
      <button @click="${() => this.activateScene(entity)}">${name}</button>
    `;
  }

  private renderLight(entity: string): TemplateResult {
    const state = this.hass!.states[entity];
    const isOn = state.state === "on";
    const brightness = state.attributes?.brightness || 0;
    const brightnessPercent = Math.round((brightness / 255) * 100);

    return html`
      <div class="light-item">
        <div class="light-header">
          <span class="entity-name">${state.attributes?.friendly_name || entity}</span>
          <button @click="${() => this.toggleLight(entity)}">${isOn ? "On" : "Off"}</button>
        </div>
        ${isOn
          ? html`
              <div class="light-controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value="${brightnessPercent}"
                  @change="${(e: Event) =>
                    this.setBrightness(entity, Number((e.target as HTMLInputElement).value))}"
                />
                <div class="color-temps">
                  <button @click="${() => this.setColorTemp(entity, 6500)}">Cool</button>
                  <button @click="${() => this.setColorTemp(entity, 5000)}">Day</button>
                  <button @click="${() => this.setColorTemp(entity, 4000)}">White</button>
                  <button @click="${() => this.setColorTemp(entity, 2700)}">Warm</button>
                </div>
                <div class="color-presets">
                  <button @click="${() => this.setRGB(entity, [255, 127, 0])}" style="background: rgba(255, 127, 0, 0.5);">
                    Orange
                  </button>
                  <button @click="${() => this.setRGB(entity, [0, 0, 255])}" style="background: rgba(0, 0, 255, 0.5);">
                    Blue
                  </button>
                  <button @click="${() => this.setRGB(entity, [0, 255, 0])}" style="background: rgba(0, 255, 0, 0.5);">
                    Green
                  </button>
                  <button @click="${() => this.setRGB(entity, [255, 192, 203])}" style="background: rgba(255, 192, 203, 0.5);">
                    Pink
                  </button>
                  <button @click="${() => this.setRGB(entity, [128, 0, 128])}" style="background: rgba(128, 0, 128, 0.5);">
                    Purple
                  </button>
                </div>
              </div>
            `
          : ""}
      </div>
    `;
  }

  static styles = css`
    .card-content {
      padding: 16px;
    }
    h2 {
      margin: 0 0 16px 0;
    }
    h3 {
      margin: 12px 0 8px 0;
    }
    .section {
      margin-bottom: 16px;
    }
    .lights-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .light-item {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 4px;
    }
    .light-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .entity-name {
      font-weight: 500;
    }
    .light-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .color-temps,
    .color-presets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 4px;
    }
    .scene-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 6px;
    }
    button {
      padding: 8px 12px;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    button:hover {
      background: var(--primary-color);
      color: white;
    }
    input[type="range"] {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-panel-card": LightPanelCard;
  }
}
