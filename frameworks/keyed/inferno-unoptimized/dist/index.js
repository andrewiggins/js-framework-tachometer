function e(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function t(e){return Math.round(1e3*Math.random())%e}var n=1,r=["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"],o=["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"],a=["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"];function i(e,i){for(var l=0;l<e;l++)i.push({id:n++,label:r[t(r.length)]+" "+o[t(o.length)]+" "+a[t(a.length)]})}var l=function(){function e(){this.data=[],this.selected=void 0,this.id=1}var t=e.prototype;return t.updateData=function(){for(var e=this.data,t=0;t<e.length;t+=10){var n=e[t];e[t]={id:n.id,label:n.label+" !!!"}}},t.delete=function(e){var t=this.data,n=t.findIndex((function(t){return t.id===e}));t.splice(n,1)},t.run=function(){this.data=[],this.add(),this.selected=void 0},t.add=function(){i(1e3,this.data)},t.update=function(){this.updateData()},t.select=function(e){this.selected=e},t.runLots=function(){var e=[];i(1e4,e),this.data=e,this.selected=void 0},t.clear=function(){this.data=[],this.selected=void 0},t.swapRows=function(){var e=this.data;if(e.length>998){var t=e[1];e[1]=e[998],e[998]=t}},e}(),s=Array.isArray;function u(e){var t=typeof e;return"string"===t||"number"===t}function c(e){return void 0===e||null===e}function f(e){return null===e||!1===e||!0===e||void 0===e}function d(e){return"function"===typeof e}function p(e){return"string"===typeof e}function h(e){return null===e}function v(e,t){var n={};if(e)for(var r in e)n[r]=e[r];if(t)for(var o in t)n[o]=t[o];return n}function m(e,t){if(d(t))return{data:e,event:t};return null}function g(e){return!h(e)&&"object"===typeof e}var b={};function y(e){return e.substr(2).toLowerCase()}function k(e,t){e.appendChild(t)}function $(e,t,n){h(n)?k(e,t):e.insertBefore(t,n)}function w(e,t){e.removeChild(t)}function C(e){for(var t;void 0!==(t=e.shift());)t()}function N(e,t,n){var r=e.children;if(4&n)return r.$LI;if(8192&n)return 2===e.childFlags?r:r[t?0:r.length-1];return r}function S(e,t){for(var n;e;){if(2033&(n=e.flags))return e.dom;e=N(e,t,n)}return null}function P(e,t){do{var n=e.flags;if(2033&n)return void w(t,e.dom);var r=e.children;if(4&n&&(e=r.$LI),8&n&&(e=r),8192&n){if(2!==e.childFlags){for(var o=0,a=r.length;o<a;++o)P(r[o],t);return}e=r}}while(e)}function U(e,t,n){do{var r=e.flags;if(2033&r)return void $(t,e.dom,n);var o=e.children;if(4&r&&(e=o.$LI),8&r&&(e=o),8192&r){if(2!==e.childFlags){for(var a=0,i=o.length;a<i;++a)U(o[a],t,n);return}e=o}}while(e)}function F(e,t,n){if(e.constructor.getDerivedStateFromProps)return v(n,e.constructor.getDerivedStateFromProps(t,n));return n}var x={v:!1},L={componentComparator:null,createVNode:null,renderComplete:null};function V(e,t){e.textContent=t}function I(e,t){return g(e)&&e.event===t.event&&e.data===t.data}function M(e,t){for(var n in t)void 0===e[n]&&(e[n]=t[n]);return e}function B(e,t){return!!d(e)&&(e(t),!0)}function D(e,t,n,r,o,a,i,l){this.childFlags=e,this.children=t,this.className=n,this.dom=null,this.flags=r,this.key=void 0===o?null:o,this.props=void 0===a?null:a,this.ref=void 0===i?null:i,this.type=l}function R(e,t,n,r,o,a,i,l){var c=void 0===o?1:o,d=new D(c,r,n,e,i,a,l,t);return L.createVNode&&L.createVNode(d),0===c&&function(e,t){var n,r=1;if(f(t))n=t;else if(u(t))r=16,n=t;else if(s(t)){for(var o=t.length,a=0;a<o;++a){var i=t[a];if(f(i)||s(i)){n=n||t.slice(0,a),j(t,n,a,"");break}if(u(i))(n=n||t.slice(0,a)).push(W(i,"$"+a));else{var l=i.key,c=(81920&i.flags)>0,d=h(l),v=p(l)&&"$"===l[0];c||d||v?(n=n||t.slice(0,a),(c||v)&&(i=T(i)),(d||v)&&(i.key="$"+a),n.push(i)):n&&n.push(i),i.flags|=65536}}r=0===(n=n||t).length?1:8}else(n=t).flags|=65536,81920&t.flags&&(n=T(t)),r=2;e.children=n,e.childFlags=r}(d,d.children),d}function A(e,t,n,r,o){var a=new D(1,null,null,e=function(e,t){if(12&e)return e;if(t.prototype&&t.prototype.render)return 4;if(t.render)return 32776;return 8}(e,t),r,function(e,t,n){var r=(32768&e?t.render:t).defaultProps;if(c(r))return n;if(c(n))return v(r,null);return M(n,r)}(e,t,n),function(e,t,n){if(4&e)return n;var r=(32768&e?t.render:t).defaultHooks;if(c(r))return n;if(c(n))return r;return M(n,r)}(e,t,o),t);return L.createVNode&&L.createVNode(a),a}function W(e,t){return new D(1,c(e)||!0===e||!1===e?"":e,null,16,t,null,null,null)}function E(e,t,n){var r=R(8192,8192,null,e,t,null,n,null);switch(r.childFlags){case 1:r.children=O(),r.childFlags=2;break;case 16:r.children=[W(e)],r.childFlags=4}return r}function T(e){var t=-16385&e.flags,n=e.props;if(14&t&&!h(n)){var r=n;for(var o in n={},r)n[o]=r[o]}if(0===(8192&t))return new D(e.childFlags,e.children,e.className,t,e.key,n,e.ref,e.type);return function(e){var t,n=e.children,r=e.childFlags;if(2===r)t=T(n);else if(12&r){t=[];for(var o=0,a=n.length;o<a;++o)t.push(T(n[o]))}return E(t,r,e.key)}(e)}function O(){return W("",null)}function j(e,t,n,r){for(var o=e.length;n<o;n++){var a=e[n];if(!f(a)){var i=r+"$"+n;if(s(a))j(a,t,0,i);else{if(u(a))a=W(a,i);else{var l=a.key,c=p(l)&&"$"===l[0];(81920&a.flags||c)&&(a=T(a)),a.flags|=65536,c?l.substring(0,r.length)!==r&&(a.key=r+l):h(l)?a.key=i:a.key=r+l}t.push(a)}}}}function H(e){switch(e){case"svg":return 32;case"input":return 64;case"select":return 256;case"textarea":return 128;case"$F":return 8192;default:return 1}}var _="http://www.w3.org/1999/xlink",Q="http://www.w3.org/XML/1998/namespace",X={"xlink:actuate":_,"xlink:arcrole":_,"xlink:href":_,"xlink:role":_,"xlink:show":_,"xlink:title":_,"xlink:type":_,"xml:base":Q,"xml:lang":Q,"xml:space":Q};function q(e){return{onClick:e,onDblClick:e,onFocusIn:e,onFocusOut:e,onKeyDown:e,onKeyPress:e,onKeyUp:e,onMouseDown:e,onMouseMove:e,onMouseUp:e,onTouchEnd:e,onTouchMove:e,onTouchStart:e}}var z=q(0),G=q(null),K=q(!0);function J(e,t){var n=t.$EV;return n||(n=t.$EV=q(null)),n[e]||1===++z[e]&&(G[e]=function(e){var t="onClick"===e||"onDblClick"===e?function(e){return function(t){if(0!==t.button)return void t.stopPropagation();Z(t,t.target,!0,e,re(t))}}(e):function(e){return function(t){Z(t,t.target,!1,e,re(t))}}(e);return document.addEventListener(y(e),t),t}(e)),n}function Y(e,t){var n=t.$EV;n&&n[e]&&(0===--z[e]&&(document.removeEventListener(y(e),G[e]),G[e]=null),n[e]=null)}function Z(e,t,n,r,o){var a=t;do{if(n&&a.disabled)return;var i=a.$EV;if(i){var l=i[r];if(l&&(o.dom=a,l.event?l.event(l.data,e):l(e),e.cancelBubble))return}a=a.parentNode}while(!h(a))}function ee(){this.cancelBubble=!0,this.immediatePropagationStopped||this.stopImmediatePropagation()}function te(){return this.defaultPrevented}function ne(){return this.cancelBubble}function re(e){var t={dom:document};return e.isDefaultPrevented=te,e.isPropagationStopped=ne,e.stopPropagation=ee,Object.defineProperty(e,"currentTarget",{configurable:!0,get:function(){return t.dom}}),t}function oe(e,t,n){if(e[t]){var r=e[t];r.event?r.event(r.data,n):r(n)}else{var o=t.toLowerCase();e[o]&&e[o](n)}}function ae(e,t){var n=function(n){var r=this.$V;if(!r)return;var o=r.props||b,a=r.dom;if(p(e))oe(o,e,n);else for(var i=0;i<e.length;++i)oe(o,e[i],n);if(d(t)){var l=this.$V,s=l.props||b;t(s,a,!1,l)}};return Object.defineProperty(n,"wrapped",{configurable:!1,enumerable:!1,value:!0,writable:!1}),n}function ie(e,t,n){var r="$"+t,o=e[r];if(o){if(o[1].wrapped)return;e.removeEventListener(o[0],o[1]),e[r]=null}d(n)&&(e.addEventListener(t,n),e[r]=[t,n])}function le(e){return"checkbox"===e||"radio"===e}var se=ae("onInput",fe),ue=ae(["onClick","onChange"],fe);function ce(e){e.stopPropagation()}function fe(e,t){var n=e.type,r=e.value,o=e.checked,a=e.multiple,i=e.defaultValue,l=!c(r);n&&n!==t.type&&t.setAttribute("type",n),c(a)||a===t.multiple||(t.multiple=a),c(i)||l||(t.defaultValue=i+""),le(n)?(l&&(t.value=r),c(o)||(t.checked=o)):l&&t.value!==r?(t.defaultValue=r,t.value=r):c(o)||(t.checked=o)}ce.wrapped=!0;var de=ae("onChange",pe);function pe(e,t,n,r){var o=Boolean(e.multiple);c(e.multiple)||o===t.multiple||(t.multiple=o);var a=e.selectedIndex;if(-1===a&&(t.selectedIndex=-1),1!==r.childFlags){var i=e.value;"number"===typeof a&&a>-1&&t.options[a]&&(i=t.options[a].value),n&&c(i)&&(i=e.defaultValue),function e(t,n){if("option"===t.type)!function(e,t){var n=e.props||b,r=e.dom;r.value=n.value,n.value===t||s(t)&&-1!==t.indexOf(n.value)?r.selected=!0:c(t)&&c(n.selected)||(r.selected=n.selected||!1)}(t,n);else{var r=t.children,o=t.flags;if(4&o)e(r.$LI,n);else if(8&o)e(r,n);else if(2===t.childFlags)e(r,n);else if(12&t.childFlags)for(var a=0,i=r.length;a<i;++a)e(r[a],n)}}(r,i)}}var he,ve,me=ae("onInput",be),ge=ae("onChange");function be(e,t,n){var r=e.value,o=t.value;if(c(r)){if(n){var a=e.defaultValue;c(a)||a===o||(t.defaultValue=a,t.value=a)}}else o!==r&&(t.defaultValue=r,t.value=r)}function ye(e,t,n,r,o,a){64&e?fe(r,n):256&e?pe(r,n,o,t):128&e&&be(r,n,o),a&&(n.$V=t)}function ke(e){return e.type&&le(e.type)?!c(e.checked):!c(e.value)}function $e(e){e&&!B(e,null)&&e.current&&(e.current=null)}function we(e,t,n){e&&(d(e)||void 0!==e.current)&&n.push((function(){B(e,t)||void 0===e.current||(e.current=t)}))}function Ce(e,t){Ne(e),P(e,t)}function Ne(e){var t,n=e.flags,r=e.children;if(481&n){t=e.ref;var o=e.props;$e(t);var a=e.childFlags;if(!h(o))for(var i=Object.keys(o),l=0,s=i.length;l<s;l++){var u=i[l];K[u]&&Y(u,e.dom)}12&a?Se(r):2===a&&Ne(r)}else r&&(4&n?(d(r.componentWillUnmount)&&r.componentWillUnmount(),$e(e.ref),r.$UN=!0,Ne(r.$LI)):8&n?(!c(t=e.ref)&&d(t.onComponentWillUnmount)&&t.onComponentWillUnmount(S(e,!0),e.props||b),Ne(r)):1024&n?Ce(r,e.ref):8192&n&&12&e.childFlags&&Se(r))}function Se(e){for(var t=0,n=e.length;t<n;++t)Ne(e[t])}function Pe(e){e.textContent=""}function Ue(e,t,n){Se(n),8192&t.flags?P(t,e):Pe(e)}function Fe(e,t,n,r,o,a,i){switch(e){case"children":case"childrenType":case"className":case"defaultValue":case"key":case"multiple":case"ref":case"selectedIndex":break;case"autoFocus":r.autofocus=!!n;break;case"allowfullscreen":case"autoplay":case"capture":case"checked":case"controls":case"default":case"disabled":case"hidden":case"indeterminate":case"loop":case"muted":case"novalidate":case"open":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"selected":r[e]=!!n;break;case"defaultChecked":case"value":case"volume":if(a&&"value"===e)break;var l=c(n)?"":n;r[e]!==l&&(r[e]=l);break;case"style":!function(e,t,n){if(c(t))return void n.removeAttribute("style");var r,o,a=n.style;if(p(t))return void(a.cssText=t);if(c(e)||p(e))for(r in t)o=t[r],a.setProperty(r,o);else{for(r in t)(o=t[r])!==e[r]&&a.setProperty(r,o);for(r in e)c(t[r])&&a.removeProperty(r)}}(t,n,r);break;case"dangerouslySetInnerHTML":!function(e,t,n,r){var o=e&&e.__html||"",a=t&&t.__html||"";o!==a&&(c(a)||function(e,t){var n=document.createElement("i");return n.innerHTML=t,n.innerHTML===e.innerHTML}(r,a)||(h(n)||(12&n.childFlags?Se(n.children):2===n.childFlags&&Ne(n.children),n.children=null,n.childFlags=1),r.innerHTML=a))}(t,n,i,r);break;default:K[e]?function(e,t,n,r){if(d(n))J(e,r)[e]=n;else if(g(n)){if(I(t,n))return;J(e,r)[e]=n}else Y(e,r)}(e,t,n,r):111===e.charCodeAt(0)&&110===e.charCodeAt(1)?function(e,t,n,r){if(g(n)){if(I(t,n))return;n=function(e){var t=e.event;return function(n){t(e.data,n)}}(n)}ie(r,y(e),n)}(e,t,n,r):c(n)?r.removeAttribute(e):o&&X[e]?r.setAttributeNS(X[e],e,n):r.setAttribute(e,n)}}function xe(e,t,n){var r=Le(e.render(t,e.state,n)),o=n;return d(e.getChildContext)&&(o=v(n,e.getChildContext())),e.$CX=o,r}function Le(e){if(f(e)||u(e))return W(e,null);if(s(e))return E(e,0,null);return 16384&e.flags?T(e):e}function Ve(e,t,n,r,o,a){var i=e.flags|=16384;481&i?function(e,t,n,r,o,a){var i=e.flags,l=e.props,s=e.className,u=e.children,f=e.childFlags,d=e.dom=function(e,t){if(t)return document.createElementNS("http://www.w3.org/2000/svg",e);return document.createElement(e)}(e.type,r=r||(32&i)>0);if(c(s)||""===s||(r?d.setAttribute("class",s):d.className=s),16===f)V(d,u);else if(1!==f){var p=r&&"foreignObject"!==e.type;2===f?(16384&u.flags&&(e.children=u=T(u)),Ve(u,d,n,p,null,a)):8!==f&&4!==f||Me(u,d,n,p,null,a)}h(t)||$(t,d,o),h(l)||function(e,t,n,r,o){var a=!1,i=(448&t)>0;for(var l in i&&(a=ke(n))&&function(e,t,n){64&e?function(e,t){le(t.type)?(ie(e,"change",ue),ie(e,"click",ce)):ie(e,"input",se)}(t,n):256&e?function(e){ie(e,"change",de)}(t):128&e&&function(e,t){ie(e,"input",me),t.onChange&&ie(e,"change",ge)}(t,n)}(t,r,n),n)Fe(l,null,n[l],r,o,a,null);i&&ye(t,e,r,n,!0,a)}(e,i,l,d,r),we(e.ref,d,a)}(e,t,n,r,o,a):4&i?function(e,t,n,r,o,a){var i=function(e,t,n,r,o,a){var i=new t(n,r),l=i.$N=Boolean(t.getDerivedStateFromProps||i.getSnapshotBeforeUpdate);if(i.$SVG=o,i.$L=a,e.children=i,i.$BS=!1,i.context=r,i.props===b&&(i.props=n),l)i.state=F(i,n,i.state);else if(d(i.componentWillMount)){i.$BR=!0,i.componentWillMount();var s=i.$PS;if(!h(s)){var u=i.state;if(h(u))i.state=s;else for(var c in s)u[c]=s[c];i.$PS=null}i.$BR=!1}return i.$LI=xe(i,n,r),i}(e,e.type,e.props||b,n,r,a);Ve(i.$LI,t,i.$CX,r,o,a),function(e,t,n){we(e,t,n),d(t.componentDidMount)&&n.push(function(e){return function(){e.componentDidMount()}}(t))}(e.ref,i,a)}(e,t,n,r,o,a):8&i?(function(e,t,n,r,o,a){Ve(e.children=Le(function(e,t){return 32768&e.flags?e.type.render(e.props||b,e.ref,t):e.type(e.props||b,t)}(e,n)),t,n,r,o,a)}(e,t,n,r,o,a),function(e,t){var n=e.ref;c(n)||(B(n.onComponentWillMount,e.props||b),d(n.onComponentDidMount)&&t.push(function(e,t){return function(){e.onComponentDidMount(S(t,!0),t.props||b)}}(n,e)))}(e,a)):512&i||16&i?Ie(e,t,o):8192&i?function(e,t,n,r,o,a){var i=e.children,l=e.childFlags;12&l&&0===i.length&&(l=e.childFlags=2,i=e.children=O()),2===l?Ve(i,t,o,r,o,a):Me(i,t,n,r,o,a)}(e,t,n,r,o,a):1024&i&&function(e,t,n,r,o){Ve(e.children,e.ref,t,!1,null,o);var a=O();Ie(a,n,r),e.dom=a.dom}(e,n,t,o,a)}function Ie(e,t,n){var r=e.dom=document.createTextNode(e.children);h(t)||$(t,r,n)}function Me(e,t,n,r,o,a){for(var i=0;i<e.length;++i){var l=e[i];16384&l.flags&&(e[i]=l=T(l)),Ve(l,t,n,r,o,a)}}function Be(e,t,n,r,o,a,i){var l=t.flags|=16384;e.flags!==l||e.type!==t.type||e.key!==t.key||2048&l?16384&e.flags?function(e,t,n,r,o,a){Ne(e),0!==(t.flags&e.flags&2033)?(Ve(t,null,r,o,null,a),function(e,t,n){e.replaceChild(t,n)}(n,t.dom,e.dom)):(Ve(t,n,r,o,S(e,!0),a),P(e,n))}(e,t,n,r,o,i):Ve(t,n,r,o,a,i):481&l?function(e,t,n,r,o,a){var i,l=t.dom=e.dom,s=e.props,u=t.props,f=!1,d=!1;if(r=r||(32&o)>0,s!==u){var p=s||b;if((i=u||b)!==b)for(var h in(f=(448&o)>0)&&(d=ke(i)),i){var v=p[h],m=i[h];v!==m&&Fe(h,v,m,l,r,d,e)}if(p!==b)for(var g in p)c(i[g])&&!c(p[g])&&Fe(g,p[g],null,l,r,d,e)}var y=t.children,k=t.className;e.className!==k&&(c(k)?l.removeAttribute("class"):r?l.setAttribute("class",k):l.className=k),4096&o?function(e,t){e.textContent!==t&&(e.textContent=t)}(l,y):De(e.childFlags,t.childFlags,e.children,y,l,n,r&&"foreignObject"!==t.type,null,e,a),f&&ye(o,t,l,i,!1,d);var $=t.ref,w=e.ref;w!==$&&($e(w),we($,l,a))}(e,t,r,o,l,i):4&l?function(e,t,n,r,o,a,i){var l=t.children=e.children;if(h(l))return;l.$L=i;var s=t.props||b,u=t.ref,c=e.ref,f=l.state;if(!l.$N){if(d(l.componentWillReceiveProps)){if(l.$BR=!0,l.componentWillReceiveProps(s,r),l.$UN)return;l.$BR=!1}h(l.$PS)||(f=v(f,l.$PS),l.$PS=null)}Re(l,f,s,n,r,o,!1,a,i),c!==u&&($e(c),we(u,l,i))}(e,t,n,r,o,a,i):8&l?function(e,t,n,r,o,a,i){var l=!0,s=t.props||b,u=t.ref,f=e.props,p=!c(u),h=e.children;if(p&&d(u.onComponentShouldUpdate)&&(l=u.onComponentShouldUpdate(f,s)),!1!==l){p&&d(u.onComponentWillUpdate)&&u.onComponentWillUpdate(f,s);var v=t.type,m=Le(32768&t.flags?v.render(s,u,r):v(s,r));Be(h,m,n,r,o,a,i),t.children=m,p&&d(u.onComponentDidUpdate)&&u.onComponentDidUpdate(f,s)}else t.children=h}(e,t,n,r,o,a,i):16&l?function(e,t){var n=t.children,r=t.dom=e.dom;n!==e.children&&(r.nodeValue=n)}(e,t):512&l?t.dom=e.dom:8192&l?function(e,t,n,r,o,a){var i=e.children,l=t.children,s=e.childFlags,u=t.childFlags,c=null;12&u&&0===l.length&&(u=t.childFlags=2,l=t.children=O());var f=0!==(2&u);if(12&s){var d=i.length;(8&s&&8&u||f||!f&&l.length>d)&&(c=S(i[d-1],!1).nextSibling)}De(s,u,i,l,n,r,o,c,e,a)}(e,t,n,r,o,i):function(e,t,n,r){var o=e.ref,a=t.ref,i=t.children;if(De(e.childFlags,t.childFlags,e.children,i,o,n,!1,null,e,r),t.dom=e.dom,o!==a&&!f(i)){var l=i.dom;w(o,l),k(a,l)}}(e,t,r,i)}function De(e,t,n,r,o,a,i,l,s,u){switch(e){case 2:switch(t){case 2:Be(n,r,o,a,i,l,u);break;case 1:Ce(n,o);break;case 16:Ne(n),V(o,r);break;default:!function(e,t,n,r,o,a){Ne(e),Me(t,n,r,o,S(e,!0),a),P(e,n)}(n,r,o,a,i,u)}break;case 1:switch(t){case 2:Ve(r,o,a,i,l,u);break;case 1:break;case 16:V(o,r);break;default:Me(r,o,a,i,l,u)}break;case 16:switch(t){case 16:!function(e,t,n){e!==t&&(""!==e?n.firstChild.nodeValue=t:V(n,t))}(n,r,o);break;case 2:Pe(o),Ve(r,o,a,i,l,u);break;case 1:Pe(o);break;default:Pe(o),Me(r,o,a,i,l,u)}break;default:switch(t){case 16:Se(n),V(o,r);break;case 2:Ue(o,s,n),Ve(r,o,a,i,l,u);break;case 1:Ue(o,s,n);break;default:var c=0|n.length,f=0|r.length;0===c?f>0&&Me(r,o,a,i,l,u):0===f?Ue(o,s,n):8===t&&8===e?function(e,t,n,r,o,a,i,l,s,u){var c,f,d=a-1,p=i-1,h=0,v=e[h],m=t[h];e:{for(;v.key===m.key;){if(16384&m.flags&&(t[h]=m=T(m)),Be(v,m,n,r,o,l,u),e[h]=m,++h>d||h>p)break e;v=e[h],m=t[h]}for(v=e[d],m=t[p];v.key===m.key;){if(16384&m.flags&&(t[p]=m=T(m)),Be(v,m,n,r,o,l,u),e[d]=m,p--,h>--d||h>p)break e;v=e[d],m=t[p]}}if(h>d){if(h<=p)for(f=(c=p+1)<i?S(t[c],!0):l;h<=p;)16384&(m=t[h]).flags&&(t[h]=m=T(m)),++h,Ve(m,n,r,o,f,u)}else if(h>p)for(;h<=d;)Ce(e[h++],n);else!function(e,t,n,r,o,a,i,l,s,u,c,f,d){var p,h,v,m=0,g=l,b=l,y=a-l+1,k=i-l+1,$=new Int32Array(k+1),w=y===r,C=!1,N=0,P=0;if(o<4||(y|k)<32)for(m=g;m<=a;++m)if(p=e[m],P<k){for(l=b;l<=i;l++)if(h=t[l],p.key===h.key){if($[l-b]=m+1,w)for(w=!1;g<m;)Ce(e[g++],s);N>l?C=!0:N=l,16384&h.flags&&(t[l]=h=T(h)),Be(p,h,s,n,u,c,d),++P;break}!w&&l>i&&Ce(p,s)}else w||Ce(p,s);else{var F={};for(m=b;m<=i;++m)F[t[m].key]=m;for(m=g;m<=a;++m)if(p=e[m],P<k)if(void 0!==(l=F[p.key])){if(w)for(w=!1;m>g;)Ce(e[g++],s);$[l-b]=m+1,N>l?C=!0:N=l,16384&(h=t[l]).flags&&(t[l]=h=T(h)),Be(p,h,s,n,u,c,d),++P}else w||Ce(p,s);else w||Ce(p,s)}if(w)Ue(s,f,e),Me(t,s,n,u,c,d);else if(C){var x=function(e){var t=0,n=0,r=0,o=0,a=0,i=0,l=0,s=e.length;for(s>Ae&&(Ae=s,he=new Int32Array(s),ve=new Int32Array(s));n<s;++n)if(0!==(t=e[n])){if(e[r=he[o]]<t){ve[n]=r,he[++o]=n;continue}for(a=0,i=o;a<i;)e[he[l=a+i>>1]]<t?a=l+1:i=l;t<e[he[a]]&&(a>0&&(ve[n]=he[a-1]),he[a]=n)}a=o+1;var u=new Int32Array(a);for(i=he[a-1];a-- >0;)u[a]=i,i=ve[i],he[a]=0;return u}($);for(l=x.length-1,m=k-1;m>=0;m--)0===$[m]?(16384&(h=t[N=m+b]).flags&&(t[N]=h=T(h)),Ve(h,s,n,u,(v=N+1)<o?S(t[v],!0):c,d)):l<0||m!==x[l]?U(h=t[N=m+b],s,(v=N+1)<o?S(t[v],!0):c):l--}else if(P!==k)for(m=k-1;m>=0;m--)0===$[m]&&(16384&(h=t[N=m+b]).flags&&(t[N]=h=T(h)),Ve(h,s,n,u,(v=N+1)<o?S(t[v],!0):c,d))}(e,t,r,a,i,d,p,h,n,o,l,s,u)}(n,r,o,a,i,c,f,l,s,u):function(e,t,n,r,o,a,i,l,s){for(var u,c,f=a>i?i:a,d=0;d<f;++d)u=t[d],c=e[d],16384&u.flags&&(u=t[d]=T(u)),Be(c,u,n,r,o,l,s),e[d]=u;if(a<i)for(d=f;d<i;++d)16384&(u=t[d]).flags&&(u=t[d]=T(u)),Ve(u,n,r,o,l,s);else if(a>i)for(d=f;d<a;++d)Ce(e[d],n)}(n,r,o,a,i,c,f,l,u)}}}function Re(e,t,n,r,o,a,i,l,s){var u=e.state,c=e.props,f=Boolean(e.$N),p=d(e.shouldComponentUpdate);if(f&&(t=F(e,n,t!==u?v(u,t):t)),i||!p||p&&e.shouldComponentUpdate(n,t,o)){!f&&d(e.componentWillUpdate)&&e.componentWillUpdate(n,t,o),e.props=n,e.state=t,e.context=o;var h=null,m=xe(e,n,o);f&&d(e.getSnapshotBeforeUpdate)&&(h=e.getSnapshotBeforeUpdate(c,u)),Be(e.$LI,m,r,e.$CX,a,l,s),e.$LI=m,d(e.componentDidUpdate)&&function(e,t,n,r,o){o.push((function(){e.componentDidUpdate(t,n,r)}))}(e,c,u,h,s)}else e.props=n,e.state=t,e.context=o}var Ae=0;"undefined"!==typeof document&&(Node.prototype.$EV=null,Node.prototype.$V=null);var We=[],Ee="undefined"!==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):function(e){window.setTimeout(e,0)},Te=!1;function Oe(e,t,n,r){var o=e.$PS;if(d(t)&&(t=t(o?v(e.state,o):e.state,e.props,e.context)),c(o))e.$PS=t;else for(var a in t)o[a]=t[a];if(e.$BR)d(n)&&e.$L.push(n.bind(e));else{if(!x.v&&0===We.length)return void _e(e,r,n);if(-1===We.indexOf(e)&&We.push(e),Te||(Te=!0,Ee(He)),d(n)){var i=e.$QU;i||(i=e.$QU=[]),i.push(n)}}}function je(e){for(var t=e.$QU,n=0,r=t.length;n<r;++n)t[n].call(e);e.$QU=null}function He(){var e;for(Te=!1;e=We.pop();)_e(e,!1,e.$QU?je.bind(null,e):null)}function _e(e,t,n){if(e.$UN)return;if(t||!e.$BR){var r=e.$PS;e.$PS=null;var o=[];x.v=!0,Re(e,v(e.state,r),e.props,S(e.$LI,!0).parentNode,e.context,e.$SVG,t,null,o),o.length>0&&C(o),x.v=!1}else e.state=e.$PS,e.$PS=null;d(n)&&n.call(e)}var Qe=function(e,t){this.state=null,this.$BR=!1,this.$BS=!0,this.$PS=null,this.$LI=null,this.$UN=!1,this.$CX=null,this.$QU=null,this.$N=!1,this.$L=null,this.$SVG=!1,this.props=e||b,this.context=t||b};function Xe(e){return void 0===e||null===e}function qe(e){return"string"===typeof e}function ze(e){return void 0===e}Qe.prototype.forceUpdate=function(e){if(this.$UN)return;Oe(this,{},e,!0)},Qe.prototype.setState=function(e,t){if(this.$UN)return;this.$BS||Oe(this,e,t,!1)},Qe.prototype.render=function(e,t,n){return null};var Ge={onComponentDidMount:1,onComponentDidUpdate:1,onComponentShouldUpdate:1,onComponentWillMount:1,onComponentWillUnmount:1,onComponentWillUpdate:1};function Ke(e,t,n){var r,o,a=arguments,i=null,l=null,s=null,u=0,c=arguments.length-2;if(1===c)r=n;else if(c>1)for(r=[];c-- >0;)r[c]=a[c+2];if(!qe(e)){if(u=2,ze(r)||(t||(t={}),t.children=r),!Xe(t))for(var f in o={},t)"key"===f?l=t.key:"ref"===f?i=t.ref:1===Ge[f]?(i||(i={}),i[f]=t[f]):o[f]=t[f];return A(u,e,o,l,i)}if(u=H(e),!Xe(t))for(var d in o={},t)"className"===d||"class"===d?s=t[d]:"key"===d?l=t.key:"children"===d&&ze(r)?r=t.children:"ref"===d?i=t.ref:("contenteditable"===d&&(u|=4096),o[d]=t[d]);if(8192&u)return E(1===c?[r]:r,0,l);return R(u,e,s,r,0,o,l,i)}function Je(e){var t=e.label,n=e.id,r=e.selected,o=e.deleteFunc,a=e.selectFunc;return Ke("tr",{className:r?"danger":null},Ke("td",{className:"col-md-1"},n),Ke("td",{className:"col-md-4"},Ke("a",{onClick:m(n,a)},t)),Ke("td",{className:"col-md-1"},Ke("a",{onClick:m(n,o)},Ke("span",{className:"glyphicon glyphicon-remove","aria-hidden":"true"}))),Ke("td",{className:"col-md-6"}))}function Ye(e){var t=e.run,n=e.runLots,r=e.add,o=e.update,a=e.clear,i=e.swapRows;return Ke("div",{className:"jumbotron"},Ke("div",{className:"row"},Ke("div",{className:"col-md-6"},Ke("h1",null,"Inferno")),Ke("div",{className:"col-md-6"},Ke("div",{className:"row"},Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"run",onClick:t},"Create 1,000 rows")),Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"runlots",onClick:n},"Create 10,000 rows")),Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"add",onClick:r},"Append 1,000 rows")),Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"update",onClick:o},"Update every 10th row")),Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"clear",onClick:a},"Clear")),Ke("div",{className:"col-sm-6 smallpad"},Ke("button",{type:"button",className:"btn btn-primary btn-block",id:"swaprows",onClick:i},"Swap Rows"))))))}Je.defaultHooks={onComponentShouldUpdate:function(e,t){return t.label!==e.label||t.selected!==e.selected}},Ye.defaultHooks={onComponentShouldUpdate:function(){return!1}};var Ze,et,tt,nt,rt=function(t){var n,r;function o(n,r){var o;return(o=t.call(this,n,r)||this).state={store:new l},o.select=o.select.bind(e(o)),o.delete=o.delete.bind(e(o)),o.add=o.add.bind(e(o)),o.run=o.run.bind(e(o)),o.update=o.update.bind(e(o)),o.runLots=o.runLots.bind(e(o)),o.clear=o.clear.bind(e(o)),o.swapRows=o.swapRows.bind(e(o)),o.start=0,o}r=t,(n=o).prototype=Object.create(r.prototype),n.prototype.constructor=n,n.__proto__=r;var a=o.prototype;return a.run=function(e){e.stopPropagation(),this.state.store.run(),this.setState({store:this.state.store})},a.add=function(e){e.stopPropagation(),this.state.store.add(),this.setState({store:this.state.store})},a.update=function(e){e.stopPropagation(),this.state.store.update(),this.setState({store:this.state.store})},a.select=function(e,t){t.stopPropagation(),this.state.store.select(e),this.setState({store:this.state.store})},a.delete=function(e,t){t.stopPropagation(),this.state.store.delete(e),this.setState({store:this.state.store})},a.runLots=function(e){e.stopPropagation(),this.state.store.runLots(),this.setState({store:this.state.store})},a.clear=function(e){e.stopPropagation(),this.state.store.clear(),this.setState({store:this.state.store})},a.swapRows=function(e){e.stopPropagation(),this.state.store.swapRows(),this.setState({store:this.state.store})},a.render=function(){return Ke("div",{className:"container"},Ke(Ye,{run:this.run,runLots:this.runLots,add:this.add,update:this.update,clear:this.clear,swapRows:this.swapRows}),Ke("table",{className:"table table-hover table-striped test-data"},Ke("tbody",null,function(e,t,n){for(var r=[],o=e.data,a=e.selected,i=0;i<o.length;i++){var l=o[i],s=l.id;r.push(Ke(Je,{selected:s===a,key:s,label:l.label,id:s,deleteFunc:t,selectFunc:n}))}return r}(this.state.store,this.delete,this.select))),Ke("span",{className:"preloadicon glyphicon glyphicon-remove","aria-hidden":"true"}))},o}(Qe);Ze=Ke(rt,null),et=document.getElementById("main"),void 0===tt&&(tt=null),void 0===nt&&(nt=b),function(e,t,n,r){var o=[],a=t.$V;x.v=!0,c(a)?c(e)||(16384&e.flags&&(e=T(e)),Ve(e,t,r,!1,null,o),t.$V=e,a=e):c(e)?(Ce(a,t),t.$V=null):(16384&e.flags&&(e=T(e)),Be(a,e,t,r,!1,null,o),a=t.$V=e),o.length>0&&C(o),x.v=!1,d(n)&&n(),d(L.renderComplete)&&L.renderComplete(a,t)}(Ze,et,tt,nt);
