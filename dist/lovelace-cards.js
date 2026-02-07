class LightPanelCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: config?.title ?? "Light Control",
      lights: config?.lights ?? {},
      lamps: config?.lamps ?? {},
      accents: config?.accents ?? {},
      scenes: config?.scenes ?? {},
    };
  }

  setHass(hass) {
    this.hass = hass;
    this._render();
  }

  static getConfigElement() {
    return document.createElement("light-panel-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:light-panel-card",
      title: "Light Control",
      lights: { targets: {} },
      lamps: { targets: {} },
      accents: { targets: {} },
      scenes: { targets: {} },
    };
  }

  getCardSize() {
    return 4;
  }

  _getSectionEntities(sectionKey, domain) {
    if (!this.hass) return [];
    const section = this.config?.[sectionKey] || {};
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
        if (Array.isArray(labels) && labels.some((label) => labelIds.includes(label))) {
          matched.add(entityId);
        }
      }
    });

    return Array.from(matched);
  }

  _toggle(entityId) {
    const state = this.hass.states[entityId];
    this.hass.callService(
      "light",
      state.state === "on" ? "turn_off" : "turn_on",
      { entity_id: entityId }
    );
  }

  _setBrightness(entityId, brightnessPct) {
    this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      brightness: Math.round((brightnessPct / 100) * 255),
    });
  }

  _setColorTemp(entityId, kelvin) {
    this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      color_temp_kelvin: kelvin,
    });
  }

  _setRGB(entityId, rgb) {
    this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      rgb_color: rgb,
    });
  }

  _activateScene(entityId) {
    this.hass.callService("scene", "turn_on", { entity_id: entityId });
  }

  _renderLightItem(entityId) {
    const state = this.hass.states[entityId];
    const isOn = state.state === "on";
    const brightness = state.attributes?.brightness || 0;
    const brightnessPct = Math.round((brightness / 255) * 100);

    return `
      <div class="light-item">
        <div class="light-header">
          <span>${state.attributes?.friendly_name || entityId}</span>
          <button data-toggle="${entityId}">${isOn ? "On" : "Off"}</button>
        </div>
        ${isOn ? `
          <div class="controls">
            <input type="range" min="0" max="100" value="${brightnessPct}" data-brightness="${entityId}" />
            <div class="row">
              <button data-temp="${entityId}" data-k="6500">Cool</button>
              <button data-temp="${entityId}" data-k="5000">Day</button>
              <button data-temp="${entityId}" data-k="4000">White</button>
              <button data-temp="${entityId}" data-k="2700">Warm</button>
            </div>
            <div class="row">
              <button data-rgb="${entityId}" data-rgb-val="255,127,0" style="background: rgba(255, 127, 0, 0.5);">Orange</button>
              <button data-rgb="${entityId}" data-rgb-val="0,0,255" style="background: rgba(0, 0, 255, 0.5);">Blue</button>
              <button data-rgb="${entityId}" data-rgb-val="0,255,0" style="background: rgba(0, 255, 0, 0.5);">Green</button>
              <button data-rgb="${entityId}" data-rgb-val="255,192,203" style="background: rgba(255, 192, 203, 0.5);">Pink</button>
              <button data-rgb="${entityId}" data-rgb-val="128,0,128" style="background: rgba(128, 0, 128, 0.5);">Purple</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  _renderLightSection(title, entities) {
    if (!entities.length) return "";
    return `
      <div class="section">
        <h3>${title}</h3>
        <div class="lights">
          ${entities.map((entityId) => this._renderLightItem(entityId)).join("")}
        </div>
      </div>
    `;
  }

  _renderSceneSection(title, entities) {
    if (!entities.length) return "";
    return `
      <div class="section">
        <h3>${title}</h3>
        <div class="scene-buttons">
          ${entities
            .map((entityId) => {
              const state = this.hass.states[entityId];
              const name = state?.attributes?.friendly_name || entityId;
              return `<button data-scene="${entityId}">${name}</button>`;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  _render() {
    if (!this.hass) return;

    const title = this.config?.title || "Light Control";
    const lightEntities = this._getSectionEntities("lights", "light");
    const lampEntities = this._getSectionEntities("lamps", "light");
    const accentEntities = this._getSectionEntities("accents", "light");
    const sceneEntities = this._getSectionEntities("scenes", "scene");

    this.innerHTML = `
      <style>
        .card { padding: 16px; }
        h2 { margin: 0 0 16px 0; }
        h3 { margin: 12px 0 8px 0; }
        .section { margin-bottom: 16px; }
        .lights { display: flex; flex-direction: column; gap: 8px; }
        .light-item { border: 1px solid var(--divider-color); padding: 12px; border-radius: 4px; }
        .light-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .controls { display: flex; flex-direction: column; gap: 8px; }
        .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 4px; }
        .scene-buttons { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 6px; }
        button { padding: 8px 12px; border: 1px solid var(--primary-color); border-radius: 4px; background: transparent; color: var(--primary-text-color); cursor: pointer; }
        button:hover { background: var(--primary-color); color: white; }
        input[type="range"] { width: 100%; }
      </style>
      <ha-card>
        <div class="card">
          <h2>${title}</h2>
          ${this._renderLightSection("Lights", lightEntities)}
          ${this._renderLightSection("Lamps", lampEntities)}
          ${this._renderLightSection("Accents", accentEntities)}
          ${this._renderSceneSection("Scenes", sceneEntities)}
        </div>
      </ha-card>
    `;

    this.querySelectorAll("[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => this._toggle(btn.dataset.toggle));
    });

    this.querySelectorAll("[data-brightness]").forEach((input) => {
      input.addEventListener("change", () =>
        this._setBrightness(input.dataset.brightness, Number(input.value))
      );
    });

    this.querySelectorAll("[data-temp]").forEach((btn) => {
      btn.addEventListener("click", () =>
        this._setColorTemp(btn.dataset.temp, Number(btn.dataset.k))
      );
    });

    this.querySelectorAll("[data-rgb]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rgb = btn.dataset.rgbVal.split(",").map((v) => Number(v));
        this._setRGB(btn.dataset.rgb, rgb);
      });
    });

    this.querySelectorAll("[data-scene]").forEach((btn) => {
      btn.addEventListener("click", () => this._activateScene(btn.dataset.scene));
    });
  }
}

class LightPanelCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
    this._render();
  }

  setHass(hass) {
    this.hass = hass;
    this._render();
  }

  _fireConfigChanged(config) {
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _updateSection(sectionKey, field, value) {
    const next = {
      ...this.config,
      [sectionKey]: {
        ...(this.config?.[sectionKey] || {}),
        [field]: value,
      },
    };
    this._fireConfigChanged(next);
  }

  _render() {
    if (!this.hass) return;

    const sections = [
      { key: "lights", label: "Light Targets", domain: "light" },
      { key: "lamps", label: "Lamp Targets", domain: "light" },
      { key: "accents", label: "Accent Targets", domain: "light" },
      { key: "scenes", label: "Scene Targets", domain: "scene" },
    ];

    this.innerHTML = `
      <style>
        .editor { display: flex; flex-direction: column; gap: 16px; padding: 12px; }
        .section { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .row { display: grid; grid-template-columns: 1fr; gap: 8px; }
        label { font-weight: 600; }
        input, ha-selector { width: 100%; }
        ha-selector { display: block; }
      </style>
      <div class="editor">
        <div class="section">
          <label for="title">Title</label>
          <input id="title" type="text" value="${this.config?.title ?? "Light Control"}" />
        </div>
        ${sections
          .map(
            (section) => `
              <div class="section">
                <label>${section.label}</label>
                <div class="row">
                  <ha-selector data-section="${section.key}" data-domain="${section.domain}"></ha-selector>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;

    const titleInput = this.querySelector("#title");
    titleInput.addEventListener("change", (ev) => {
      const next = { ...this.config, title: ev.target.value };
      this._fireConfigChanged(next);
    });

    this.querySelectorAll("ha-selector").forEach((picker) => {
      const sectionKey = picker.dataset.section;
      const domain = picker.dataset.domain;
      const sectionConfig = this.config?.[sectionKey] || {};
      picker.hass = this.hass;
      picker.selector = {
        target: {
          entity: { domain },
          area: {},
          label: {},
        },
      };
      picker.value = sectionConfig.targets || {};
      picker.addEventListener("value-changed", (ev) => {
        this._updateSection(sectionKey, "targets", ev.detail.value || {});
      });
    });
  }
}

if (!customElements.get("light-panel-card")) {
  customElements.define("light-panel-card", LightPanelCard);
}

if (!customElements.get("light-panel-card-editor")) {
  customElements.define("light-panel-card-editor", LightPanelCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "custom:light-panel-card")) {
  window.customCards.push({
    type: "custom:light-panel-card",
    name: "Light Panel Card",
    description: "Light control panel card",
  });
}

if (!window.customCards.some((c) => c.type === "light-panel-card")) {
  window.customCards.push({
    type: "light-panel-card",
    name: "Light Panel Card",
    description: "Light control panel card",
  });
}

window.dispatchEvent(
  new CustomEvent("ll-custom-card", {
    detail: {
      type: "custom:light-panel-card",
      name: "Light Panel Card",
      description: "Light control panel card",
    },
  })
);

console.info("%c🎚️ Lovelace Cards loaded", "color: #ff6b6b; font-weight: bold;");
