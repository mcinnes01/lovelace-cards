function t(t,e,i,r){var s,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,i,n):s(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,b=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??_)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,T=`<${P}>`,M=document,O=()=>M.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,z="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,L=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),G=new WeakMap,V=M.createTreeWalker(M,129);function F(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=B;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===B?"!--"===l[1]?n=U:void 0!==l[1]?n=N:void 0!==l[2]?(j.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=s??B,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?D:W):n===D||n===W?n=L:n===U||n===N?n=B:(n=L,s=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===B?i+T:c>=0?(r.push(a),i.slice(0,c)+C+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[F(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Q{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=Q.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=V.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(j.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],O()),V.nextNode(),a.push({type:2,index:++s});r.append(t[e],O())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,r){if(e===q)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=X(t,s._$AS(t,e.values),s,r)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??M).importNode(e,!0);V.currentNode=r;let s=V.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=V.nextNode(),o++)}return V.currentNode=M,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),H(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Y(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Q(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new Z(this.O(O()),this.O(O()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=X(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=X(this,r[i+n],e,n),a===q&&(a=this._$AH[n]),o||=!H(a)||a!==this._$AH[n],a===K?t=K:t!==K&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends tt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??K)===q)return;const i=this._$AH,r=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=k.litHtmlPolyfillSupport;ot?.(Q,Z),(k.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new Z(e.insertBefore(O(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:_},dt=(t=ht,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return pt({...t,state:!0,attribute:!1})}const ut=[{name:"Cool",kelvin:6500,color:"rgba(135, 206, 250, 0.6)"},{name:"Daylight",kelvin:5e3,color:"rgba(255, 255, 255, 0.8)",text_color:"#000"},{name:"White",kelvin:4e3,color:"rgba(255, 200, 100, 0.5)"},{name:"Warm",kelvin:2700,color:"rgba(255, 152, 0, 0.6)"}],ft=[{name:"Orange",color:[255,160,120],background:"rgba(255, 160, 120, 0.7)"},{name:"Blue",color:[120,180,255],background:"rgba(120, 180, 255, 0.7)"},{name:"Green",color:[150,255,180],background:"rgba(150, 255, 180, 0.7)"},{name:"Pink",color:[255,180,220],background:"rgba(255, 180, 220, 0.7)"},{name:"Purple",color:[200,150,255],background:"rgba(200, 150, 255, 0.7)"}],bt=[{key:"all",label:"All",icon:"mdi:lightbulb-group",entityKey:"lights"},{key:"lights",label:"Light",icon:"mdi:ceiling-light",entityKey:"lights"},{key:"lamps",label:"Lamps",icon:"mdi:lamp",entityKey:"lamps"},{key:"accents",label:"Accent",icon:"mdi:led-strip-variant",entityKey:"accents"}],mt=["rgba(100, 150, 255, 0.35)","rgba(76, 175, 80, 0.35)","rgba(156, 39, 176, 0.35)","rgba(255, 152, 0, 0.35)","rgba(233, 30, 99, 0.35)","rgba(0, 188, 212, 0.35)","rgba(255, 87, 34, 0.35)","rgba(63, 81, 181, 0.35)","rgba(139, 195, 74, 0.35)","rgba(121, 85, 72, 0.35)"],vt=[[255,130,0],[255,185,100],[255,225,180],[255,255,240],[160,180,255],[190,150,255],[255,160,220],[255,100,130]],yt=[[255,0,0],[255,128,0],[255,220,0],[100,220,0],[0,200,80],[0,200,200],[0,100,255],[80,0,255],[200,0,255],[255,0,180],[255,80,80],[200,200,0],[255,150,150],[255,200,130],[255,240,150],[180,255,150],[150,240,255],[150,180,255],[220,150,255],[255,150,220],[200,220,255],[220,255,220],[255,230,200],[200,200,200]];let _t=class extends at{constructor(){super(...arguments),this.activeTab="all",this.selectedEntity=null,this._colorPickerOpen=!1,this._colorPickerHex="#ff8800",this._colorPickerTargets=[],this._colorPickerMode="color",this._colorH=0,this._colorS=1,this._isDragging=!1,this._colorPickerKelvin=4e3,this._showEffects=!1,this._selectedEffect=null}setConfig(t){this.config=t}static getConfigElement(){return document.createElement("light-panel-card-editor")}static getStubConfig(){return{type:"custom:light-panel-card",title:"Light Control Panel",lights:{targets:{}},lamps:{targets:{}},accents:{targets:{}},scenes:{targets:{}}}}getCardSize(){return 6}toArray(t){return Array.isArray(t)?t:"string"==typeof t?[t]:[]}getEntityModes(t){return this.hass?.states[t]?.attributes?.supported_color_modes||[]}entitySupportsBrightness(t){const e=this.getEntityModes(t);return e.length>0&&!e.every(t=>"onoff"===t)}entitySupportsColorTemp(t){return this.getEntityModes(t).includes("color_temp")}entitySupportsColor(t){const e=this.getEntityModes(t);return e.includes("hs")||e.includes("rgb")||e.includes("xy")}filterBrightness(t){return t.filter(t=>this.entitySupportsBrightness(t))}filterColorTemp(t){return t.filter(t=>this.entitySupportsColorTemp(t))}filterColor(t){return t.filter(t=>this.entitySupportsColor(t))}getSectionEntities(t,e){if(!this.hass||!this.config)return[];const i=this.config[t]||{},r=i.targets||{},s=this.toArray(r.entity_id).length?this.toArray(r.entity_id):this.toArray(i.entities),o=this.toArray(r.area_id).length?this.toArray(r.area_id):this.toArray(i.area),n=this.toArray(r.label_id);if(0===s.length&&0===o.length&&0===n.length)return[];const a=new Set(s);if((o.length>0||n.length>0)&&Object.keys(this.hass.states).forEach(t=>{if(t.startsWith(`${e}.`)){if(o.length>0){const e=this.hass.entities?.[t],i=e?.area_id;if(i&&o.includes(i))return void a.add(t);const r=e?.device_id;if(r&&this.hass.devices?.[r]){const e=this.hass.devices[r].area_id;if(e&&o.includes(e))return void a.add(t)}}if(n.length>0){const e=this.hass.entities?.[t],i=e?.labels||[];Array.isArray(i)&&i.some(t=>n.includes(t))&&a.add(t)}}}),(o.length>0||n.length>0)&&"light"===e){const e={lights:/[_](light|lights)$/,lamps:/[_](lamp|lamps)$/,accents:/[_](accent|accents|led|strip|rgb)$/}[t];if(e){const t=new Set(s);a.forEach(i=>{if(t.has(i))return;const r=i.replace(/^light\./,"");e.test(r)||a.delete(i)})}}return Array.from(a)}getAllLightEntities(){const t=this.getSectionEntities("lights","light"),e=this.getSectionEntities("lamps","light"),i=this.getSectionEntities("accents","light"),r=new Set,s=[];return[...t,...e,...i].forEach(t=>{r.has(t)||(r.add(t),s.push(t))}),s}getTabEntities(){switch(this.activeTab){case"lights":return this.getSectionEntities("lights","light");case"lamps":return this.getSectionEntities("lamps","light");case"accents":return this.getSectionEntities("accents","light");default:return this.getAllLightEntities()}}getControlTargets(){const t=this.getTabEntities();return"all"!==this.activeTab&&this.selectedEntity&&t.includes(this.selectedEntity)?[this.selectedEntity]:t}isAnyOn(t){return t.some(t=>"on"===this.hass?.states[t]?.state)}getAverageBrightness(t){const e=this.filterBrightness(t).filter(t=>"on"===this.hass?.states[t]?.state);if(0===e.length)return 0;const i=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.brightness||0),0);return Math.round(i/e.length/255*100)}getEntityBrightness(t){const e=this.hass?.states[t];return e&&"on"===e.state?Math.round((e.attributes?.brightness||0)/255*100):0}toggleEntity(t){if(!this.hass)return;const e=this.hass.states[t];this.hass.callService("light","on"===e?.state?"turn_off":"turn_on",{entity_id:t})}turnOnAll(t){this.hass&&t.forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t})})}turnOffAll(t){this.hass&&t.forEach(t=>{this.hass.callService("light","turn_off",{entity_id:t})})}selectEntity(t){this.selectedEntity=this.selectedEntity===t?null:t}setTab(t){this.activeTab=t,this.selectedEntity=null}setBrightnessAll(t,e){this.hass&&this.filterBrightness(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,brightness:Math.round(e/100*255)})})}setColorTempAll(t,e){this.hass&&this.filterColorTemp(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,color_temp_kelvin:e,brightness_pct:100})})}setRGBAll(t,e){this.hass&&this.filterColor(t).forEach(t=>{this.hass.callService("light","turn_on",{entity_id:t,rgb_color:e,brightness_pct:100})})}activateScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}_hexToRgb(t){return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)]}_rgbToHex(t,e,i){return"#"+[t,e,i].map(t=>t.toString(16).padStart(2,"0")).join("")}_hsvToRgb(t,e,i){t=(t%360+360)%360;const r=Math.floor(t/60),s=t/60-r,o=i*(1-e),n=i*(1-s*e),a=i*(1-(1-s)*e);let l=0,c=0,h=0;switch(r%6){case 0:l=i,c=a,h=o;break;case 1:l=n,c=i,h=o;break;case 2:l=o,c=i,h=a;break;case 3:l=o,c=n,h=i;break;case 4:l=a,c=o,h=i;break;case 5:l=i,c=o,h=n}return[Math.round(255*l),Math.round(255*c),Math.round(255*h)]}_rgbToHsv(t,e,i){t/=255,e/=255,i/=255;const r=Math.max(t,e,i),s=Math.min(t,e,i),o=r-s,n=0===r?0:o/r,a=r;let l=0;if(r!==s)switch(r){case t:l=((e-i)/o+(e<i?6:0))/6;break;case e:l=((i-t)/o+2)/6;break;case i:l=((t-e)/o+4)/6}return[360*l,n,a]}_getCurrentEntityColor(){const t=this._colorPickerTargets[0];if(!t)return"#ff8800";const e=this.hass?.states[t];if(!e||"on"!==e.state)return"#ff8800";const i=e.attributes?.rgb_color;return i?this._rgbToHex(i[0],i[1],i[2]):"#ff8800"}_getEffects(){const t=new Set;for(const e of this._colorPickerTargets){const i=this.hass?.states[e]?.attributes?.effect_list;Array.isArray(i)&&i.forEach(e=>t.add(e))}return Array.from(t)}_setEffect(t){this.hass&&(this._colorPickerTargets.forEach(e=>{this.hass.callService("light","turn_on",{entity_id:e,effect:t})}),this._selectedEffect=t)}_pickSwatchColor(t){const[e,i]=this._rgbToHsv(t[0],t[1],t[2]);this._colorH=e,this._colorS=i,this._colorPickerHex=this._rgbToHex(t[0],t[1],t[2]),"grid"===this._colorPickerMode&&(this._colorPickerMode="color"),requestAnimationFrame(()=>this._drawWheelWithSelector())}_onHexInput(t){if(/^#[0-9a-fA-F]{6}$/.test(t)){const[e,i,r]=this._hexToRgb(t),[s,o]=this._rgbToHsv(e,i,r);this._colorH=s,this._colorS=o,this._colorPickerHex=t.toLowerCase(),requestAnimationFrame(()=>this._drawWheelWithSelector())}}async _tryEyeDropper(){try{const t=new window.EyeDropper,e=await t.open(),[i,r,s]=this._hexToRgb(e.sRGBHex),[o,n]=this._rgbToHsv(i,r,s);this._colorH=o,this._colorS=n,this._colorPickerHex=e.sRGBHex,requestAnimationFrame(()=>this._drawWheelWithSelector())}catch{}}_drawColorWheel(t){const e=t.width,i=e/2,r=e/2,s=e/2,o=t.getContext("2d");if(!o)return;const n=o.createImageData(e,e),a=n.data;for(let t=0;t<e;t++)for(let o=0;o<e;o++){const n=o-i,l=t-r,c=Math.sqrt(n*n+l*l);if(c<=s){const i=(180*Math.atan2(l,n)/Math.PI+360)%360,r=c/s,[h,d,p]=this._hsvToRgb(i,r,1),g=4*(t*e+o);a[g]=h,a[g+1]=d,a[g+2]=p,a[g+3]=255}}o.putImageData(n,0,0)}_drawWheelWithSelector(){const t=this.shadowRoot?.querySelector("#color-wheel");if(!t)return;this._drawColorWheel(t);const e=t.getContext("2d");if(!e)return;const i=t.width/2,r=t.height/2,s=i-4,o=this._colorH*Math.PI/180,n=this._colorS*s,a=i+n*Math.cos(o),l=r+n*Math.sin(o);e.beginPath(),e.arc(a,l,10,0,2*Math.PI),e.strokeStyle="white",e.lineWidth=3,e.stroke(),e.beginPath(),e.arc(a,l,10,0,2*Math.PI),e.strokeStyle="rgba(0, 0, 0, 0.35)",e.lineWidth=1,e.stroke()}_applyWheelCoords(t,e,i){const r=t.getBoundingClientRect(),s=t.width/2,o=t.height/2,n=(e-r.left)*(t.width/r.width)-s,a=(i-r.top)*(t.height/r.height)-o,l=(180*Math.atan2(a,n)/Math.PI+360)%360,c=Math.min(Math.sqrt(n*n+a*a)/s,1),[h,d,p]=this._hsvToRgb(l,c,1);this._colorH=l,this._colorS=c,this._colorPickerHex=this._rgbToHex(h,d,p),this._drawWheelWithSelector()}_onWheelPointerDown(t){this._isDragging=!0;const e=t.currentTarget;e.setPointerCapture(t.pointerId),this._applyWheelCoords(e,t.clientX,t.clientY)}_onWheelPointerMove(t){this._isDragging&&this._applyWheelCoords(t.currentTarget,t.clientX,t.clientY)}_onWheelPointerUp(t){this._isDragging=!1}_openColorPicker(t){this._colorPickerTargets=t,this._colorPickerMode="color",this._showEffects=!1,this._selectedEffect=null;const e=this._getCurrentEntityColor(),[i,r,s]=this._hexToRgb(e),[o,n]=this._rgbToHsv(i,r,s);this._colorH=o,this._colorS=n,this._colorPickerHex=e;const a=t[0];this._colorPickerKelvin=a?this.hass?.states[a]?.attributes?.color_temp_kelvin??4e3:4e3,this._colorPickerOpen=!0}_closeColorPicker(){this._colorPickerOpen=!1}_applyCustomColor(){if("temp"===this._colorPickerMode)this.setColorTempAll(this._colorPickerTargets,this._colorPickerKelvin);else{const[t,e,i]=this._hsvToRgb(this._colorH,this._colorS,1);this.setRGBAll(this._colorPickerTargets,[t,e,i])}this._colorPickerOpen=!1}updated(t){super.updated(t),(t.has("_colorPickerOpen")&&this._colorPickerOpen&&"color"===this._colorPickerMode||t.has("_colorPickerMode")&&"color"===this._colorPickerMode&&this._colorPickerOpen)&&requestAnimationFrame(()=>this._drawWheelWithSelector())}render(){if(!this.hass||!this.config)return I`<div>Loading...</div>`;const t=this.config.title||"Light Control Panel",e=this.getSectionEntities("scenes","scene"),i=!1!==this.config.show_section_tabs;return I`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${t}</h2>
          ${i?this.renderTabs():K}
          ${"all"===this.activeTab?this.renderAllTab():this.renderTypeTab()}
          ${e.length>0?this.renderSceneButtons(e):K}
        </div>
      </ha-card>
      ${this._colorPickerOpen?this.renderColorPickerModal():K}
    `}renderColorPickerModal(){const[t,e,i]=this._hsvToRgb(this._colorH,this._colorS,1),r=this._rgbToHex(t,e,i),s=this._getCurrentEntityColor(),o=this._getEffects(),n=this._colorPickerTargets.some(t=>this.entitySupportsColorTemp(t)),a=this.config?.color_temp_presets||ut,l="EyeDropper"in window;return I`
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
            ${n?I`
              <button
                class="picker-mode-tab ${"temp"===this._colorPickerMode?"active":""}"
                @click=${()=>{this._colorPickerMode="temp"}}
                title="Colour temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
              </button>
            `:K}
          </div>

          <!-- Colour wheel (fine picker) -->
          ${"color"===this._colorPickerMode?I`
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
              ${l?I`
                <button class="eyedropper-btn" @click=${this._tryEyeDropper} title="Pick colour from screen">
                  <ha-icon icon="mdi:eyedropper-variant"></ha-icon>
                </button>
              `:K}
            </div>

          <!-- Hex grid (coarse picker) -->
          `:"grid"===this._colorPickerMode?I`
            <div class="hex-grid">
              ${yt.map(t=>I`
                <button
                  class="hex-cell"
                  style="background: rgb(${t[0]}, ${t[1]}, ${t[2]})"
                  @click=${()=>this._pickSwatchColor(t)}
                ></button>
              `)}
            </div>

          <!-- Colour temperature mode -->
          `:I`
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
                ${a.map(t=>I`
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
          ${"temp"!==this._colorPickerMode?I`
            <div class="color-info-row">
              <div class="color-preview-pair">
                <div class="preview-box" style="background: ${s}" title="Current colour"></div>
                <div class="preview-box selected-preview" style="background: ${r}" title="Selected colour"></div>
              </div>
              <div class="color-values-col">
                <input
                  class="hex-input"
                  type="text"
                  .value=${r}
                  maxlength="7"
                  @change=${t=>this._onHexInput(t.target.value)}
                />
                <span class="rgb-value">rgb(${t}, ${e}, ${i})</span>
              </div>
            </div>

            <!-- Quick swatches -->
            <div class="quick-swatches">
              ${vt.map(t=>I`
                <button
                  class="quick-swatch"
                  style="background: rgb(${t[0]}, ${t[1]}, ${t[2]})"
                  @click=${()=>this._pickSwatchColor(t)}
                ></button>
              `)}
            </div>
          `:K}

          <!-- Effects -->
          ${o.length>0?I`
            <button class="effects-toggle-btn" @click=${()=>{this._showEffects=!this._showEffects}}>
              <ha-icon icon="mdi:auto-fix"></ha-icon>
              <span>Effect</span>
              <ha-icon icon=${this._showEffects?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            ${this._showEffects?I`
              <div class="effects-list">
                ${o.map(t=>I`
                  <button
                    class="effect-btn ${this._selectedEffect===t?"active":""}"
                    @click=${()=>this._setEffect(t)}
                  >${t}</button>
                `)}
              </div>
            `:K}
          `:K}

          <!-- Actions -->
          <div class="color-modal-actions">
            <button class="color-modal-cancel" @click=${this._closeColorPicker}>Cancel</button>
            <button class="color-modal-apply" @click=${this._applyCustomColor}>Apply</button>
          </div>

        </div>
      </div>
    `}renderAllTab(){const t=this.getAllLightEntities();if(0===t.length)return I`<div class="empty-state">No lights configured</div>`;const e=t,i=this.filterBrightness(e),r=this.filterColorTemp(e),s=this.filterColor(e),o=!1!==this.config.show_brightness&&i.length>0,n=!1!==this.config.show_color_temp&&r.length>0,a=!1!==this.config.show_temp_presets&&r.length>0,l=!1!==this.config.show_color_presets&&s.length>0;return I`
      ${this.renderOnOffButtons(e)}
      ${o?this.renderBrightnessSlider(e):K}
      ${n?this.renderColorTempSlider(e):K}
      ${a?this.renderTempPresets(e):K}
      ${l?this.renderColorPresets(e):K}
    `}renderTypeTab(){const t=this.getTabEntities();if(0===t.length)return I`<div class="empty-state">No lights configured for this section</div>`;const e=this.getControlTargets(),i=this.filterBrightness(e),r=this.filterColorTemp(e),s=this.filterColor(e),o=!1!==this.config.show_brightness&&i.length>0,n=!1!==this.config.show_color_temp&&r.length>0,a=!1!==this.config.show_temp_presets&&r.length>0,l=!1!==this.config.show_color_presets&&s.length>0;return I`
      ${this.renderEntityCards(t)}
      ${this.renderOnOffButtons(e)}
      ${o?this.renderBrightnessSlider(e):K}
      ${n?this.renderColorTempSlider(e):K}
      ${a?this.renderTempPresets(e):K}
      ${l?this.renderColorPresets(e):K}
    `}renderTabs(){return I`
      <div class="tab-bar">
        ${bt.map(t=>{const e="all"===t.key?this.getAllLightEntities():this.getSectionEntities(t.entityKey,"light"),i=this.activeTab===t.key,r=this.isAnyOn(e);return I`
            <button
              class="tab-btn ${i?"active":""} ${r?"on":"off"}"
              @click=${()=>this.setTab(t.key)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `})}
      </div>
    `}renderEntityCards(t){const e=t.length>1;return I`
      <div class="entity-grid">
        ${e?I`
              <div
                class="entity-card all-card ${null===this.selectedEntity?"selected":""}"
                @click=${()=>this.selectEntity(null)}
              >
                <ha-icon icon="mdi:lightbulb-group" class="entity-icon ${this.isAnyOn(t)?"on":""}"></ha-icon>
                <span class="entity-name">All</span>
              </div>
            `:K}
        ${t.map(e=>{const i=this.hass.states[e];if(!i)return K;const r="on"===i.state,s=this.selectedEntity===e,o=i.attributes?.friendly_name||e.split(".").pop()||e,n=this.entitySupportsBrightness(e),a=n?this.getEntityBrightness(e):0,l=i.attributes?.icon||(n?"mdi:lamp":"mdi:lightbulb"),c=1===t.length;return I`
            <div
              class="entity-card ${r?"on":"off"} ${c||s?"selected":""}"
              @click=${()=>{c||this.selectEntity(e)}}
            >
              <button
                class="entity-power ${r?"on":"off"}"
                @click=${t=>{t.stopPropagation(),this.toggleEntity(e)}}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <ha-icon .icon=${l} class="entity-icon ${r?"on":""}"></ha-icon>
              <span class="entity-name">${o}</span>
              ${n&&r?I`<span class="entity-brightness">${a}%</span>`:K}
            </div>
          `})}
      </div>
    `}renderOnOffButtons(t){this.isAnyOn(t);const e=t.length>0&&t.every(t=>"on"===this.hass?.states[t]?.state),i=t.length>0&&t.every(t=>"on"!==this.hass?.states[t]?.state);return I`
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
    `}renderBrightnessSlider(t){const e=this.getAverageBrightness(t),i=this.filterBrightness(t),r=this.isAnyOn(i);return I`
      <div class="slider-card">
        <div class="slider-header">
          <ha-icon icon="mdi:brightness-6" class="slider-icon ${r?"on":""}"></ha-icon>
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
    `}renderColorTempSlider(t){const e=this.filterColorTemp(t).filter(t=>"on"===this.hass?.states[t]?.state);let i=50;if(e.length>0){const t=e.reduce((t,e)=>t+(this.hass?.states[e]?.attributes?.color_temp_kelvin||4e3),0),r=t/e.length;i=Math.round((r-2700)/3800*100)}return I`
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
            @input=${e=>{const i=Number(e.target.value),r=Math.round(2700+i/100*3800);this.setColorTempAll(t,r)}}
          />
          <div class="slider-fill temp-fill" style="width: ${i}%"></div>
        </div>
      </div>
    `}renderTempPresets(t){const e=this.config?.color_temp_presets||ut,i=this.filterColor(t);return I`
      <div class="preset-row">
        ${e.map(e=>I`
            <button
              class="preset-btn temp-preset"
              style="background: ${e.color}; color: ${e.text_color||"#fff"}"
              @click=${()=>this.setColorTempAll(t,e.kelvin)}
            >
              <ha-icon icon="mdi:lamp" class="preset-icon"></ha-icon>
              <span>${e.name}</span>
            </button>
          `)}
        ${i.length>0?I`
              <button
                class="preset-btn temp-preset color-picker-btn"
                @click=${()=>this._openColorPicker(i)}
              >
                <ha-icon icon="mdi:palette" class="preset-icon"></ha-icon>
                <span>Custom</span>
              </button>
            `:K}
      </div>
    `}renderColorPresets(t){const e=this.config?.color_presets||ft;return I`
      <div class="preset-row">
        ${e.map(e=>I`
            <button
              class="preset-btn color-preset"
              style="background: ${e.background}; color: #fff"
              @click=${()=>this.setRGBAll(t,e.color)}
            >
              ${e.name}
            </button>
          `)}
      </div>
    `}renderSceneButtons(t){let e=0;return I`
      <div class="scene-section">
        <div class="scene-row">
          ${t.map(t=>{const i=this.hass.states[t];if(!i||"unavailable"===i.state||"unknown"===i.state)return K;const r=i.attributes?.friendly_name||t.split(".").pop()||t,s=i.attributes?.icon||"mdi:palette",o=mt[e%mt.length];return e++,I`
              <button
                class="scene-btn"
                style="background: ${o}"
                @click=${()=>this.activateScene(t)}
              >
                <ha-icon .icon=${s}></ha-icon>
                <span>${r}</span>
              </button>
            `})}
        </div>
      </div>
    `}};_t.styles=n`
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
  `,t([pt({attribute:!1})],_t.prototype,"hass",void 0),t([gt()],_t.prototype,"config",void 0),t([gt()],_t.prototype,"activeTab",void 0),t([gt()],_t.prototype,"selectedEntity",void 0),t([gt()],_t.prototype,"_colorPickerOpen",void 0),t([gt()],_t.prototype,"_colorPickerHex",void 0),t([gt()],_t.prototype,"_colorPickerTargets",void 0),t([gt()],_t.prototype,"_colorPickerMode",void 0),t([gt()],_t.prototype,"_colorH",void 0),t([gt()],_t.prototype,"_colorS",void 0),t([gt()],_t.prototype,"_isDragging",void 0),t([gt()],_t.prototype,"_colorPickerKelvin",void 0),t([gt()],_t.prototype,"_showEffects",void 0),t([gt()],_t.prototype,"_selectedEffect",void 0),_t=t([ct("light-panel-card")],_t);let $t=class extends at{setConfig(t){this.config=t}fireConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}updateTitle(t){const e=t.target,i={...this.config,title:e.value};this.config=i,this.fireConfigChanged(i)}updateTargets(t,e){const i={...this.config,[t]:{...this.config?.[t]||{},targets:e||{}}};this.config=i,this.fireConfigChanged(i)}render(){return this.hass&&this.config?I`
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
    `:I`<div>Loading...</div>`}};$t.styles=n`
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
  `,t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([gt()],$t.prototype,"config",void 0),$t=t([ct("light-panel-card-editor")],$t),console.info("%c🎚️ Lovelace Cards loaded","color: #ff6b6b; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.some(t=>"custom:light-panel-card"===t.type)||window.customCards.push({type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.customCards.some(t=>"light-panel-card"===t.type)||window.customCards.push({type:"light-panel-card",name:"Light Panel Card",description:"Light control panel card"}),window.dispatchEvent(new CustomEvent("ll-custom-card",{detail:{type:"custom:light-panel-card",name:"Light Panel Card",description:"Light control panel card"}}));
