import { html, LitElement, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LightPanelCardConfig, TargetSelectorValue } from "./light-panel-card-config";

@customElement("light-panel-card-editor")
export class LightPanelCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private config?: LightPanelCardConfig;

  public setConfig(config: LightPanelCardConfig): void {
    this.config = config;
  }

  private getConfigWithDefaults(): LightPanelCardConfig {
    const defaults: LightPanelCardConfig = {
      type: "custom:light-panel-card",
      title: "Light Control",
      lights: { targets: {} },
      lamps: { targets: {} },
      accents: { targets: {} },
      scenes: { targets: {} },
    };

    if (!this.config) return defaults;

    return {
      ...defaults,
      ...this.config,
      lights: { targets: {}, ...this.config?.lights },
      lamps: { targets: {}, ...this.config?.lamps },
      accents: { targets: {}, ...this.config?.accents },
      scenes: { targets: {}, ...this.config?.scenes },
    };
  }

  private fireConfigChanged(config: LightPanelCardConfig): void {
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private updateTitle(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const config = { ...this.getConfigWithDefaults(), title: target.value };
    this.config = config;
    this.fireConfigChanged(config);
  }

  private updateTargets(sectionKey: keyof LightPanelCardConfig, value: TargetSelectorValue): void {
    const currentConfig = this.getConfigWithDefaults();
    const config = {
      ...currentConfig,
      [sectionKey]: {
        ...(currentConfig?.[sectionKey] || {}),
        targets: value || {},
      },
    } as LightPanelCardConfig;
    this.config = config;
    this.fireConfigChanged(config);
  }

  protected render(): TemplateResult {
    const config = this.getConfigWithDefaults();

    const sections = [
      { key: "lights", label: "Light Targets", domain: "light" },
      { key: "lamps", label: "Lamp Targets", domain: "light" },
      { key: "accents", label: "Accent Targets", domain: "light" },
      { key: "scenes", label: "Scene Targets", domain: "scene" },
    ] as const;

    return html`
      <div class="editor">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${config.title || "Light Control"}"
            @change="${this.updateTitle}"
          />
        </div>

        ${!this.hass ? html`<div style="padding: 8px; color: var(--warning-color);">Home Assistant not connected yet</div>` : ""}

        ${this.hass ? sections.map(
          (section) => html`
            <div class="form-group">
              <label>${section.label}</label>
              <ha-selector
                .hass="${this.hass}"
                .selector="${{
                  target: {
                    entity: { domain: section.domain },
                    area: {},
                    label: {},
                  },
                }}"
                .value="${(config?.[section.key]?.targets as TargetSelectorValue) || {}}"
                @value-changed="${(ev: CustomEvent) =>
                  this.updateTargets(section.key, (ev.detail?.value as TargetSelectorValue) || {})}"
              ></ha-selector>
            </div>
          `
        ) : ""}
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
    ha-selector {
      width: 100%;
    }
    ha-selector {
      display: block;
    }
    input {
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
