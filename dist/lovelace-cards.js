class LightPanelCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
  }

  setHass(hass) {
    this.hass = hass;
    this._updateLights();
    this._render();
  }

  _updateLights() {
    if (!this.hass) return;
    const cfg = this.config || {};
    this.lights = Object.keys(this.hass.states).filter((entityId) => {
      if (!entityId.startsWith("light.")) return false;
      const state = this.hass.states[entityId];

      if (Array.isArray(cfg.entities) && cfg.entities.length > 0) {
        return cfg.entities.includes(entityId);
      }

      if (cfg.area) {
        return state.attributes?.area_id === cfg.area;
      }

      return true;
    });
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

  static getConfigElement() {
    return document.createElement("light-panel-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:light-panel-card", area: "" };
  }

  getCardSize() {
    return 4;
  }

  _render() {
    if (!this.hass) return;
    const title = this.config?.title || "Light Control";
    const lights = this.lights || [];

    this.innerHTML = `
      <style>
        .card { padding: 16px; }
        h2 { margin: 0 0 16px 0; }
        .lights { display: flex; flex-direction: column; gap: 8px; }
        .light-item { border: 1px solid var(--divider-color); padding: 12px; border-radius: 4px; }
        .light-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .controls { display: flex; flex-direction: column; gap: 8px; }
        .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 4px; }
        button { padding: 8px 12px; border: 1px solid var(--primary-color); border-radius: 4px; background: transparent; color: var(--primary-text-color); cursor: pointer; }
        button:hover { background: var(--primary-color); color: white; }
        input[type="range"] { width: 100%; }
      </style>
      <ha-card>
        <div class="card">
          <h2>${title}</h2>
          <div class="lights">
            ${lights
              .map((entityId) => {
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
              })
              .join("")}
          </div>
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
  }
}

class LightPanelCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
  }

  setHass(hass) {
    this.hass = hass;
  }

  connectedCallback() {
    this.innerHTML = `
      <ha-alert alert-type="info">Use YAML editor for now. Example:
      <pre>type: custom:light-panel-card\narea: Lounge</pre></ha-alert>
    `;
  }
}

customElements.define("light-panel-card", LightPanelCard);
customElements.define("light-panel-card-editor", LightPanelCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "custom:light-panel-card",
  name: "Light Panel Card",
  description: "Light control panel card",
});
window.customCards.push({
  type: "light-panel-card",
  name: "Light Panel Card",
  description: "Light control panel card",
});
window.dispatchEvent(
  new CustomEvent("ll-custom-card", {
    detail: {
      type: "custom:light-panel-card",
      name: "Light Panel Card",
      description: "Light control panel card",
    },
  })
);

console.info("%c🎚️ Lovelace Cards loaded", "color: #ff6b6b; font-weight: bold;");class LightPanelCard extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
  }

  setHass(hass) {
    this.hass = hass;
    this._updateLights();
    this._render();
  }

  _updateLights() {
    if (!this.hass) return;
    const cfg = this.config || {};
    this.lights = Object.keys(this.hass.states).filter((entityId) => {
      if (!entityId.startsWith("light.")) return false;
      const state = this.hass.states[entityId];

      if (Array.isArray(cfg.entities) && cfg.entities.length > 0) {
        return cfg.entities.includes(entityId);
      }

      if (cfg.area) {
        return state.attributes?.area_id === cfg.area;
      }

      return true;
    });
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

  static getConfigElement() {
    return document.createElement("light-panel-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:light-panel-card", area: "" };
  }

  getCardSize() {
    return 4;
  }

  _render() {
    if (!this.hass) return;
    const title = this.config?.title || "Light Control";
    const lights = this.lights || [];

    this.innerHTML = `
      <style>
        .card { padding: 16px; }
        h2 { margin: 0 0 16px 0; }
        .lights { display: flex; flex-direction: column; gap: 8px; }
        .light-item { border: 1px solid var(--divider-color); padding: 12px; border-radius: 4px; }
        .light-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .controls { display: flex; flex-direction: column; gap: 8px; }
        .row { display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 4px; }
        button { padding: 8px 12px; border: 1px solid var(--primary-color); border-radius: 4px; background: transparent; color: var(--primary-text-color); cursor: pointer; }
        button:hover { background: var(--primary-color); color: white; }
        input[type="range"] { width: 100%; }
      </style>
      <ha-card>
        <div class="card">
          <h2>${title}</h2>
          <div class="lights">
            ${lights
              .map((entityId) => {
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
              })
              .join("")}
          </div>
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
  }
}

class LightPanelCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config || {};
  }

  setHass(hass) {
    this.hass = hass;
  }

  connectedCallback() {
    this.innerHTML = `
      <ha-alert alert-type="info">Use YAML editor for now. Example:
      <pre>type: custom:light-panel-card\narea: Lounge</pre></ha-alert>
    `;
  }
}

customElements.define("light-panel-card", LightPanelCard);
customElements.define("light-panel-card-editor", LightPanelCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "custom:light-panel-card",
  name: "Light Panel Card",
  description: "Light control panel card",
});
window.customCards.push({
  type: "light-panel-card",
  name: "Light Panel Card",
  description: "Light control panel card",
});
window.dispatchEvent(
  new CustomEvent("ll-custom-card", {
    detail: {
      type: "custom:light-panel-card",
      name: "Light Panel Card",
      description: "Light control panel card",
    },
  })
);

console.info("%c🎚️ Lovelace Cards loaded", "color: #ff6b6b; font-weight: bold;");const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n(o,t,s)},i=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var a;const l=window,h=l.trustedTypes,c=h?h.emptyScript:"",d=l.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const o=this._$Ep(s,e);void 0!==o&&(this._$Ev.set(o,s),t.push(o))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!
      <ha-card>
        <div class="card-content">
          <h2>${t}</h2>
          <div class="lights-container">
            ${this.lights.map((t=>this.renderLight(t)))}
          </div>
        </div>
      </ha-card>
    `}renderLight(t){const e=this.hass.states[t],s="on"===e.state,o=e.attributes?.brightness||0,n=Math.round(o/255*100);return O`
      <div class="light-item">
        <div class="light-header">
          <span class="entity-name">${e.attributes?.friendly_name||t}</span>
          <button @click="${()=>this.toggleLight(t)}">${s?"On":"Off"}</button>
        </div>
        ${s?O`
              <div class="light-controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value="${n}"
                  @change="${t=>this.setBrightness(t,Number(t.target.value))}"
                />
                <div class="color-temps">
                  <button @click="${()=>this.setColorTemp(t,6500)}">Cool</button>
                  <button @click="${()=>this.setColorTemp(t,5e3)}">Day</button>
                  <button @click="${()=>this.setColorTemp(t,4e3)}">White</button>
                  <button @click="${()=>this.setColorTemp(t,2700)}">Warm</button>
                </div>
                <div class="color-presets">
                  <button @click="${()=>this.setRGB(t,[255,127,0])}" style="background: rgba(255, 127, 0, 0.5);">
                    Orange
                  </button>
                  <button @click="${()=>this.setRGB(t,[0,0,255])}" style="background: rgba(0, 0, 255, 0.5);">
                    Blue
                  </button>
                  <button @click="${()=>this.setRGB(t,[0,255,0])}" style="background: rgba(0, 255, 0, 0.5);">
                    Green
                  </button>
                  <button @click="${()=>this.setRGB(t,[255,192,203])}" style="background: rgba(255, 192, 203, 0.5);">
                    Pink
                  </button>
                  <button @click="${()=>this.setRGB(t,[128,0,128])}" style="background: rgba(128, 0, 128, 0.5);">
                    Purple
                  </button>
                </div>
              </div>
            `:""}
      </div>
    `}}it.styles=r`
    .card-content {
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
  `;class at extends tt{constructor(){super(...arguments),this.config=void 0}setConfig(t){this.config=t}handleChange(t,e){const s={...this.config,[e]:t.target.value},o=new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(o)}render(){if(!this.hass||!this.config)return O``;const t=Array.from(new Set(Object.values(this.hass.states).map((t=>t.attributes?.area_id)).filter(Boolean)));return O`
      <div class="editor">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title||"Light Control"}"
            @change="${t=>this.handleChange(t,"title")}"
          />
        </div>

        <div class="form-group">
          <label>Select Area</label>
          <select @change="${t=>this.handleChange(t,"area")}">
            <option value="">Choose area...</option>
            ${t.map((t=>O`<option value="${t}" ?selected="${t===this.config?.area}">${t}</option>`))}
          </select>
        </div>
      </div>
    `}}var lt,ht,ct,dt,ut;at.styles=r`
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
  `,lt=[ot({attribute:!1})],ht=class extends tt{constructor(){super(...arguments),this.hass=void 0}},ct=[ot({attribute:!1})],ut=function(t,e,s,o){var n,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(r<3?n(i):r>3?n(e,s,i):n(e,s))||i);return r>3&&i&&Object.defineProperty(e,s,i),i}(ct,ht,"hass",dt),ut=function(t,e,s,o){var n,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(r<3?n(i):r>3?n(e,s,i):n(e,s))||i);return r>3&&i&&Object.defineProperty(e,s,i),i}(lt,ht,"config",ut),customElements.define("light-panel-card",it),customElements.define("light-panel-card-editor",at),console.info("%c🎚️ Lovelace Cards loaded","color: #ff6b6b; font-weight: bold;");
