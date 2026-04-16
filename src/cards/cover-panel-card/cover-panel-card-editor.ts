import { html, LitElement, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CoverPanelCardConfig, CoverBlindConfig, TargetSelectorValue } from "./cover-panel-card-config";

@customElement("cover-panel-card-editor")
export class CoverPanelCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: CoverPanelCardConfig;

  public setConfig(config: CoverPanelCardConfig): void {
    this.config = config;
  }

  private _fire(config: CoverPanelCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateTitle(ev: Event): void {
    const val = (ev.target as HTMLInputElement).value;
    const config = { ...this.config!, title: val };
    this.config = config;
    this._fire(config);
  }

  private _updateIlluminance(ev: CustomEvent): void {
    const val = ev.detail?.value ?? "";
    const config = { ...this.config!, illuminance_entity: val };
    this.config = config;
    this._fire(config);
  }

  private _updateBlindTargets(index: number, value: TargetSelectorValue): void {
    const blinds = [...(this.config?.blinds || [])];
    blinds[index] = { ...blinds[index], targets: value || {} };
    const config = { ...this.config!, blinds };
    this.config = config;
    this._fire(config);
  }

  private _updateBlindLabel(index: number, value: string): void {
    const blinds = [...(this.config?.blinds || [])];
    blinds[index] = { ...blinds[index], label: value };
    const config = { ...this.config!, blinds };
    this.config = config;
    this._fire(config);
  }

  private _updateBlindPct(index: number, key: "tilt_down_pct" | "tilt_up_pct", value: number): void {
    const blinds = [...(this.config?.blinds || [])];
    blinds[index] = { ...blinds[index], [key]: value };
    const config = { ...this.config!, blinds };
    this.config = config;
    this._fire(config);
  }

  private _addBlind(): void {
    const blinds = [...(this.config?.blinds || []), { targets: {}, tilt_down_pct: 25, tilt_up_pct: 75 }];
    const config = { ...this.config!, blinds };
    this.config = config;
    this._fire(config);
  }

  private _removeBlind(index: number): void {
    const blinds = (this.config?.blinds || []).filter((_, i) => i !== index);
    const config = { ...this.config!, blinds };
    this.config = config;
    this._fire(config);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) return html`<div>Loading...</div>`;

    const blinds = this.config.blinds || [];

    return html`
      <div class="editor">

        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title || "Cover Control"}"
            @change="${this._updateTitle}"
          />
        </div>

        <div class="form-group">
          <label>Room Illuminance Sensor (optional)</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{ entity: { domain: "sensor", device_class: "illuminance" } }}"
            .value="${this.config.illuminance_entity || ""}"
            @value-changed="${this._updateIlluminance}"
          ></ha-selector>
        </div>

        <div class="section-header">
          <span>Blinds</span>
          <button class="add-btn" @click="${this._addBlind}">+ Add Blind</button>
        </div>

        ${blinds.map(
          (blind: CoverBlindConfig, i: number) => html`
            <div class="blind-card">
              <div class="blind-card-header">
                <span>Blind ${i + 1}${blind.label ? ` — ${blind.label}` : ""}</span>
                <button class="remove-btn" @click="${() => this._removeBlind(i)}">Remove</button>
              </div>

              <div class="form-group">
                <label>Label (optional)</label>
                <input
                  type="text"
                  .value="${blind.label || ""}"
                  placeholder="e.g. Left Window"
                  @change="${(ev: Event) => this._updateBlindLabel(i, (ev.target as HTMLInputElement).value)}"
                />
              </div>

              <div class="form-group">
                <label>Cover Targets</label>
                <ha-selector
                  .hass="${this.hass}"
                  .selector="${{ target: { entity: { domain: "cover" }, area: {}, label: {} } }}"
                  .value="${blind.targets || {}}"
                  @value-changed="${(ev: CustomEvent) =>
                    this._updateBlindTargets(i, ev.detail?.value || {})}"
                ></ha-selector>
              </div>

              <div class="form-row">
                <div class="form-group half">
                  <label>Angled Down % <span class="hint">(default 25)</span></label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    .value="${String(blind.tilt_down_pct ?? 25)}"
                    @change="${(ev: Event) =>
                      this._updateBlindPct(i, "tilt_down_pct", Number((ev.target as HTMLInputElement).value))}"
                  />
                </div>
                <div class="form-group half">
                  <label>Angled Up % <span class="hint">(default 75)</span></label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    .value="${String(blind.tilt_up_pct ?? 75)}"
                    @change="${(ev: Event) =>
                      this._updateBlindPct(i, "tilt_up_pct", Number((ev.target as HTMLInputElement).value))}"
                  />
                </div>
              </div>
            </div>
          `
        )}

        ${blinds.length === 0
          ? html`<div class="empty-hint">No blinds configured yet — click "Add Blind" above.</div>`
          : nothing}
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

    .form-row {
      display: flex;
      gap: 10px;
    }

    .form-group.half {
      flex: 1;
    }

    label {
      font-size: 0.85em;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .hint {
      font-size: 0.8em;
      font-weight: 400;
      color: var(--secondary-text-color);
    }

    input[type="text"],
    input[type="number"],
    ha-selector {
      width: 100%;
      box-sizing: border-box;
    }

    input[type="text"],
    input[type="number"] {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      font-size: 14px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    ha-selector {
      display: block;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 0.95em;
      margin-top: 4px;
    }

    .add-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 600;
    }

    .blind-card {
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--secondary-background-color);
    }

    .blind-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 0.9em;
    }

    .remove-btn {
      padding: 4px 10px;
      border: none;
      border-radius: 6px;
      background: rgba(200, 50, 50, 0.2);
      color: var(--error-color, #f44);
      cursor: pointer;
      font-size: 0.8em;
    }

    .empty-hint {
      color: var(--secondary-text-color);
      font-style: italic;
      font-size: 0.85em;
      text-align: center;
      padding: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cover-panel-card-editor": CoverPanelCardEditor;
  }
}
