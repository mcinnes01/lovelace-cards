import { html, LitElement, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LightPanelCardConfig } from "./light-panel-card-config";

@customElement("light-panel-card-editor")
export class LightPanelCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;

  public setConfig(config: LightPanelCardConfig): void {
    this.config = config;
  }

  private handleChange(ev: Event, key: string): void {
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const config = { ...this.config, [key]: target.value };
    
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
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
            @change="${(e: Event) => this.handleChange(e, "title")}"
          />
        </div>

        <div class="form-group">
          <label>Select Area</label>
          <select @change="${(e: Event) => this.handleChange(e, "area")}">
            <option value="">Choose area...</option>
            ${areas.map((area) => html`<option value="${area}" ?selected="${area === this.config?.area}">${area}</option>`)}
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
    "light-panel-card-editor": LightPanelCardEditor;
  }
}
