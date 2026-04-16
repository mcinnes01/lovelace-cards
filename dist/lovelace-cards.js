function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,b=u.trustedTypes,f=b?b.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,m?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+P,T=`<${S}>`,M=document,O=()=>M.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,H="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,R=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,N=/"/g,j=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=W(1),K=W(2),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Y=M.createTreeWalker(M,129);function J(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=D:void 0!==l[1]?n=R:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=r??U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?I:'"'===l[3]?N:L):n===N||n===L?n=I:n===D||n===R?n=U:(n=I,r=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===U?i+T:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+P+h):i+P+(-2===c?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=X.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?rt:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),Y.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===S)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=z(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);Y.currentNode=s;let r=Y.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),z(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),o||=!z(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(X,et),(w.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;class ct extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},gt=(t=pt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?gt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function bt(t){return ut({...t,state:!0,attribute:!1})}const ft=[{name:"Cool",kelvin:6500,color:"rgba(135, 206, 250, 0.6)"},{name:"Daylight",kelvin:5e3,color:"rgba(255, 255, 255, 0.8)",text_color:"#000"},{name:"White",kelvin:4e3,color:"rgba(255, 200, 100, 0.5)"},{name:"Warm",kelvin:2700,color:"rgba(255, 152, 0, 0.6)"}],mt=[{name:"Orange",color:[255,160,120],background:"rgba(255, 160, 120, 0.7)"},{name:"Blue",color:[120,180,255],background:"rgba(120, 180, 255, 0.7)"},{name:"Green",color:[150,255,180],background:"rgba(150, 255, 180, 0.7)"},{name:"Pink",color:[255,180,220],background:"rgba(255, 180, 220, 0.7)"},{name:"Purple",color:[200,150,255],background:"rgba(200, 150, 255, 0.7)"}],vt=[{key:"all",label:"All",icon:"mdi:lightbulb-group",entityKey:"lights"},{key:"lights",label:"Light",icon:"mdi:ceiling-light",entityKey:"lights"},{key:"lamps",label:"Lamps",icon:"mdi:lamp",entityKey:"lamps"},{key:"accents",label:"Accent",icon:"mdi:led-strip-variant",entityKey:"accents"}],_t=["rgba(100, 150, 255, 0.35)","rgba(76, 175, 80, 0.35)","rgba(156, 39, 176, 0.35)","rgba(255, 152, 0, 0.35)","rgba(233, 30, 99, 0.35)","rgba(0, 188, 212, 0.35)","rgba(255, 87, 34, 0.35)","rgba(63, 81, 181, 0.35)","rgba(139, 195, 74, 0.35)","rgba(121, 85, 72, 0.35)"],yt=[[255,130,0],[255,185,100],[255,225,180],[255,255,240],[160,180,255],[190,150,255],[255,160,220],[255,100,130]],xt=[[255,0,0],[255,128,0],[255,220,0],[100,220,0],[0,200,80],[0,200,200],[0,100,255],[80,0,255],[200,0,255],[255,0,180],[255,80,80],[200,200,0],[255,150,150],[255,200,130],[255,240,150],[180,255,150],[150,240,255],[150,180,255],[220,150,255],[255,150,220],[200,220,255],[220,255,220],[255,230,200],[200,200,200]];let $t=class extends ct{constructor(){super(...arguments),this.activeTab="all",this.selectedEntity=null,this._colorPickerOpen=!1,this._colorPickerHex="#ff8800",this._colorPickerTargets=[],this._colorPickerMode="color",this._colorH=0,this._colorS=1,this._isDragging=!1,this._colorPickerKelvin=4e3,this._showEffects=!1,this._selectedEffect=null}setConfig(t){this.config=t}static getConfigElement(){return document.createElement("light-panel-card-editor")}static getStubConfig(){return{type:"custom:light-panel-card",title:"Light Control Panel",lights:{targets:{}},lamps:{targets:{}},accents:{targets:{}},scenes:{targets:{}}}}getCardSize(){return 6}toArray(t){return Array.isArray(t)?t:"string"==typeof t?[t]:[]}getEntityModes(t){return this.hass?.states[t]?.attributes?.supported_color_modes||[]}entitySupportsBrightness(t){const e=this.getEntityModes(t);return e.length>0&&!e.every(t=>"onoff"===t)}entitySupportsColorTemp(t){return this.getEntityModes(t).includes("color_temp")}entitySupportsColor(t){const e=this.getEntityModes(t);return e.includes("hs")||e.includes("rgb")||e.includes("xy")}filterBrightness(t){return t.filter(t=>this.entitySupportsBrightness(t))}filterColorTemp(t){return t.filter(t=>this.entitySupportsColorTemp(t))}filterColor(t){return t.filter(t=>this.entitySupportsColor(t))}getSectionEntities(t,e){if(!this.hass||!this.config)return[];const i=this.config[t]||{},s=i.targets||{},r=this.toArray(s.entity_id).length?this.toArray(s.entity_id):this.toArray(i.entities),o=this.toArray(s.area_id).length?this.toArray(s.area_id):this.toArray(i.area),n=this.toArray(s.label_id);if(0===r.length&&0===o.length&&0===n.length)return[];const a=new Set(r);if((o.length>0||n.length>0)&&Object.keys(this.hass.states).forEach(t=>{if(t.startsWith(`${e}.`)){if(o.length>0){const e=this.hass.entities?.[t],i=e?.area_id;if(i&&o.includes(i))return void a.add(t);const s=e?.device_id;if(s&&this.hass.devices?.[s]){const e=this.hass.devices[s].area_id;if(e&&o.includes(e))return void a.add(t)}}if(n.length>0){const e=this.hass.entities?.[t],i=e?.labels||[];Array.isArray(i)&&i.some(t=>n.includes(t))&&a.add(t)}}}),(o.length>0||n.length>0)&&"light"===e){const e={lights:/[_](light|lights)$/,lamps:/[_](lamp|lamps)$/,accents:/[_](accent|accents|led|strip|rgb)$/}[t];if(e){const t=new Set(r);a.forEach(i=>{if(t.has(i))return;const s=i.replace(/^light\./,"");e.test(s)||a.delete(i)})}}return Array.from(a)}getAllLightEntities(){const t=this.getSectionEntities("lights","light"),e=this.getSectionEntities("lamps","light"),i=this.getSectionEntities("accents","light"),s=new Set,r=[];return[...t,...e,...i].forEach(t=>{s.has(t)||(s.add(t),r.push(t))}),r}getTabEntities(){switch(this.activeTab){case"lights":return this.getSectionEntities("lights","light");case"lamps":return this.getSectionEntities("lamps","light");case"accents":return this.getSectionEntities("accents","light");default:return this.getAllLightEntities()}}getControlTargets(){const t=this.getTabEntities();return"all"!==this.activeTab&&this.selectedEntity&&t.includes(this.selectedEntity)?[this.selectedEntity]:t}isAnyOn(t){return t.some(t=>"on"===this.hass?.states[t]?.state)}getAverageBrightness(t){const e=this.filterBrightness(t).filter(t=>"on"===this.hass?.states[t]?.state);if(0===e.length)return 0;const i=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.brightness||0),0);return Math.round(i/e.length/255*100)}getEntityBrightness(t){const e=this.hass?.states[t];return e&&"on"===e.state?Math.round((e.attributes?.brightness||0)/255*100):0}toggleEntity(t){if(!this.hass)return;const e=this.hass.states[t];this.hass.callService("light","on"===e?.state?"turn_off":"turn_on",{entity_id:t})}turnOnAll(t){this.hass&&t.forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t})})}turnOffAll(t){this.hass&&t.forEach(t=>{this.hass.callService("light","turn_off",{entity_id:t})})}selectEntity(t){this.selectedEntity=this.selectedEntity===t?null:t}setTab(t){this.activeTab=t,this.selectedEntity=null}setBrightnessAll(t,e){this.hass&&this.filterBrightness(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,brightness:Math.round(e/100*255)})})}setColorTempAll(t,e){this.hass&&this.filterColorTemp(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,color_temp_kelvin:e,brightness_pct:100})})}setRGBAll(t,e){this.hass&&this.filterColor(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,rgb_color:e,brightness_pct:100})})}activateScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}_hexToRgb(t){return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)]}_rgbToHex(t,e,i){return"#"+[t,e,i].map(t=>t.toString(16).padStart(2,"0")).join("")}_hsvToRgb(t,e,i){t=(t%360+360)%360;const s=Math.floor(t/60),r=t/60-s,o=i*(1-e),n=i*(1-r*e),a=i*(1-(1-r)*e);let l=0,c=0,d=0;switch(s%6){case 0:l=i,c=a,d=o;break;case 1:l=n,c=i,d=o;break;case 2:l=o,c=i,d=a;break;case 3:l=o,c=n,d=i;break;case 4:l=a,c=o,d=i;break;case 5:l=i,c=o,d=n}return[Math.round(255*l),Math.round(255*c),Math.round(255*d)]}_rgbToHsv(t,e,i){t/=255,e/=255,i/=255;const s=Math.max(t,e,i),r=Math.min(t,e,i),o=s-r,n=0===s?0:o/s,a=s;let l=0;if(s!==r)switch(s){case t:l=((e-i)/o+(e<i?6:0))/6;break;case e:l=((i-t)/o+2)/6;break;case i:l=((t-e)/o+4)/6}return[360*l,n,a]}_getCurrentEntityColor(){const t=this._colorPickerTargets[0];if(!t)return"#ff8800";const e=this.hass?.states[t];if(!e||"on"!==e.state)return"#ff8800";const i=e.attributes?.rgb_color;return i?this._rgbToHex(i[0],i[1],i[2]):"#ff8800"}_getEffects(){const t=new Set;for(const e of this._colorPickerTargets){const i=this.hass?.states[e]?.attributes?.effect_list;Array.isArray(i)&&i.forEach(e=>t.add(e))}return Array.from(t)}_setEffect(t){this.hass&&(this._colorPickerTargets.forEach(e=>{this.hass.callService("light","turn_on",{entity_id:e,effect:t})}),this._selectedEffect=t)}_pickSwatchColor(t){const[e,i]=this._rgbToHsv(t[0],t[1],t[2]);this._colorH=e,this._colorS=i,this._colorPickerHex=this._rgbToHex(t[0],t[1],t[2]),"grid"===this._colorPickerMode&&(this._colorPickerMode="color"),requestAnimationFrame(()=>this._drawWheelWithSelector())}_onHexInput(t){if(/^#[0-9a-fA-F]{6}$/.test(t)){const[e,i,s]=this._hexToRgb(t),[r,o]=this._rgbToHsv(e,i,s);this._colorH=r,this._colorS=o,this._colorPickerHex=t.toLowerCase(),requestAnimationFrame(()=>this._drawWheelWithSelector())}}async _tryEyeDropper(){try{const t=new window.EyeDropper,e=await t.open(),[i,s,r]=this._hexToRgb(e.sRGBHex),[o,n]=this._rgbToHsv(i,s,r);this._colorH=o,this._colorS=n,this._colorPickerHex=e.sRGBHex,requestAnimationFrame(()=>this._drawWheelWithSelector())}catch{}}_drawColorWheel(t){const e=t.width,i=e/2,s=e/2,r=e/2,o=t.getContext("2d");if(!o)return;const n=o.createImageData(e,e),a=n.data;for(let t=0;t<e;t++)for(let o=0;o<e;o++){const n=o-i,l=t-s,c=Math.sqrt(n*n+l*l);if(c<=r){const i=(180*Math.atan2(l,n)/Math.PI+360)%360,s=c/r,[d,h,p]=this._hsvToRgb(i,s,1),g=4*(t*e+o);a[g]=d,a[g+1]=h,a[g+2]=p,a[g+3]=255}}o.putImageData(n,0,0)}_drawWheelWithSelector(){const t=this.shadowRoot?.querySelector("#color-wheel");if(!t)return;this._drawColorWheel(t);const e=t.getContext("2d");if(!e)return;const i=t.width/2,s=t.height/2,r=i-4,o=this._colorH*Math.PI/180,n=this._colorS*r,a=i+n*Math.cos(o),l=s+n*Math.sin(o);e.beginPath(),e.arc(a,l,10,0,2*Math.PI),e.strokeStyle="white",e.lineWidth=3,e.stroke(),e.beginPath(),e.arc(a,l,10,0,2*Math.PI),e.strokeStyle="rgba(0, 0, 0, 0.35)",e.lineWidth=1,e.stroke()}_applyWheelCoords(t,e,i){const s=t.getBoundingClientRect(),r=t.width/2,o=t.height/2,n=(e-s.left)*(t.width/s.width)-r,a=(i-s.top)*(t.height/s.height)-o,l=(180*Math.atan2(a,n)/Math.PI+360)%360,c=Math.min(Math.sqrt(n*n+a*a)/r,1),[d,h,p]=this._hsvToRgb(l,c,1);this._colorH=l,this._colorS=c,this._colorPickerHex=this._rgbToHex(d,h,p),this._drawWheelWithSelector()}_onWheelPointerDown(t){this._isDragging=!0;const e=t.currentTarget;e.setPointerCapture(t.pointerId),this._applyWheelCoords(e,t.clientX,t.clientY)}_onWheelPointerMove(t){this._isDragging&&this._applyWheelCoords(t.currentTarget,t.clientX,t.clientY)}_onWheelPointerUp(t){this._isDragging=!1}_openColorPicker(t){this._colorPickerTargets=t,this._colorPickerMode="color",this._showEffects=!1,this._selectedEffect=null;const e=this._getCurrentEntityColor(),[i,s,r]=this._hexToRgb(e),[o,n]=this._rgbToHsv(i,s,r);this._colorH=o,this._colorS=n,this._colorPickerHex=e;const a=t[0];this._colorPickerKelvin=a?this.hass?.states[a]?.attributes?.color_temp_kelvin??4e3:4e3,this._colorPickerOpen=!0}_closeColorPicker(){this._colorPickerOpen=!1}_applyCustomColor(){if("temp"===this._colorPickerMode)this.setColorTempAll(this._colorPickerTargets,this._colorPickerKelvin);else{const[t,e,i]=this._hsvToRgb(this._colorH,this._colorS,1);this.setRGBAll(this._colorPickerTargets,[t,e,i])}this._colorPickerOpen=!1}updated(t){super.updated(t),(t.has("_colorPickerOpen")&&this._colorPickerOpen&&"color"===this._colorPickerMode||t.has("_colorPickerMode")&&"color"===this._colorPickerMode&&this._colorPickerOpen)&&requestAnimationFrame(()=>this._drawWheelWithSelector())}render(){if(!this.hass||!this.config)return q`<div>Loading...</div>`;const t=this.config.title||"Light Control Panel",e=this.getSectionEntities("scenes","scene"),i=!1!==this.config.show_section_tabs;return q`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${t}</h2>
          ${i?this.renderTabs():V}
          ${"all"===this.activeTab?this.renderAllTab():this.renderTypeTab()}
          ${e.length>0?this.renderSceneButtons(e):V}
        </div>
      </ha-card>
      ${this._colorPickerOpen?this.renderColorPickerModal():V}
    `}renderColorPickerModal(){const[t,e,i]=this._hsvToRgb(this._colorH,this._colorS,1),s=this._rgbToHex(t,e,i),r=this._getCurrentEntityColor(),o=this._getEffects(),n=this._colorPickerTargets.some(t=>this.entitySupportsColorTemp(t)),a=this.config?.color_temp_presets||ft,l="EyeDropper"in window;return q`
      <div class="color-modal-overlay" @click=${this._closeColorPicker}>
        <div class="color-modal" @click=${t=>t.stopPropagation()}>

          <!-- Mode tabs -->
          <div class="picker-mode-tabs">
            <button
              class="picker-mode-tab ${"color"===this._colorPickerMode?"active":""}"
              @click=${()=>{this._colorPickerMode="color"}}
              title="Colour wheel"
            >
              <ha-icon icon="mdi:palette"></ha-icon>
            </button>
            <button
              class="picker-mode-tab ${"grid"===this._colorPickerMode?"active":""}"
              @click=${()=>{this._colorPickerMode="grid"}}
              title="Colour grid"
            >
              <ha-icon icon="mdi:view-grid"></ha-icon>
            </button>
            ${n?q`
              <button
                class="picker-mode-tab ${"temp"===this._colorPickerMode?"active":""}"
                @click=${()=>{this._colorPickerMode="temp"}}
                title="Colour temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
              </button>
            `:V}
          </div>

          <!-- Colour wheel (fine picker) -->
          ${"color"===this._colorPickerMode?q`
            <div class="wheel-wrapper">
              <canvas
                id="color-wheel"
                width="260"
                height="260"
                class="color-wheel-canvas"
                @pointerdown=${this._onWheelPointerDown}
                @pointermove=${this._onWheelPointerMove}
                @pointerup=${this._onWheelPointerUp}
              ></canvas>
              ${l?q`
                <button class="eyedropper-btn" @click=${this._tryEyeDropper} title="Pick colour from screen">
                  <ha-icon icon="mdi:eyedropper-variant"></ha-icon>
                </button>
              `:V}
            </div>

          <!-- Hex grid (coarse picker) -->
          `:"grid"===this._colorPickerMode?q`
            <div class="hex-grid">
              ${xt.map(t=>q`
                <button
                  class="hex-cell"
                  style="background: rgb(${t[0]}, ${t[1]}, ${t[2]})"
                  @click=${()=>this._pickSwatchColor(t)}
                ></button>
              `)}
            </div>

          <!-- Colour temperature mode -->
          `:q`
            <div class="temp-picker-area">
              <div class="temp-gradient-track">
                <input
                  type="range"
                  min="2700"
                  max="6500"
                  .value=${String(this._colorPickerKelvin)}
                  @input=${t=>{this._colorPickerKelvin=Number(t.target.value)}}
                />
              </div>
              <div class="temp-presets-mini">
                ${a.map(t=>q`
                  <button
                    class="temp-mini-btn"
                    style="background: ${t.color}; color: ${t.text_color||"#fff"}"
                    @click=${()=>{this._colorPickerKelvin=t.kelvin}}
                  >${t.name}</button>
                `)}
              </div>
            </div>
          `}

          <!-- Colour preview + values (colour modes only) -->
          ${"temp"!==this._colorPickerMode?q`
            <div class="color-info-row">
              <div class="color-preview-pair">
                <div class="preview-box" style="background: ${r}" title="Current colour"></div>
                <div class="preview-box selected-preview" style="background: ${s}" title="Selected colour"></div>
              </div>
              <div class="color-values-col">
                <input
                  class="hex-input"
                  type="text"
                  .value=${s}
                  maxlength="7"
                  @change=${t=>this._onHexInput(t.target.value)}
                />
                <span class="rgb-value">rgb(${t}, ${e}, ${i})</span>
              </div>
            </div>

            <!-- Quick swatches -->
            <div class="quick-swatches">
              ${yt.map(t=>q`
                <button
                  class="quick-swatch"
                  style="background: rgb(${t[0]}, ${t[1]}, ${t[2]})"
                  @click=${()=>this._pickSwatchColor(t)}
                ></button>
              `)}
            </div>
          `:V}

          <!-- Effects -->
          ${o.length>0?q`
            <button class="effects-toggle-btn" @click=${()=>{this._showEffects=!this._showEffects}}>
              <ha-icon icon="mdi:auto-fix"></ha-icon>
              <span>Effect</span>
              <ha-icon icon=${this._showEffects?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            ${this._showEffects?q`
              <div class="effects-list">
                ${o.map(t=>q`
                  <button
                    class="effect-btn ${this._selectedEffect===t?"active":""}"
                    @click=${()=>this._setEffect(t)}
                  >${t}</button>
                `)}
              </div>
            `:V}
          `:V}

          <!-- Actions -->
          <div class="color-modal-actions">
            <button class="color-modal-cancel" @click=${this._closeColorPicker}>Cancel</button>
            <button class="color-modal-apply" @click=${this._applyCustomColor}>Apply</button>
          </div>

        </div>
      </div>
    `}renderAllTab(){const t=this.getAllLightEntities();if(0===t.length)return q`<div class="empty-state">No lights configured</div>`;const e=t,i=this.filterBrightness(e),s=this.filterColorTemp(e),r=this.filterColor(e),o=!1!==this.config.show_brightness&&i.length>0,n=!1!==this.config.show_color_temp&&s.length>0,a=!1!==this.config.show_temp_presets&&s.length>0,l=!1!==this.config.show_color_presets&&r.length>0;return q`
      ${this.renderOnOffButtons(e)}
      ${o?this.renderBrightnessSlider(e):V}
      ${n?this.renderColorTempSlider(e):V}
      ${a?this.renderTempPresets(e):V}
      ${l?this.renderColorPresets(e):V}
    `}renderTypeTab(){const t=this.getTabEntities();if(0===t.length)return q`<div class="empty-state">No lights configured for this section</div>`;const e=this.getControlTargets(),i=this.filterBrightness(e),s=this.filterColorTemp(e),r=this.filterColor(e),o=!1!==this.config.show_brightness&&i.length>0,n=!1!==this.config.show_color_temp&&s.length>0,a=!1!==this.config.show_temp_presets&&s.length>0,l=!1!==this.config.show_color_presets&&r.length>0;return q`
      ${this.renderEntityCards(t)}
      ${this.renderOnOffButtons(e)}
      ${o?this.renderBrightnessSlider(e):V}
      ${n?this.renderColorTempSlider(e):V}
      ${a?this.renderTempPresets(e):V}
      ${l?this.renderColorPresets(e):V}
    `}renderTabs(){return q`
      <div class="tab-bar">
        ${vt.map(t=>{const e="all"===t.key?this.getAllLightEntities():this.getSectionEntities(t.entityKey,"light"),i=this.activeTab===t.key,s=this.isAnyOn(e);return q`
            <button
              class="tab-btn ${i?"active":""} ${s?"on":"off"}"
              @click=${()=>this.setTab(t.key)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `})}
      </div>
    `}renderEntityCards(t){const e=t.length>1;return q`
      <div class="entity-grid">
        ${e?q`
              <div
                class="entity-card all-card ${null===this.selectedEntity?"selected":""}"
                @click=${()=>this.selectEntity(null)}
              >
                <ha-icon icon="mdi:lightbulb-group" class="entity-icon ${this.isAnyOn(t)?"on":""}"></ha-icon>
                <span class="entity-name">All</span>
              </div>
            `:V}
        ${t.map(e=>{const i=this.hass.states[e];if(!i)return V;const s="on"===i.state,r=this.selectedEntity===e,o=i.attributes?.friendly_name||e.split(".").pop()||e,n=this.entitySupportsBrightness(e),a=n?this.getEntityBrightness(e):0,l=i.attributes?.icon||(n?"mdi:lamp":"mdi:lightbulb"),c=1===t.length;return q`
            <div
              class="entity-card ${s?"on":"off"} ${c||r?"selected":""}"
              @click=${()=>{c||this.selectEntity(e)}}
            >
              <button
                class="entity-power ${s?"on":"off"}"
                @click=${t=>{t.stopPropagation(),this.toggleEntity(e)}}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <ha-icon .icon=${l} class="entity-icon ${s?"on":""}"></ha-icon>
              <span class="entity-name">${o}</span>
              ${n&&s?q`<span class="entity-brightness">${a}%</span>`:V}
            </div>
          `})}
      </div>
    `}renderOnOffButtons(t){this.isAnyOn(t);const e=t.length>0&&t.every(t=>"on"===this.hass?.states[t]?.state),i=t.length>0&&t.every(t=>"on"!==this.hass?.states[t]?.state);return q`
      <div class="onoff-controls">
        <button
          class="onoff-big ${e?"active":""}"
          @click=${()=>this.turnOnAll(t)}
        >
          <ha-icon icon="mdi:lightbulb-on"></ha-icon>
          <span>On</span>
        </button>
        <button
          class="onoff-big ${i?"active":""}"
          @click=${()=>this.turnOffAll(t)}
        >
          <ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>
          <span>Off</span>
        </button>
      </div>
    `}renderBrightnessSlider(t){const e=this.getAverageBrightness(t),i=this.filterBrightness(t),s=this.isAnyOn(i);return q`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:brightness-6" class="slider-icon ${s?"on":""}"></ha-icon>
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
            @input=${e=>{const i=Number(e.target.value);this.setBrightnessAll(t,i)}}
          />
          <div class="slider-fill brightness-fill" style="width: ${e}%"></div>
        </div>
      </div>
    `}renderColorTempSlider(t){const e=this.filterColorTemp(t).filter(t=>"on"===this.hass?.states[t]?.state);let i=50;if(e.length>0){const t=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.color_temp_kelvin||4e3),0),s=t/e.length;i=Math.round((s-2700)/3800*100)}return q`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:thermometer" class="slider-icon on"></ha-icon>
          <div class="slider-info">
            <span class="slider-label">Color Temperature</span>
            <span class="slider-value">${i}%</span>
          </div>
        </div>
        <div class="slider-track temp-track">
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(i)}
            @input=${e=>{const i=Number(e.target.value),s=Math.round(2700+i/100*3800);this.setColorTempAll(t,s)}}
          />
          <div class="slider-fill temp-fill" style="width: ${i}%"></div>
        </div>
      </div>
    `}renderTempPresets(t){const e=this.config?.color_temp_presets||ft,i=this.filterColor(t);return q`
      <div class="preset-row">
        ${e.map(e=>q`
            <button
              class="preset-btn temp-preset"
              style="background: ${e.color}; color: ${e.text_color||"#fff"}"
              @click=${()=>this.setColorTempAll(t,e.kelvin)}
            >
              <ha-icon icon="mdi:lamp" class="preset-icon"></ha-icon>
              <span>${e.name}</span>
            </button>
          `)}
        ${i.length>0?q`
              <button
                class="preset-btn temp-preset color-picker-btn"
                @click=${()=>this._openColorPicker(i)}
              >
                <ha-icon icon="mdi:palette" class="preset-icon"></ha-icon>
                <span>Custom</span>
              </button>
            `:V}
      </div>
    `}renderColorPresets(t){const e=this.config?.color_presets||mt;return q`
      <div class="preset-row">
        ${e.map(e=>q`
            <button
              class="preset-btn color-preset"
              style="background: ${e.background}; color: #fff"
              @click=${()=>this.setRGBAll(t,e.color)}
            >
              ${e.name}
            </button>
          `)}
      </div>
    `}renderSceneButtons(t){let e=0;return q`
      <div class="scene-section">
        <div class="scene-row">
          ${t.map(t=>{const i=this.hass.states[t];if(!i||"unavailable"===i.state||"unknown"===i.state)return V;const s=i.attributes?.friendly_name||t.split(".").pop()||t,r=i.attributes?.icon||"mdi:palette",o=_t[e%_t.length];return e++,q`
              <button
                class="scene-btn"
                style="background: ${o}"
                @click=${()=>this.activateScene(t)}
              >
                <ha-icon .icon=${r}></ha-icon>
                <span>${s}</span>
              </button>
            `})}
        </div>
      </div>
    `}};$t.styles=n`
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

    .entity-card.all-card {
      background: rgba(255, 255, 255, 0.04);
    }

    .entity-card.all-card.selected {
      background: rgba(255, 193, 7, 0.1);
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

    /* ── On/Off Buttons ─────────────────────────── */
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
      padding: 18px 16px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 600;
      color: var(--panel-secondary);
      background: rgba(255, 255, 255, 0.04);
      transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s;
    }

    .onoff-big ha-icon {
      --mdc-icon-size: 28px;
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

    /* ── Colour Picker Button ───────────────────── */
    .color-picker-btn {
      background: linear-gradient(
        135deg,
        rgba(255, 100, 100, 0.5) 0%,
        rgba(100, 200, 100, 0.5) 33%,
        rgba(100, 100, 255, 0.5) 66%,
        rgba(255, 200, 100, 0.5) 100%
      );
      color: #fff;
    }

    /* ── Colour Picker Modal ────────────────────── */
    .color-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .color-modal {
      background: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      border-radius: 20px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      width: min(320px, calc(100vw - 32px));
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    }

    /* Mode tabs */
    .picker-mode-tabs {
      display: flex;
      gap: 6px;
      justify-content: center;
    }

    .picker-mode-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    .picker-mode-tab.active {
      background: var(--amber-glow);
      color: var(--primary-text-color, #fff);
    }

    .picker-mode-tab ha-icon {
      --mdc-icon-size: 22px;
    }

    /* Colour wheel */
    .wheel-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .color-wheel-canvas {
      width: 100%;
      max-width: 260px;
      height: auto;
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: crosshair;
      touch-action: none;
      display: block;
    }

    .eyedropper-btn {
      position: absolute;
      top: 4px;
      right: calc(50% - 130px + 4px);
      width: 36px;
      height: 36px;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(4px);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      transition: background 0.15s;
    }

    .eyedropper-btn:hover {
      background: rgba(0, 0, 0, 0.55);
    }

    .eyedropper-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    /* Hex grid (coarse picker) */
    .hex-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 4px 0;
    }

    .hex-cell {
      aspect-ratio: 0.866;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      border: none;
      cursor: pointer;
      transition: transform 0.1s, filter 0.1s;
    }

    .hex-cell:hover {
      filter: brightness(1.25);
      transform: scale(1.12);
    }

    .hex-cell:active {
      transform: scale(0.9);
    }

    /* Colour temperature mode */
    .temp-picker-area {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 0;
    }

    .temp-gradient-track {
      position: relative;
      height: 36px;
      border-radius: 18px;
      overflow: hidden;
      background: linear-gradient(
        to right,
        rgba(255, 140, 0, 0.9) 0%,
        rgba(255, 200, 130, 0.8) 30%,
        rgba(255, 255, 255, 0.9) 55%,
        rgba(180, 220, 255, 0.9) 80%,
        rgba(140, 195, 250, 0.9) 100%
      );
    }

    .temp-gradient-track input[type="range"] {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    .temp-gradient-track input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 36px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .temp-gradient-track input[type="range"]::-moz-range-thumb {
      width: 16px;
      height: 36px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      border: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .temp-presets-mini {
      display: flex;
      gap: 6px;
    }

    .temp-mini-btn {
      flex: 1;
      padding: 8px 4px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.75em;
      font-weight: 600;
      text-align: center;
      transition: transform 0.1s, filter 0.1s;
    }

    .temp-mini-btn:hover { filter: brightness(1.15); }
    .temp-mini-btn:active { transform: scale(0.95); }

    /* Colour info row */
    .color-info-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .color-preview-pair {
      display: flex;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    .preview-box {
      width: 36px;
      height: 36px;
    }

    .selected-preview {
      border-left: 2px solid rgba(255, 255, 255, 0.15);
    }

    .color-values-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .hex-input {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      color: var(--primary-text-color, #fff);
      font-size: 0.85em;
      font-family: monospace;
      padding: 5px 8px;
      width: 100%;
      box-sizing: border-box;
    }

    .rgb-value {
      font-size: 0.72em;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      font-family: monospace;
    }

    /* Quick swatches */
    .quick-swatches {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }

    .quick-swatch {
      height: 34px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.1s, filter 0.1s;
    }

    .quick-swatch:hover {
      filter: brightness(1.2);
      transform: scale(1.06);
    }

    .quick-swatch:active { transform: scale(0.92); }

    /* Effects */
    .effects-toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.07);
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 600;
      transition: background 0.15s;
      box-sizing: border-box;
    }

    .effects-toggle-btn:hover { background: rgba(255, 255, 255, 0.12); }

    .effects-toggle-btn ha-icon:last-child { margin-left: auto; }

    .effects-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .effect-btn {
      padding: 7px 14px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      background: transparent;
      color: var(--primary-text-color, #fff);
      cursor: pointer;
      font-size: 0.82em;
      transition: background 0.1s, border-color 0.1s;
    }

    .effect-btn.active {
      background: var(--amber-glow);
      border-color: var(--amber-bright);
    }

    /* Modal actions */
    .color-modal-actions {
      display: flex;
      gap: 10px;
    }

    .color-modal-cancel,
    .color-modal-apply {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 600;
      transition: filter 0.1s, transform 0.1s;
    }

    .color-modal-cancel:active,
    .color-modal-apply:active {
      transform: scale(0.96);
    }

    .color-modal-cancel {
      background: rgba(255, 255, 255, 0.1);
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    }

    .color-modal-cancel:hover { filter: brightness(1.3); }

    .color-modal-apply {
      background: var(--amber-glow);
      color: var(--primary-text-color, #fff);
    }

    .color-modal-apply:hover {
      filter: brightness(1.2);
    }
  `,t([ut({attribute:!1})],$t.prototype,"hass",void 0),t([bt()],$t.prototype,"config",void 0),t([bt()],$t.prototype,"activeTab",void 0),t([bt()],$t.prototype,"selectedEntity",void 0),t([bt()],$t.prototype,"_colorPickerOpen",void 0),t([bt()],$t.prototype,"_colorPickerHex",void 0),t([bt()],$t.prototype,"_colorPickerTargets",void 0),t([bt()],$t.prototype,"_colorPickerMode",void 0),t([bt()],$t.prototype,"_colorH",void 0),t([bt()],$t.prototype,"_colorS",void 0),t([bt()],$t.prototype,"_isDragging",void 0),t([bt()],$t.prototype,"_colorPickerKelvin",void 0),t([bt()],$t.prototype,"_showEffects",void 0),t([bt()],$t.prototype,"_selectedEffect",void 0),$t=t([ht("light-panel-card")],$t);let wt=class extends ct{setConfig(t){this.config=t}fireConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}updateTitle(t){const e=t.target,i={...this.config,title:e.value};this.config=i,this.fireConfigChanged(i)}updateTargets(t,e){const i={...this.config,[t]:{...this.config?.[t]||{},targets:e||{}}};this.config=i,this.fireConfigChanged(i)}render(){return this.hass&&this.config?q`
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
    `:q`<div>Loading...</div>`}};wt.styles=n`
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
  `,t([ut({attribute:!1})],wt.prototype,"hass",void 0),t([bt()],wt.prototype,"config",void 0),wt=t([ht("light-panel-card-editor")],wt);let kt=class extends ct{constructor(){super(...arguments),this._dragTilt={},this._dragging={}}setConfig(t){this.config=t}static getConfigElement(){return document.createElement("cover-panel-card-editor")}static getStubConfig(){return{type:"custom:cover-panel-card",title:"Cover Control",blinds:[{targets:{},tilt_down_pct:25,tilt_up_pct:75}]}}getCardSize(){return 5}_toArray(t){return Array.isArray(t)?t:"string"==typeof t?[t]:[]}_resolveEntities(t){if(!this.hass)return[];const e=t.targets||{},i=this._toArray(e.entity_id);if(i.length)return i;if(t.entity)return[t.entity];const s=this._toArray(e.area_id),r=this._toArray(e.label_id),o=new Set;return Object.keys(this.hass.states).forEach(t=>{if(t.startsWith("cover.")){if(s.length>0){const e=this.hass.entities?.[t],i=e?.area_id;if(i&&s.includes(i))return void o.add(t);const r=e?.device_id;if(r&&this.hass.devices?.[r]){const e=this.hass.devices[r].area_id;if(e&&s.includes(e))return void o.add(t)}}if(r.length>0){const e=this.hass.entities?.[t]?.labels||[];Array.isArray(e)&&e.some(t=>r.includes(t))&&o.add(t)}}}),Array.from(o)}_resolveAllBlinds(){if(!this.config?.blinds)return[];const t=[],e=new Set;return this.config.blinds.forEach((i,s)=>{const r=this._resolveEntities(i);r.forEach(s=>{if(e.has(s))return;e.add(s);const r=i.label||this.hass?.states[s]?.attributes?.friendly_name||s.split(".").pop()||s;t.push({entityId:s,label:r,tiltDownPct:i.tilt_down_pct??25,tiltUpPct:i.tilt_up_pct??75})}),0===r.length&&t.push({entityId:`__placeholder_${s}`,label:i.label||`Blind ${s+1}`,tiltDownPct:i.tilt_down_pct??25,tiltUpPct:i.tilt_up_pct??75})}),t}_findRelatedEntity(t,e){if(!this.hass)return null;const i=this.hass.entities?.[t],s=i?.device_id;if(!s)return null;for(const[t,i]of Object.entries(this.hass.entities||{})){if(i.device_id!==s)continue;const r=this.hass.states[t];if(r&&r.attributes?.device_class===e)return t}return null}_getTilt(t){if(this._dragging[t])return this._dragTilt[t]??50;const e=this.hass?.states[t]?.attributes?.current_tilt_position;return void 0!==e?e:this.hass?.states[t]?.attributes?.current_position??50}_setTilt(t,e){this.hass&&this.hass.callService("cover","set_cover_tilt_position",{entity_id:t,tilt_position:Math.round(e)})}_setPreset(t,e,i,s){if(!this.hass)return;const r={closed_down:0,open:50,closed_up:100,angled_down:i,angled_up:s}[e];this.hass.callService("cover","set_cover_tilt_position",{entity_id:t,tilt_position:r})}_onDragPointerDown(t,e,i){i.setPointerCapture(t.pointerId),this._dragging={...this._dragging,[e]:!0},this._dragTilt={...this._dragTilt,[e]:this._getTilt(e)},this._updateDragFromEvent(t,e,i)}_onDragPointerMove(t,e,i){this._dragging[e]&&this._updateDragFromEvent(t,e,i)}_onDragPointerUp(t,e,i){if(!this._dragging[e])return;this._updateDragFromEvent(t,e,i);const s=this._dragTilt[e]??50;this._dragging={...this._dragging,[e]:!1},this._setTilt(e,s)}_updateDragFromEvent(t,e,i){const s=i.getBoundingClientRect(),r=t.clientY-s.top,o=Math.max(0,Math.min(100,r/s.height*100)),n=Math.round(100-o);this._dragTilt={...this._dragTilt,[e]:n},this.requestUpdate()}_renderSlats(t){const e=t/100*160-80,i=Array.from({length:9},(t,i)=>{const s=20*(i+1);return K`
        <rect
          x="${6}"
          y="${s-2}"
          width="88"
          height="${4}"
          rx="2"
          transform="rotate(${e} ${50} ${s})"
          fill="rgba(180,190,210,0.9)"
          stroke="rgba(130,140,160,0.6)"
          stroke-width="0.5"
        />
      `}),s=[10,90].map(t=>K`<line x1="${t}" y1="0" x2="${t}" y2="${200}" stroke="rgba(150,160,180,0.4)" stroke-width="1.5"/>`);return q`
      <svg viewBox="0 0 ${100} ${200}" xmlns="http://www.w3.org/2000/svg" class="slat-svg">
        ${s}
        ${i}
      </svg>
    `}render(){if(!this.hass||!this.config)return q`<div>Loading...</div>`;const t=this.config.title||"Cover Control",e=this._resolveAllBlinds(),i=this.config.illuminance_entity,s=i?this.hass.states[i]:null;return q`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${t}</h2>

          ${s?q`
                <div class="room-sensor-row">
                  <ha-icon icon="mdi:brightness-5" class="sensor-icon"></ha-icon>
                  <span class="sensor-label">${s.attributes?.friendly_name||"Illuminance"}</span>
                  <span class="sensor-value">${s.state} ${s.attributes?.unit_of_measurement||"lx"}</span>
                </div>
              `:V}

          <div class="blinds-row ${1===e.length?"single":""}">
            ${e.map(t=>this._renderBlind(t))}
          </div>
        </div>
      </ha-card>
    `}_renderBlind(t){const e=t.entityId.startsWith("__placeholder_");!e&&this.hass?.states[t.entityId];const i=e?50:this._getTilt(t.entityId),s=this._dragging[t.entityId]??!1,r=e?null:this._findRelatedEntity(t.entityId,"battery"),o=e?null:this._findRelatedEntity(t.entityId,"illuminance"),n=r?this.hass?.states[r]:null,a=o?this.hass?.states[o]:null,l=n?Number(n.state):null;return q`
      <div class="blind-col">

        <!-- Sensor badges -->
        <div class="sensor-badges">
          ${null!==n?q`
                <div class="sensor-badge battery ${null!==l&&l<=20?"low":null!==l&&l<=40?"medium":""}">
                  <ha-icon .icon=${null===l?"mdi:battery-unknown":l>80?"mdi:battery":l>60?"mdi:battery-80":l>40?"mdi:battery-60":l>20?"mdi:battery-40":"mdi:battery-20"}></ha-icon>
                  <span>${l}%</span>
                </div>
              `:V}
          ${null!==a?q`
                <div class="sensor-badge light-lux">
                  <ha-icon icon="mdi:brightness-6"></ha-icon>
                  <span>${a.state} ${a.attributes?.unit_of_measurement||"lx"}</span>
                </div>
              `:V}
        </div>

        <!-- Blind label -->
        <div class="blind-label">${t.label}</div>

        <!-- Slat visualisation + drag track -->
        <div
          class="blind-visual-wrap"
          @pointerdown=${i=>e?null:this._onDragPointerDown(i,t.entityId,i.currentTarget)}
          @pointermove=${i=>e?null:this._onDragPointerMove(i,t.entityId,i.currentTarget)}
          @pointerup=${i=>e?null:this._onDragPointerUp(i,t.entityId,i.currentTarget)}
          style="touch-action: none;"
        >
          ${this._renderSlats(i)}
          <!-- Drag handle overlay -->
          <div class="drag-handle" style="top: ${100-i}%">
            <div class="drag-pill ${s?"dragging":""}"></div>
          </div>
        </div>

        <!-- Tilt readout -->
        <div class="tilt-readout">
          <span class="tilt-pct">${Math.round(i)}%</span>
          <span class="tilt-desc">${this._tiltDescription(i)}</span>
        </div>

        <!-- Preset buttons -->
        <div class="preset-buttons">
          <button class="preset-btn" @click=${()=>e?null:this._setPreset(t.entityId,"closed_down",t.tiltDownPct,t.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal-closed"></ha-icon>
            <span>Closed Down</span>
          </button>
          <button class="preset-btn full-open" @click=${()=>e?null:this._setPreset(t.entityId,"open",t.tiltDownPct,t.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal"></ha-icon>
            <span>Full Open</span>
          </button>
          <button class="preset-btn" @click=${()=>e?null:this._setPreset(t.entityId,"closed_up",t.tiltDownPct,t.tiltUpPct)}>
            <ha-icon icon="mdi:blinds-horizontal-closed"></ha-icon>
            <span>Closed Up</span>
          </button>
        </div>

        <div class="preset-buttons secondary">
          <button class="preset-btn angled" @click=${()=>e?null:this._setPreset(t.entityId,"angled_down",t.tiltDownPct,t.tiltUpPct)}>
            <ha-icon icon="mdi:angle-acute"></ha-icon>
            <span>${t.tiltDownPct}% Down</span>
          </button>
          <button class="preset-btn angled" @click=${()=>e?null:this._setPreset(t.entityId,"angled_up",t.tiltDownPct,t.tiltUpPct)}>
            <ha-icon icon="mdi:angle-obtuse"></ha-icon>
            <span>${t.tiltUpPct}% Up</span>
          </button>
        </div>

      </div>
    `}_tiltDescription(t){return t<=5?"Closed Down":t<=30?"Angled Down":t>=45&&t<=55?"Full Open":t>=70?t>=95?"Closed Up":"Angled Up":t<50?"Slightly Down":"Slightly Up"}};kt.styles=n`
    :host {
      --panel-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --panel-text: var(--primary-text-color, #fff);
      --panel-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
      --blue-dim: rgba(100, 150, 220, 0.15);
      --blue-glow: rgba(100, 150, 220, 0.5);
      --blue-bright: #6496dc;
    }

    ha-card {
      background: var(--panel-bg);
      border-radius: 12px;
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
      font-size: 1.25em;
      font-weight: 600;
      color: var(--panel-text);
    }

    /* ── Room sensor row ───────────────────────── */
    .room-sensor-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--blue-dim);
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 0.88em;
    }

    .sensor-icon {
      --mdc-icon-size: 18px;
      color: var(--blue-bright);
    }

    .sensor-label {
      flex: 1;
      color: var(--panel-text);
    }

    .sensor-value {
      font-weight: 600;
      color: var(--panel-text);
    }

    /* ── Blinds row layout ─────────────────────── */
    .blinds-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .blinds-row.single {
      justify-content: center;
    }

    .blind-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    /* ── Sensor badges ─────────────────────────── */
    .sensor-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .sensor-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 0.75em;
      font-weight: 600;
    }

    .sensor-badge ha-icon {
      --mdc-icon-size: 14px;
    }

    .sensor-badge.battery {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    .sensor-badge.battery.medium {
      background: rgba(255, 152, 0, 0.2);
      color: #ff9800;
    }

    .sensor-badge.battery.low {
      background: rgba(244, 67, 54, 0.2);
      color: #f44336;
    }

    .sensor-badge.light-lux {
      background: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }

    /* ── Blind label ───────────────────────────── */
    .blind-label {
      font-size: 0.85em;
      font-weight: 600;
      color: var(--panel-text);
      text-align: center;
    }

    /* ── Slat visualisation ────────────────────── */
    .blind-visual-wrap {
      position: relative;
      width: 100%;
      max-width: 140px;
      cursor: ns-resize;
      user-select: none;
      -webkit-user-select: none;
      background: rgba(180, 190, 210, 0.06);
      border-radius: 6px;
      border: 1px solid rgba(180, 190, 210, 0.12);
      overflow: hidden;
    }

    .slat-svg {
      display: block;
      width: 100%;
      height: auto;
    }

    .drag-handle {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: top 0.1s ease-out;
    }

    .drag-pill {
      width: 32px;
      height: 6px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 3px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
      transition: background 0.15s;
    }

    .drag-pill.dragging {
      background: var(--blue-bright);
      box-shadow: 0 0 8px var(--blue-glow);
    }

    /* ── Tilt readout ──────────────────────────── */
    .tilt-readout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
    }

    .tilt-pct {
      font-size: 1.1em;
      font-weight: 700;
      color: var(--panel-text);
    }

    .tilt-desc {
      font-size: 0.72em;
      color: var(--panel-secondary);
    }

    /* ── Preset buttons ────────────────────────── */
    .preset-buttons {
      display: flex;
      gap: 4px;
      width: 100%;
      justify-content: center;
    }

    .preset-buttons.secondary {
      gap: 6px;
    }

    .preset-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px 4px;
      border: 1px solid rgba(180, 190, 210, 0.2);
      border-radius: 10px;
      background: rgba(180, 190, 210, 0.08);
      color: var(--panel-text);
      cursor: pointer;
      font-size: 0.68em;
      font-weight: 600;
      text-align: center;
      transition: background 0.15s, transform 0.1s;
      line-height: 1.2;
    }

    .preset-btn ha-icon {
      --mdc-icon-size: 18px;
    }

    .preset-btn:active {
      transform: scale(0.93);
    }

    .preset-btn:hover {
      background: rgba(180, 190, 210, 0.18);
    }

    .preset-btn.full-open {
      background: var(--blue-dim);
      border-color: rgba(100, 150, 220, 0.3);
      color: var(--blue-bright);
    }

    .preset-btn.angled {
      background: rgba(255, 193, 7, 0.1);
      border-color: rgba(255, 193, 7, 0.25);
      color: #ffc107;
    }
  `,t([ut({attribute:!1})],kt.prototype,"hass",void 0),t([bt()],kt.prototype,"config",void 0),t([bt()],kt.prototype,"_dragTilt",void 0),t([bt()],kt.prototype,"_dragging",void 0),kt=t([ht("cover-panel-card")],kt);let At=class extends ct{setConfig(t){this.config=t}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_updateTitle(t){const e=t.target.value,i={...this.config,title:e};this.config=i,this._fire(i)}_updateIlluminance(t){const e=t.detail?.value??"",i={...this.config,illuminance_entity:e};this.config=i,this._fire(i)}_updateBlindTargets(t,e){const i=[...this.config?.blinds||[]];i[t]={...i[t],targets:e||{}};const s={...this.config,blinds:i};this.config=s,this._fire(s)}_updateBlindLabel(t,e){const i=[...this.config?.blinds||[]];i[t]={...i[t],label:e};const s={...this.config,blinds:i};this.config=s,this._fire(s)}_updateBlindPct(t,e,i){const s=[...this.config?.blinds||[]];s[t]={...s[t],[e]:i};const r={...this.config,blinds:s};this.config=r,this._fire(r)}_addBlind(){const t=[...this.config?.blinds||[],{targets:{},tilt_down_pct:25,tilt_up_pct:75}],e={...this.config,blinds:t};this.config=e,this._fire(e)}_removeBlind(t){const e=(this.config?.blinds||[]).filter((e,i)=>i!==t),i={...this.config,blinds:e};this.config=i,this._fire(i)}render(){if(!this.hass||!this.config)return q`<div>Loading...</div>`;const t=this.config.blinds||[];return q`
      <div class="editor">

        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            .value="${this.config.title||"Cover Control"}"
            @change="${this._updateTitle}"
          />
        </div>

        <div class="form-group">
          <label>Room Illuminance Sensor (optional)</label>
          <ha-selector
            .hass="${this.hass}"
            .selector="${{entity:{domain:"sensor",device_class:"illuminance"}}}"
            .value="${this.config.illuminance_entity||""}"
            @value-changed="${this._updateIlluminance}"
          ></ha-selector>
        </div>

        <div class="section-header">
          <span>Blinds</span>
          <button class="add-btn" @click="${this._addBlind}">+ Add Blind</button>
        </div>

        ${t.map((t,e)=>q`
            <div class="blind-card">
              <div class="blind-card-header">
                <span>Blind ${e+1}${t.label?` — ${t.label}`:""}</span>
                <button class="remove-btn" @click="${()=>this._removeBlind(e)}">Remove</button>
              </div>

              <div class="form-group">
                <label>Label (optional)</label>
                <input
                  type="text"
                  .value="${t.label||""}"
                  placeholder="e.g. Left Window"
                  @change="${t=>this._updateBlindLabel(e,t.target.value)}"
                />
              </div>

              <div class="form-group">
                <label>Cover Targets</label>
                <ha-selector
                  .hass="${this.hass}"
                  .selector="${{target:{entity:{domain:"cover"},area:{},label:{}}}}"
                  .value="${t.targets||{}}"
                  @value-changed="${t=>this._updateBlindTargets(e,t.detail?.value||{})}"
                ></ha-selector>
              </div>

              <div class="form-row">
                <div class="form-group half">
                  <label>Angled Down % <span class="hint">(default 25)</span></label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    .value="${String(t.tilt_down_pct??25)}"
                    @change="${t=>this._updateBlindPct(e,"tilt_down_pct",Number(t.target.value))}"
                  />
                </div>
                <div class="form-group half">
                  <label>Angled Up % <span class="hint">(default 75)</span></label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    .value="${String(t.tilt_up_pct??75)}"
                    @change="${t=>this._updateBlindPct(e,"tilt_up_pct",Number(t.target.value))}"
                  />
                </div>
              </div>
            </div>
          `)}

        ${0===t.length?q`<div class="empty-hint">No blinds configured yet — click "Add Blind" above.</div>`:V}
      </div>
    `}};At.styles=n`
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
  `,t([ut({attribute:!1})],At.prototype,"hass",void 0),t([bt()],At.prototype,"config",void 0),At=t([ht("cover-panel-card-editor")],At),console.info("%c🎚️ Lovelace Cards loaded","color: #ff6b6b; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.some(t=>"custom:light-panel-card"===t.type)||window.customCards.push({type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.customCards.some(t=>"light-panel-card"===t.type)||window.customCards.push({type:"light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.dispatchEvent(new CustomEvent("ll-custom-card",{detail:{type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}})),window.customCards.some(t=>"custom:cover-panel-card"===t.type)||window.customCards.push({type:"custom:cover-panel-card",name:"Cover Panel Card",description:"Venetian blind tilt control card"}),window.dispatchEvent(new CustomEvent("ll-custom-card",{detail:{type:"custom:cover-panel-card",name:"Cover Panel Card",description:"Venetian blind tilt control card"}}));
