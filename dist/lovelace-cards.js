function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,$=g.trustedTypes,f=$?$.emptyScript:"",m=g.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[_("elementProperties")]=new Map,A[_("finalized")]=new Map,m?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,E=t=>t,C=S.trustedTypes,w=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+P,O=`<${T}>`,U=document,k=()=>U.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,M="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,z=/"/g,I=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),V=new WeakMap,J=U.createTreeWalker(U,129);function K(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(o.lastIndex=c,h=o.exec(s),null!==h);)c=o.lastIndex,o===H?"!--"===h[1]?o=N:void 0!==h[1]?o=j:void 0!==h[2]?(I.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=B):void 0!==h[3]&&(o=B):o===B?">"===h[0]?(o=r??H,l=-1):void 0===h[1]?l=-2:(l=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?B:'"'===h[3]?z:D):o===z||o===D?o=B:o===N||o===j?o=H:(o=B,r=void 0);const d=o===B&&t[e+1].startsWith("/>")?" ":"";n+=o===H?s+O:l>=0?(i.push(a),s.slice(0,l)+x+s.slice(l)+P+d):s+P+(-2===l?e:d)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[h,l]=Z(t,e);if(this.el=F.createElement(h,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=l[n++],s=i.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),J.nextNode(),a.push({type:2,index:++r});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===q)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=L(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);J.currentNode=i;let r=J.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),L(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new F(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=G}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Q(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Q(this,i[s+o],e,o),a===q&&(a=this._$AH[o]),n||=!L(a)||a!==this._$AH[o],a===G?t=G:t!==G&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const s=this._$AH,i=t===G&&s!==G||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==G&&(s===G||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=S.litHtmlPolyfillSupport;nt?.(F,Y),(S.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(k(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ht=ot.litElementPolyfillSupport;ht?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ct,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}let gt=class extends at{setConfig(t){this.config=t}static getConfigElement(){return document.createElement("light-panel-card-editor")}static getStubConfig(){return{type:"custom:light-panel-card",title:"Light Control",lights:{targets:{}},lamps:{targets:{}},accents:{targets:{}},scenes:{targets:{}}}}getCardSize(){return 4}getSectionEntities(t,e){if(!this.hass||!this.config)return[];const s=this.config[t]||{},i=s.targets||{},r=Array.isArray(i.entity_id)?i.entity_id:Array.isArray(s.entities)?s.entities:[],n=Array.isArray(i.area_id)?i.area_id:s.area?[s.area]:[],o=Array.isArray(i.label_id)?i.label_id:[];if(0===r.length&&0===n.length&&0===o.length)return[];const a=new Set(r);return(n.length>0||o.length>0)&&Object.keys(this.hass.states).forEach(t=>{if(t.startsWith(`${e}.`)){if(n.length>0){const e=this.hass.entities?.[t],s=e?.area_id;if(s&&n.includes(s))return void a.add(t);const i=e?.device_id;if(i&&this.hass.devices?.[i]){const e=this.hass.devices[i].area_id;if(e&&n.includes(e))return void a.add(t)}}if(o.length>0){const e=this.hass.entities?.[t],s=e?.labels||[];Array.isArray(s)&&s.some(t=>o.includes(t))&&a.add(t)}}}),Array.from(a)}toggleLight(t){if(!this.hass)return;const e=this.hass.states[t];this.hass.callService("light","on"===e.state?"turn_off":"turn_on",{entity_id:t})}setBrightness(t,e){this.hass&&this.hass.callService("light","turn_on",{entity_id:t,brightness:Math.round(e/100*255)})}setColorTemp(t,e){this.hass&&this.hass.callService("light","turn_on",{entity_id:t,color_temp_kelvin:e})}setRGB(t,e){this.hass&&this.hass.callService("light","turn_on",{entity_id:t,rgb_color:e})}activateScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}render(){if(!this.hass||!this.config)return W`<div>Loading...</div>`;const t=this.config.title||"Light Control",e=this.getSectionEntities("lights","light"),s=this.getSectionEntities("lamps","light"),i=this.getSectionEntities("accents","light"),r=this.getSectionEntities("scenes","scene");return W`
      <ha-card>
        <div class="card-content">
          <h2>${t}</h2>
          ${this.renderLightSection("Lights",e)}
          ${this.renderLightSection("Lamps",s)}
          ${this.renderLightSection("Accents",i)}
          ${this.renderSceneSection("Scenes",r)}
        </div>
      </ha-card>
    `}renderLightSection(t,e){return e.length?W`
      <div class="section">
        <h3>${t}</h3>
        <div class="lights-container">
          ${e.map(t=>this.renderLight(t))}
        </div>
      </div>
    `:W``}renderSceneSection(t,e){return e.length?W`
      <div class="section">
        <h3>${t}</h3>
        <div class="scene-buttons">
          ${e.map(t=>this.renderScene(t))}
        </div>
      </div>
    `:W``}renderScene(t){const e=this.hass.states[t];return W`
      <button @click="${()=>this.activateScene(t)}">${e?.attributes?.friendly_name||t}</button>
    `}renderLight(t){const e=this.hass.states[t];if(!e)return W``;const s="on"===e.state,i=e.attributes?.brightness||0,r=Math.round(i/255*100);return W`
      <div class="light-item">
        <div class="light-header">
          <span class="entity-name">${e.attributes?.friendly_name||t}</span>
          <button @click="${()=>this.toggleLight(t)}">${s?"On":"Off"}</button>
        </div>
        ${s?W`
              <div class="light-controls">
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value="${r}"
                  @change="${e=>this.setBrightness(t,Number(e.target.value))}"
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
    `}};gt.styles=o`
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
  `,t([pt({attribute:!1})],gt.prototype,"hass",void 0),t([ut()],gt.prototype,"config",void 0),gt=t([lt("light-panel-card")],gt);let $t=class extends at{setConfig(t){this.config=t}fireConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}updateTitle(t){const e=t.target,s={...this.config,title:e.value};this.config=s,this.fireConfigChanged(s)}updateTargets(t,e){const s={...this.config,[t]:{...this.config?.[t]||{},targets:e||{}}};this.config=s,this.fireConfigChanged(s)}render(){return this.hass&&this.config?W`
      <div class="editor">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title||"Light Control"}"
            @change="${this.updateTitle}"
          />
        </div>

        <div class="form-group">
          <label>Light Targets</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{target:{entity:{domain:"light"},area:{},label:{}}}}"
            .value="${this.config.lights?.targets||{}}"
            @value-changed="${t=>this.updateTargets("lights",t.detail?.value||{})}"
          ></ha-selector>
        </div>

        <div class="form-group">
          <label>Lamp Targets</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{target:{entity:{domain:"light"},area:{},label:{}}}}"
            .value="${this.config.lamps?.targets||{}}"
            @value-changed="${t=>this.updateTargets("lamps",t.detail?.value||{})}"
          ></ha-selector>
        </div>

        <div class="form-group">
          <label>Accent Targets</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{target:{entity:{domain:"light"},area:{},label:{}}}}"
            .value="${this.config.accents?.targets||{}}"
            @value-changed="${t=>this.updateTargets("accents",t.detail?.value||{})}"
          ></ha-selector>
        </div>

        <div class="form-group">
          <label>Scene Targets</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{target:{entity:{domain:"scene"},area:{},label:{}}}}"
            .value="${this.config.scenes?.targets||{}}"
            @value-changed="${t=>this.updateTargets("scenes",t.detail?.value||{})}"
          ></ha-selector>
        </div>
      </div>
    `:W`<div>Loading...</div>`}};$t.styles=o`
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
  `,t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([ut()],$t.prototype,"config",void 0),$t=t([lt("light-panel-card-editor")],$t),console.info("%c🎚️ Lovelace Cards loaded","color: #ff6b6b; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.some(t=>"custom:light-panel-card"===t.type)||window.customCards.push({type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.customCards.some(t=>"light-panel-card"===t.type)||window.customCards.push({type:"light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.dispatchEvent(new CustomEvent("ll-custom-card",{detail:{type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}}));
