function t(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,e(t,n)}function e(t,n){return(e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,n)}function n(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var o=function(){},r={},a=[],s=[];function i(t,e){var n,i,l,c,d=s;for(c=arguments.length;c-- >2;)a.push(arguments[c]);for(e&&null!=e.children&&(a.length||a.push(e.children),delete e.children);a.length;)if((i=a.pop())&&void 0!==i.pop)for(c=i.length;c--;)a.push(i[c]);else"boolean"==typeof i&&(i=null),(l="function"!=typeof t)&&(null==i?i="":"number"==typeof i?i=String(i):"string"!=typeof i&&(l=!1)),l&&n?d[d.length-1]+=i:d===s?d=[i]:d.push(i),n=l;var p=new o;return p.nodeName=t,p.children=d,p.attributes=null==e?void 0:e,p.key=null==e?void 0:e.key,void 0!==r.vnode&&r.vnode(p),p}function l(t,e){for(var n in e)t[n]=e[n];return t}function c(t,e){t&&("function"==typeof t?t(e):t.current=e)}var d="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,u=[];function h(t){!t._dirty&&(t._dirty=!0)&&1==u.push(t)&&(r.debounceRendering||d)(f)}function f(){for(var t;t=u.pop();)t._dirty&&T(t)}function m(t,e,n){return"string"==typeof e||"number"==typeof e?void 0!==t.splitText:"string"==typeof e.nodeName?!t._componentConstructor&&v(t,e.nodeName):n||t._componentConstructor===e.nodeName}function v(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function b(t){var e=l({},t.attributes);e.children=t.children;var n=t.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===e[o]&&(e[o]=n[o]);return e}function y(t){var e=t.parentNode;e&&e.removeChild(t)}function _(t,e,n,o,r){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)c(n,null),c(o,t);else if("class"!==e||r)if("style"===e){if(o&&"string"!=typeof o&&"string"!=typeof n||(t.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var a in n)a in o||(t.style[a]="");for(var a in o)t.style[a]="number"==typeof o[a]&&!1===p.test(a)?o[a]+"px":o[a]}}else if("dangerouslySetInnerHTML"===e)o&&(t.innerHTML=o.__html||"");else if("o"==e[0]&&"n"==e[1]){var s=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),o?n||t.addEventListener(e,g,s):t.removeEventListener(e,g,s),(t._listeners||(t._listeners={}))[e]=o}else if("list"!==e&&"type"!==e&&!r&&e in t){try{t[e]=null==o?"":o}catch(t){}null!=o&&!1!==o||"spellcheck"==e||t.removeAttribute(e)}else{var i=r&&e!==(e=e.replace(/^xlink:?/,""));null==o||!1===o?i?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof o&&(i?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),o):t.setAttribute(e,o))}else t.className=o||""}function g(t){return this._listeners[t.type](r.event&&r.event(t)||t)}var C=[],N=0,w=!1,k=!1;function x(){for(var t;t=C.shift();)r.afterMount&&r.afterMount(t),t.componentDidMount&&t.componentDidMount()}function S(t,e,n,o,r,a){N++||(w=null!=r&&void 0!==r.ownerSVGElement,k=null!=t&&!("__preactattr_"in t));var s=D(t,e,n,o,a);return r&&s.parentNode!==r&&r.appendChild(s),--N||(k=!1,a||x()),s}function D(t,e,n,o,r){var a=t,s=w;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||r)?t.nodeValue!=e&&(t.nodeValue=e):(a=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(a,t),U(t,!0))),a.__preactattr_=!0,a;var i,l,c=e.nodeName;if("function"==typeof c)return function(t,e,n,o){var r=t&&t._component,a=r,s=t,i=r&&t._componentConstructor===e.nodeName,l=i,c=b(e);for(;r&&!l&&(r=r._parentComponent);)l=r.constructor===e.nodeName;r&&l&&(!o||r._component)?(R(r,c,3,n,o),t=r.base):(a&&!i&&(W(a),t=s=null),r=B(e.nodeName,c,n),t&&!r.nextBase&&(r.nextBase=t,s=null),R(r,c,1,n,o),t=r.base,s&&t!==s&&(s._component=null,U(s,!1)));return t}(t,e,n,o);if(w="svg"===c||"foreignObject"!==c&&w,c=String(c),(!t||!v(t,c))&&(i=c,(l=w?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i)).normalizedNodeName=i,a=l,t)){for(;t.firstChild;)a.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(a,t),U(t,!0)}var d=a.firstChild,p=a.__preactattr_,u=e.children;if(null==p){p=a.__preactattr_={};for(var h=a.attributes,f=h.length;f--;)p[h[f].name]=h[f].value}return!k&&u&&1===u.length&&"string"==typeof u[0]&&null!=d&&void 0!==d.splitText&&null==d.nextSibling?d.nodeValue!=u[0]&&(d.nodeValue=u[0]):(u&&u.length||null!=d)&&function(t,e,n,o,r){var a,s,i,l,c,d=t.childNodes,p=[],u={},h=0,f=0,v=d.length,b=0,_=e?e.length:0;if(0!==v)for(var g=0;g<v;g++){var C=d[g],N=C.__preactattr_;null!=(w=_&&N?C._component?C._component.__key:N.key:null)?(h++,u[w]=C):(N||(void 0!==C.splitText?!r||C.nodeValue.trim():r))&&(p[b++]=C)}if(0!==_)for(g=0;g<_;g++){var w;if(c=null,null!=(w=(l=e[g]).key))h&&void 0!==u[w]&&(c=u[w],u[w]=void 0,h--);else if(f<b)for(a=f;a<b;a++)if(void 0!==p[a]&&m(s=p[a],l,r)){c=s,p[a]=void 0,a===b-1&&b--,a===f&&f++;break}c=D(c,l,n,o),i=d[g],c&&c!==t&&c!==i&&(null==i?t.appendChild(c):c===i.nextSibling?y(i):t.insertBefore(c,i))}if(h)for(var g in u)void 0!==u[g]&&U(u[g],!1);for(;f<=b;)void 0!==(c=p[b--])&&U(c,!1)}(a,u,n,o,k||null!=p.dangerouslySetInnerHTML),function(t,e,n){var o;for(o in n)e&&null!=e[o]||null==n[o]||_(t,o,n[o],n[o]=void 0,w);for(o in e)"children"===o||"innerHTML"===o||o in n&&e[o]===("value"===o||"checked"===o?t[o]:n[o])||_(t,o,n[o],n[o]=e[o],w)}(a,e.attributes,p),w=s,a}function U(t,e){var n=t._component;n?W(n):(null!=t.__preactattr_&&c(t.__preactattr_.ref,null),!1!==e&&null!=t.__preactattr_||y(t),L(t))}function L(t){for(t=t.lastChild;t;){var e=t.previousSibling;U(t,!0),t=e}}var P=[];function B(t,e,n){var o,r=P.length;for(t.prototype&&t.prototype.render?(o=new t(e,n),E.call(o,e,n)):((o=new E(e,n)).constructor=t,o.render=M);r--;)if(P[r].constructor===t)return o.nextBase=P[r].nextBase,P.splice(r,1),o;return o}function M(t,e,n){return this.constructor(t,n)}function R(t,e,n,o,a){t._disable||(t._disable=!0,t.__ref=e.ref,t.__key=e.key,delete e.ref,delete e.key,void 0===t.constructor.getDerivedStateFromProps&&(!t.base||a?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,o)),o&&o!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=o),t.prevProps||(t.prevProps=t.props),t.props=e,t._disable=!1,0!==n&&(1!==n&&!1===r.syncComponentUpdates&&t.base?h(t):T(t,1,a)),c(t.__ref,t))}function T(t,e,n,o){if(!t._disable){var a,s,i,c=t.props,d=t.state,p=t.context,u=t.prevProps||c,h=t.prevState||d,f=t.prevContext||p,m=t.base,v=t.nextBase,y=m||v,_=t._component,g=!1,w=f;if(t.constructor.getDerivedStateFromProps&&(d=l(l({},d),t.constructor.getDerivedStateFromProps(c,d)),t.state=d),m&&(t.props=u,t.state=h,t.context=f,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(c,d,p)?g=!0:t.componentWillUpdate&&t.componentWillUpdate(c,d,p),t.props=c,t.state=d,t.context=p),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!g){a=t.render(c,d,p),t.getChildContext&&(p=l(l({},p),t.getChildContext())),m&&t.getSnapshotBeforeUpdate&&(w=t.getSnapshotBeforeUpdate(u,h));var k,D,L=a&&a.nodeName;if("function"==typeof L){var P=b(a);(s=_)&&s.constructor===L&&P.key==s.__key?R(s,P,1,p,!1):(k=s,t._component=s=B(L,P,p),s.nextBase=s.nextBase||v,s._parentComponent=t,R(s,P,0,p,!1),T(s,1,n,!0)),D=s.base}else i=y,(k=_)&&(i=t._component=null),(y||1===e)&&(i&&(i._component=null),D=S(i,a,p,n||!m,y&&y.parentNode,!0));if(y&&D!==y&&s!==_){var M=y.parentNode;M&&D!==M&&(M.replaceChild(D,y),k||(y._component=null,U(y,!1)))}if(k&&W(k),t.base=D,D&&!o){for(var E=t,j=t;j=j._parentComponent;)(E=j).base=D;D._component=E,D._componentConstructor=E.constructor}}for(!m||n?C.push(t):g||(t.componentDidUpdate&&t.componentDidUpdate(u,h,w),r.afterUpdate&&r.afterUpdate(t));t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);N||o||x()}}function W(t){r.beforeUnmount&&r.beforeUnmount(t);var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var n=t._component;n?W(n):e&&(null!=e.__preactattr_&&c(e.__preactattr_.ref,null),t.nextBase=e,y(e),P.push(t),L(e)),c(t.__ref,null)}function E(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{},this._renderCallbacks=[]}l(E.prototype,{setState:function(t,e){this.prevState||(this.prevState=this.state),this.state=l(l({},this.state),"function"==typeof t?t(this.state,this.props):t),e&&this._renderCallbacks.push(e),h(this)},forceUpdate:function(t){t&&this._renderCallbacks.push(t),T(this,2)},render:function(){}});var j=function(e){function o(t){var o;return(o=e.call(this,t)||this).onDelete=o.onDelete.bind(n(o)),o.onClick=o.onClick.bind(n(o)),o}t(o,e);var r=o.prototype;return r.shouldComponentUpdate=function(t,e){return t.data!==this.props.data||t.styleClass!==this.props.styleClass},r.onDelete=function(){this.props.onDelete(this.props.data.id)},r.onClick=function(){this.props.onClick(this.props.data.id)},r.render=function(){var t=this.props,e=t.styleClass;t.onClick,t.onDelete;var n=t.data;return i("tr",{className:e},i("td",{className:"col-md-1"},n.id),i("td",{className:"col-md-4"},i("a",{onClick:this.onClick},n.label)),i("td",{className:"col-md-1"},i("a",{onClick:this.onDelete},i("span",{className:"glyphicon glyphicon-remove","aria-hidden":"true"}))),i("td",{className:"col-md-6"}))},o}(E);function z(t){return Math.round(1e3*Math.random())%t}var A,V,O,H=function(){function t(){this.data=[],this.selected=void 0,this.id=1}var e=t.prototype;return e.buildData=function(t){void 0===t&&(t=1e3);for(var e=["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"],n=["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"],o=["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"],r=[],a=0;a<t;a++)r.push({id:this.id++,label:e[z(e.length)]+" "+n[z(n.length)]+" "+o[z(o.length)]});return r},e.updateData=function(t){for(var e=0;e<this.data.length;e+=10)this.data[e]=Object.assign({},this.data[e],{label:this.data[e].label+" !!!"})},e.delete=function(t){var e=this.data.findIndex((function(e){return e.id===t}));this.data.splice(e,1)},e.run=function(){this.data=this.buildData(),this.selected=void 0},e.add=function(){this.data=this.data.concat(this.buildData(1e3))},e.update=function(){this.updateData()},e.select=function(t){this.selected=t},e.runLots=function(){this.data=this.buildData(1e4),this.selected=void 0},e.clear=function(){this.data=[],this.selected=void 0},e.swapRows=function(){if(this.data.length>998){var t=this.data[1];this.data[1]=this.data[998],this.data[998]=t}},t}(),I=function(e){function o(t){var o;return(o=e.call(this,t)||this).state={store:new H},o.select=o.select.bind(n(o)),o.delete=o.delete.bind(n(o)),o.add=o.add.bind(n(o)),o.run=o.run.bind(n(o)),o.update=o.update.bind(n(o)),o.runLots=o.runLots.bind(n(o)),o.clear=o.clear.bind(n(o)),o.swapRows=o.swapRows.bind(n(o)),o.start=0,o.length=0,window.app=n(o),o}t(o,e);var r=o.prototype;return r.run=function(){this.state.store.run(),this.setState({store:this.state.store})},r.add=function(){this.state.store.add(),this.setState({store:this.state.store})},r.update=function(){this.state.store.update(),this.setState({store:this.state.store})},r.select=function(t){this.state.store.select(t),this.setState({store:this.state.store})},r.delete=function(t){this.state.store.delete(t),this.setState({store:this.state.store})},r.runLots=function(){this.state.store.runLots(),this.setState({store:this.state.store})},r.clear=function(){this.state.store.clear(),this.setState({store:this.state.store})},r.swapRows=function(){this.state.store.swapRows(),this.setState({store:this.state.store})},r.render=function(){var t=this,e=this.state.store.data.map((function(e,n){return i(j,{key:e.id,data:e,onClick:t.select,onDelete:t.delete,styleClass:e.id===t.state.store.selected?"danger":""})}));return i("div",{className:"container"},i("div",{className:"jumbotron"},i("div",{className:"row"},i("div",{className:"col-md-6"},i("h1",null,"preact 8")),i("div",{className:"col-md-6"},i("div",{className:"row"},i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"run",onClick:this.run},"Create 1,000 rows")),i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"runlots",onClick:this.runLots},"Create 10,000 rows")),i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"add",onClick:this.add},"Append 1,000 rows")),i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"update",onClick:this.update},"Update every 10th row")),i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"clear",onClick:this.clear},"Clear")),i("div",{className:"col-sm-6 smallpad"},i("button",{type:"button",className:"btn btn-primary btn-block",id:"swaprows",onClick:this.swapRows},"Swap Rows")))))),i("table",{className:"table table-hover table-striped test-data"},i("tbody",null,e)),i("span",{className:"preloadicon glyphicon glyphicon-remove","aria-hidden":"true"}))},o}(E);A=i(I,null),V=document.getElementById("main"),S(O,A,{},!1,V,!1);export{I as Main};