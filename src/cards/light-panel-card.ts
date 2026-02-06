import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface LightPanelCardConfig {
  type: string;
  area?: string;
  entities?: string[];
  title?: string;
}

interface HomeAssistant {
  states: Record<string, any>;
  callService: (domain: string, service: string, data: any) => void;
  localize: (key: string) => string;
}

@customElement("light-panel-card")
export class LightPanelCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() config?: LightPanelCardConfig;
  @state() lights: string[] = [];

  setConfig(config: LightPanelCardConfig) {
    this.config = config;
  }

  setHass(hass: HomeAssistant) {
    this.hass = hass;
    this.updateLights();
  }

  updateLights() {
    if (!this.hass || !this.config) return;

    this.lights = Object.keys(this.hass.states).filter((entity) => {
      const state = this.hass!.states[entity];
      const domain = entity.split(".")[0];

      if (domain !== "light") return false;

      if (this.config!.entities) {
        return this.config!.entities.includes(entity);
      }

      if (this.config!.area) {
        return state.attributes.area_id === this.config!.area;
      }

      return true;
    });
  }

  toggleLight(entity: string) {
    if (!this.hass) return;
    const state = this.hass.states[entity];
    this.hass.callService("light", state.state === "on" ? "turn_off" : "turn_on", {
      entity_id: entity,
    });
  }

  setBrightness(entity: string, brightness: number) {
    if (!this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      brightness: Math.round((brightness / 100) * 255),
    });
  }

  setColorTemp(entity: string, kelvin: number) {
    if (!this.hass) return;
    const mireds = Math.round(1000000 / kelvin);
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      color_temp_kelvin: kelvin,
    });
  }

  setRGB(entity: string, color: [number, number, number]) {
    if (!this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: entity,
      rgb_color: color,
    });
  }

  static getConfigElement() {
    const el = document.createElement("light-panel-editor");
    return el;
  }

  static getStubConfig() {
    return {
      type: "custom:light-panel-card",
      area: "",
    };
  }

  getCardSize() {
    return 4;
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="card">
        <h2>${this.config.title || "Light Control"}</h2>
        <div class="lights-container">
          ${this.lights.map(
            (entity) => html`
              <div class="light-item">
                <div class="light-header">
                  <span class="entity-name">${this.hass!.states[entity].attributes.friendly_name}</span>
                  <button @click="${() => this.toggleLight(entity)}">${this.hass!.states[entity].state === "on" ? "On" : "Off"}</button>
                </div>
                ${this.hass!.states[entity].state === "on"
                  ? html`
                      <div class="light-controls">
                        <input type="range" min="0" max="100" @change="${(e: any) => this.setBrightness(entity, e.target.value)}" />
                        <div class="color-temps">
                          <button @click="${() => this.setColorTemp(entity, 6500)}">Cool</button>
                          <button @click="${() => this.setColorTemp(entity, 5000)}">Daylight</button>
                          <button @click="${() => this.setColorTemp(entity, 4000)}">White</button>
                          <button @click="${() => this.setColorTemp(entity, 2700)}">Warm</button>
                        </div>
                        <div class="color-presets">
                          <button @click="${() => this.setRGB(entity, [255, 127, 0])}">Orange</button>
                          <button @click="${() => this.setRGB(entity, [0, 0, 255])}">Blue</button>
                          <button @click="${() => this.setRGB(entity, [0, 255, 0])}">Green</button>
                          <button @click="${() => this.setRGB(entity, [255, 192, 203])}">Pink</button>
                          <button @click="${() => this.setRGB(entity, [128, 0, 128])}">Purple</button>
                        </div>
                      </div>
                    `
                  : ""}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    .card {
      padding: 16px;
    }
    h2 {
      margin: 0 0 16px 0;
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
