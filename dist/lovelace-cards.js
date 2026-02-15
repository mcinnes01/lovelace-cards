function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,b=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,E=t=>t,w=A.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,P=`<${T}>`,O=document,M=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,z="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,L=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),V=new WeakMap,G=O.createTreeWalker(O,129);function J(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===H?"!--"===l[1]?o=N:void 0!==l[1]?o=R:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=r??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?D:j):o===D||o===j?o=L:o===N||o===R?o=H:(o=L,r=void 0);const d=o===L&&t[e+1].startsWith("/>")?" ":"";n+=o===H?s+P:c>=0?(i.push(a),s.slice(0,c)+C+s.slice(c)+k+d):s+k+(-2===c?e:d)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=F.createElement(l,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[n++],s=i.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),G.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===q)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=U(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);G.currentNode=i;let r=G.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=G.nextNode(),n++)}return G.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new F(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=K}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Q(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Q(this,i[s+o],e,o),a===q&&(a=this._$AH[o]),n||=!U(a)||a!==this._$AH[o],a===K?t=K:t!==K&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===q)return;const s=this._$AH,i=t===K&&s!==K||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==K&&(s===K||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(F,Y),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},dt=(t=ht,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function gt(t){return pt({...t,state:!0,attribute:!1})}const ut=[{name:"Cool",kelvin:6500,color:"rgba(135, 206, 250, 0.6)"},{name:"Daylight",kelvin:5e3,color:"rgba(255, 255, 255, 0.8)",text_color:"#000"},{name:"White",kelvin:4e3,color:"rgba(255, 200, 100, 0.5)"},{name:"Warm",kelvin:2700,color:"rgba(255, 152, 0, 0.6)"}],ft=[{name:"Orange",color:[255,160,120],background:"rgba(255, 160, 120, 0.7)"},{name:"Blue",color:[120,180,255],background:"rgba(120, 180, 255, 0.7)"},{name:"Green",color:[150,255,180],background:"rgba(150, 255, 180, 0.7)"},{name:"Pink",color:[255,180,220],background:"rgba(255, 180, 220, 0.7)"},{name:"Purple",color:[200,150,255],background:"rgba(200, 150, 255, 0.7)"}],bt=[{key:"all",label:"All",icon:"mdi:lightbulb-group",entityKey:"lights"},{key:"lights",label:"Light",icon:"mdi:ceiling-light",entityKey:"lights"},{key:"lamps",label:"Lamps",icon:"mdi:lamp",entityKey:"lamps"},{key:"accents",label:"Accent",icon:"mdi:led-strip-variant",entityKey:"accents"}],mt=["rgba(100, 150, 255, 0.35)","rgba(76, 175, 80, 0.35)","rgba(156, 39, 176, 0.35)","rgba(255, 152, 0, 0.35)","rgba(233, 30, 99, 0.35)","rgba(0, 188, 212, 0.35)","rgba(255, 87, 34, 0.35)","rgba(63, 81, 181, 0.35)","rgba(139, 195, 74, 0.35)","rgba(121, 85, 72, 0.35)"];let yt=class extends at{constructor(){super(...arguments),this.activeTab="all",this.selectedEntity=null}setConfig(t){this.config=t}static getConfigElement(){return document.createElement("light-panel-card-editor")}static getStubConfig(){return{type:"custom:light-panel-card",title:"Light Control Panel",lights:{targets:{}},lamps:{targets:{}},accents:{targets:{}},scenes:{targets:{}}}}getCardSize(){return 6}toArray(t){return Array.isArray(t)?t:"string"==typeof t?[t]:[]}getEntityModes(t){return this.hass?.states[t]?.attributes?.supported_color_modes||[]}entitySupportsBrightness(t){const e=this.getEntityModes(t);return e.length>0&&!e.every(t=>"onoff"===t)}entitySupportsColorTemp(t){return this.getEntityModes(t).includes("color_temp")}entitySupportsColor(t){const e=this.getEntityModes(t);return e.includes("hs")||e.includes("rgb")||e.includes("xy")}filterBrightness(t){return t.filter(t=>this.entitySupportsBrightness(t))}filterColorTemp(t){return t.filter(t=>this.entitySupportsColorTemp(t))}filterColor(t){return t.filter(t=>this.entitySupportsColor(t))}getSectionEntities(t,e){if(!this.hass||!this.config)return[];const s=this.config[t]||{},i=s.targets||{},r=this.toArray(i.entity_id).length?this.toArray(i.entity_id):this.toArray(s.entities),n=this.toArray(i.area_id).length?this.toArray(i.area_id):this.toArray(s.area),o=this.toArray(i.label_id);if(0===r.length&&0===n.length&&0===o.length)return[];const a=new Set(r);return(n.length>0||o.length>0)&&Object.keys(this.hass.states).forEach(t=>{if(t.startsWith(`${e}.`)){if(n.length>0){const e=this.hass.entities?.[t],s=e?.area_id;if(s&&n.includes(s))return void a.add(t);const i=e?.device_id;if(i&&this.hass.devices?.[i]){const e=this.hass.devices[i].area_id;if(e&&n.includes(e))return void a.add(t)}}if(o.length>0){const e=this.hass.entities?.[t],s=e?.labels||[];Array.isArray(s)&&s.some(t=>o.includes(t))&&a.add(t)}}}),Array.from(a)}getAllLightEntities(){const t=this.getSectionEntities("lights","light"),e=this.getSectionEntities("lamps","light"),s=this.getSectionEntities("accents","light"),i=new Set,r=[];return[...t,...e,...s].forEach(t=>{i.has(t)||(i.add(t),r.push(t))}),r}getActiveEntities(){switch(this.activeTab){case"lights":return this.getSectionEntities("lights","light");case"lamps":return this.getSectionEntities("lamps","light");case"accents":return this.getSectionEntities("accents","light");default:return this.getAllLightEntities()}}getControlTargets(){const t=this.getActiveEntities();return this.selectedEntity&&t.includes(this.selectedEntity)?[this.selectedEntity]:t}isAnyOn(t){return t.some(t=>"on"===this.hass?.states[t]?.state)}getAverageBrightness(t){const e=this.filterBrightness(t).filter(t=>"on"===this.hass?.states[t]?.state);if(0===e.length)return 0;const s=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.brightness||0),0);return Math.round(s/e.length/255*100)}getEntityBrightness(t){const e=this.hass?.states[t];return e&&"on"===e.state?Math.round((e.attributes?.brightness||0)/255*100):0}toggleEntity(t){if(!this.hass)return;const e=this.hass.states[t];this.hass.callService("light","on"===e?.state?"turn_off":"turn_on",{entity_id:t})}selectEntity(t){this.selectedEntity=this.selectedEntity===t?null:t}setTab(t){this.activeTab=t,this.selectedEntity=null}setBrightnessAll(t,e){this.hass&&this.filterBrightness(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,brightness:Math.round(e/100*255)})})}setColorTempAll(t,e){this.hass&&this.filterColorTemp(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,color_temp_kelvin:e,brightness_pct:100})})}setRGBAll(t,e){this.hass&&this.filterColor(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,rgb_color:e,brightness_pct:100})})}activateScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}render(){if(!this.hass||!this.config)return W`<div>Loading...</div>`;const t=this.config.title||"Light Control Panel",e=this.getActiveEntities(),s=this.getControlTargets(),i=this.getSectionEntities("scenes","scene"),r=!1!==this.config.show_section_tabs,n=!1!==this.config.show_brightness,o=!1!==this.config.show_color_temp,a=!1!==this.config.show_temp_presets,l=!1!==this.config.show_color_presets,c=this.filterBrightness(s),h=this.filterColorTemp(s),d=this.filterColor(s),p=c.length>0,g=h.length>0,u=d.length>0,f=this.selectedEntity&&e.includes(this.selectedEntity)&&!this.entitySupportsBrightness(this.selectedEntity);return W`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${t}</h2>

          ${r?this.renderTabs():K}

          ${e.length>0?W`
                ${this.renderEntityCards(e)}

                ${f?this.renderOnOffControls(this.selectedEntity):W`
                      ${n&&p?this.renderBrightnessSlider(s):K}
                      ${o&&g?this.renderColorTempSlider(s):K}
                      ${a&&g?this.renderTempPresets(s):K}
                      ${l&&u?this.renderColorPresets(s):K}
                    `}
              `:W`<div class="empty-state">No lights configured for this section</div>`}

          ${i.length>0?this.renderSceneButtons(i):K}
        </div>
      </ha-card>
    `}renderTabs(){return W`
      <div class="tab-bar">
        ${bt.map(t=>{const e="all"===t.key?this.getAllLightEntities():this.getSectionEntities(t.entityKey,"light"),s=this.activeTab===t.key,i=this.isAnyOn(e);return W`
            <button
              class="tab-btn ${s?"active":""} ${i?"on":"off"}"
              @click=${()=>this.setTab(t.key)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `})}
      </div>
    `}renderEntityCards(t){return W`
      <div class="entity-grid">
        ${t.map(t=>{const e=this.hass.states[t];if(!e)return K;const s="on"===e.state,i=this.selectedEntity===t,r=e.attributes?.friendly_name||t.split(".").pop()||t,n=this.entitySupportsBrightness(t),o=n?this.getEntityBrightness(t):0,a=e.attributes?.icon||(n?"mdi:lamp":"mdi:lightbulb");return W`
            <div
              class="entity-card ${s?"on":"off"} ${i?"selected":""}"
              @click=${()=>this.selectEntity(t)}
            >
              <button
                class="entity-power ${s?"on":"off"}"
                @click=${e=>{e.stopPropagation(),this.toggleEntity(t)}}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <ha-icon .icon=${a} class="entity-icon ${s?"on":""}"></ha-icon>
              <span class="entity-name">${r}</span>
              ${n&&s?W`<span class="entity-brightness">${o}%</span>`:K}
            </div>
          `})}
      </div>
    `}renderOnOffControls(t){const e=this.hass.states[t],s="on"===e?.state;return W`
      <div class="onoff-controls">
        <button
          class="onoff-big ${s?"active":""}"
          @click=${()=>{s||this.hass.callService("light","turn_on",{entity_id:t})}}
        >
          <ha-icon icon="mdi:power-on"></ha-icon>
          <span>On</span>
        </button>
        <button
          class="onoff-big ${s?"":"active"}"
          @click=${()=>{s&&this.hass.callService("light","turn_off",{entity_id:t})}}
        >
          <ha-icon icon="mdi:power-off"></ha-icon>
          <span>Off</span>
        </button>
      </div>
    `}renderBrightnessSlider(t){const e=this.getAverageBrightness(t),s=this.filterBrightness(t),i=this.isAnyOn(s);return W`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:brightness-6" class="slider-icon ${i?"on":""}"></ha-icon>
          <div class="slider-info">
            <span class="slider-label">Brightness</span>
            <span class="slider-value">${e}%</span>
          </div>
        </div>
        <div class="slider-track brightness-track">
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(e)}
            @input=${e=>{const s=Number(e.target.value);this.setBrightnessAll(t,s)}}
          />
          <div class="slider-fill brightness-fill" style="width: ${e}%"></div>
        </div>
      </div>
    `}renderColorTempSlider(t){const e=this.filterColorTemp(t).filter(t=>"on"===this.hass?.states[t]?.state);let s=50;if(e.length>0){const t=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.color_temp_kelvin||4e3),0),i=t/e.length;s=Math.round((i-2700)/3800*100)}return W`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:thermometer" class="slider-icon on"></ha-icon>
          <div class="slider-info">
            <span class="slider-label">Color Temperature</span>
            <span class="slider-value">${s}%</span>
          </div>
        </div>
        <div class="slider-track temp-track">
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(s)}
            @input=${e=>{const s=Number(e.target.value),i=Math.round(2700+s/100*3800);this.setColorTempAll(t,i)}}
          />
          <div class="slider-fill temp-fill" style="width: ${s}%"></div>
        </div>
      </div>
    `}renderTempPresets(t){const e=this.config?.color_temp_presets||ut;return W`
      <div class="preset-row">
        ${e.map(e=>W`
            <button
              class="preset-btn temp-preset"
              style="background: ${e.color}; color: ${e.text_color||"#fff"}"
              @click=${()=>this.setColorTempAll(t,e.kelvin)}
            >
              <ha-icon icon="mdi:lamp" class="preset-icon"></ha-icon>
              <span>${e.name}</span>
            </button>
          `)}
      </div>
    `}renderColorPresets(t){const e=this.config?.color_presets||ft;return W`
      <div class="preset-row">
        ${e.map(e=>W`
            <button
              class="preset-btn color-preset"
              style="background: ${e.background}; color: #fff"
              @click=${()=>this.setRGBAll(t,e.color)}
            >
              ${e.name}
            </button>
          `)}
      </div>
    `}renderSceneButtons(t){let e=0;return W`
      <div class="scene-section">
        <div class="scene-row">
          ${t.map(t=>{const s=this.hass.states[t];if(!s||"unavailable"===s.state||"unknown"===s.state)return K;const i=s.attributes?.friendly_name||t.split(".").pop()||t,r=s.attributes?.icon||"mdi:palette",n=mt[e%mt.length];return e++,W`
              <button
                class="scene-btn"
                style="background: ${n}"
                @click=${()=>this.activateScene(t)}
              >
                <ha-icon .icon=${r}></ha-icon>
                <span>${i}</span>
              </button>
            `})}
        </div>
      </div>
    `}};yt.styles=o`
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

    /* ── On/Off Big Buttons ─────────────────────── */
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
      padding: 20px 16px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      color: var(--panel-secondary);
      background: rgba(255, 255, 255, 0.04);
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s;
    }

    .onoff-big ha-icon {
      --mdc-icon-size: 32px;
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
  `,t([pt({attribute:!1})],yt.prototype,"hass",void 0),t([gt()],yt.prototype,"config",void 0),t([gt()],yt.prototype,"activeTab",void 0),t([gt()],yt.prototype,"selectedEntity",void 0),yt=t([ct("light-panel-card")],yt);let vt=class extends at{setConfig(t){this.config=t}fireConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}updateTitle(t){const e=t.target,s={...this.config,title:e.value};this.config=s,this.fireConfigChanged(s)}updateTargets(t,e){const s={...this.config,[t]:{...this.config?.[t]||{},targets:e||{}}};this.config=s,this.fireConfigChanged(s)}render(){return this.hass&&this.config?W`
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
    `:W`<div>Loading...</div>`}};vt.styles=o`
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
  `,t([pt({attribute:!1})],vt.prototype,"hass",void 0),t([gt()],vt.prototype,"config",void 0),vt=t([ct("light-panel-card-editor")],vt),console.info("%c🎚️ Lovelace Cards loaded","color: #ff6b6b; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.some(t=>"custom:light-panel-card"===t.type)||window.customCards.push({type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.customCards.some(t=>"light-panel-card"===t.type)||window.customCards.push({type:"light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.dispatchEvent(new CustomEvent("ll-custom-card",{detail:{type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}}));
