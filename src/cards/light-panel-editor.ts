import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface LightPanelCardConfig {
  type: string;
  area?: string;
  entities?: string[];
  title?: string;
}

@customElement("light-panel-editor")
export class LightPanelEditor extends LitElement {
  @property({ attribute: false }) hass?: any;
  @state() config?: LightPanelCardConfig;

  setConfig(config: LightPanelCardConfig) {
    this.config = config;
  }

  setHass(hass: any) {
    this.hass = hass;
  }

  handleAreaChange(e: any) {
    const config = { ...this.config, area: e.target.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleEntitiesChange(e: any) {
    const config = { ...this.config, entities: e.target.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleTitleChange(e: any) {
    const config = { ...this.config, title: e.target.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const areas = Array.from(
      new Set(
        Object.values(this.hass.states)
          .map((state: any) => state.attributes?.area_id)
          .filter(Boolean)
      )
    ) as string[];

    return html`
      <div class="editor">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title || "Light Control"}"
            @change="${this.handleTitleChange}"
          />
        </div>

        <div class="form-group">
          <label>Select Area</label>
          <select @change="${this.handleAreaChange}">
            <option value="">Choose area...</option>
            ${areas.map((area) => html`<option value="${area}">${area}</option>`)}
          </select>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-weight: 500;
    }
    input,
    select {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      font-size: 14px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-panel-editor": LightPanelEditor;
  }
}
