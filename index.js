!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("fiber",[],t):"object"==typeof exports?exports.fiber=t():e.fiber=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=10)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.EventGateway=function(){function e(){r(this,e)}return o(e,[{key:"trigger",value:function(e){var t=this;return new Promise(function(n,r){setTimeout(function(){return n(t.triggerSync(e))},0)})}},{key:"triggerSync",value:function(e){return this.element.dispatchEvent(e.event())}},{key:"listen",value:function(){for(var e=0;e<arguments.length;e+=2)this.addEventListener(arguments.length<=e?void 0:arguments[e],arguments.length<=e+1?void 0:arguments[e+1])}},{key:"addEventListener",value:function(t,n){var r=this,o=void 0,i=[];return"string"==typeof t?(o=n,t.trim().split(/\s/).forEach(function(e){i.push(e),r.element.addEventListener(e,o)})):!(t instanceof Event)&&t.namespace instanceof e?(o=function(e){return n(e.detail)},t.namespace.element.addEventListener(t.event.EventName,o),i.push(t.EventName)):(o=function(e){return n(e.detail)},this.element.addEventListener(t.EventName,o),i.push(t.EventName)),{callback:o,events:i}}}],[{key:"forElement",value:function(e,t){var n=new this;return n.name=t&&t.constructor.name,n.element=e,n}},{key:"forComponent",value:function(e){var t=new this;return t.name=e.constructor.name,t.element=e.view,t}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t=e.split("/").slice(1),n="data",r=h,o=!0,i=!1,a=void 0;try{for(var u,c=t[Symbol.iterator]();!(o=(u=c.next()).done);o=!0){var l=u.value;if(n+="/"+l,!r.children[l]){var f=new y(l,n);r.children[l]=f,r.element.appendChild(f.element)}r=r.children[l]}}catch(e){i=!0,a=e}finally{try{!o&&c.return&&c.return()}finally{if(i)throw a}}return r}function u(e){var t=e.split("/").slice(1),n=h,r=t.pop(),o=!0,i=!1,a=void 0;try{for(var u,c=t[Symbol.iterator]();!(o=(u=c.next()).done);o=!0){var l=u.value;if(!n.children[l])return!1;n=n.children[l]}}catch(e){i=!0,a=e}finally{try{!o&&c.return&&c.return()}finally{if(i)throw a}}return n.children[r]&&delete n.children[r],!0}Object.defineProperty(t,"__esModule",{value:!0}),t.NameSpace=t.DefinedEvent=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.getNameSpaceByPath=a,t.detachEventGateway=u;var l=n(4),f=n(0),s=n(5),p=function(e){return e&&e.__esModule?e:{default:e}}(s),v=t.DefinedEvent=(0,l.basicEvent)("Fiber:NameSpace:Defined"),y=t.NameSpace=function(e){function t(e,n){r(this,t);var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.name=e,i.path=n,i.element=i.createElement(e),i.children={},i}return i(t,e),c(t,[{key:"detach",value:function(){delete this.element,u(this.path)}},{key:"createElement",value:function(e){var t=document.createElement(function(e){return"#"==e[0]?"item":e.toLowerCase().replace(/[^a-z0-9]/g,"")}(e));return t.id=function(e){return e.replace(/[^A-Za-z0-9\/]/g,"").replace(/[\/]/g,"-")}(e),t}},{key:"defineState",value:function(e){var t=this;this.__state||(this.__state=new p.default),this.state=this.__state.reader,Object.getOwnPropertyNames(e).forEach(function(n){t.__state.addProperty(n);for(var r=e[n](t.__state.modifier),o=0;o<r.length;o+=2)t.addEventListener(r[o],r[o+1])}),this.trigger(new v)}}]),t}(f.EventGateway),h=new y("data")},function(e,t,n){"use strict";function r(e){return"string"==typeof e?e:e.EventName}function o(){return(++a).toString()}Object.defineProperty(t,"__esModule",{value:!0});var i={components:new Map,listeners:new Map,observers:new Map,elementAttribute:"fiber-component-id"};i.init=function(){this.observe(document.body),this.init=!1},i.observe=function(e){var t=this,n=(this.observers.size+1).toString();if(!e._GC_observerId){e._GC_observerId=n;var r=new MutationObserver(function(e){e.forEach(function(e){e.removedNodes&&e.removedNodes.forEach(function(e){t.removeNode(e)})})});r.observe(e,{childList:!0,subtree:!0}),this.observers.set(n,{element:e,observer:r})}},i.removeNode=function(e){var t=this;if(e.querySelectorAll&&!e._GC_observerId){var n=function(e){var n=e.attributes[t.elementAttribute].value,r=t.components.get(n);r&&t.destroy(r)};e.querySelectorAll("["+this.elementAttribute+"]").forEach(n),e.attributes[this.elementAttribute]&&n(e)}},i.registerComponent=function(e){e.componentId=o(),this.components.set(e.componentId,e),this.listeners.set(e.componentId,[]),e.view.setAttribute(this.elementAttribute,e.componentId),i.init&&i.init()},i.registerListener=function(e,t,n,o){this.listeners.has(e.componentId)&&this.listeners.get(e.componentId).push({element:t,eventName:r(n),callback:o})},i.destroy=function(e){var t=!0,n=!1,r=void 0;try{for(var o,i=this.listeners.get(e.componentId)[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;a.element.removeEventListener(a.eventName,a.callback)}}catch(e){n=!0,r=e}finally{try{!t&&i.return&&i.return()}finally{if(n)throw r}}e.view=null,this.components.delete(e.componentId),this.listeners.delete(e.componentId)},t.default=i;var a=0},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=n(1),u=n(7),c=function(){function e(){r(this,e);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];this.init.apply(this,n)}return o(e,[{key:"init",value:function(){}},{key:"listen",value:function(){}},{key:"on",value:function(e){return e instanceof u.EventFlowType?this.flow(e):e instanceof i.EventGateway||e instanceof u.EventFlow?e:(0,a.getNameSpaceByPath)(e)}},{key:"flow",value:function(e){return new u.EventFlow(e)}}]),e}();t.default=c},function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){var t=Object.getOwnPropertyNames(e);return function(n){function a(){i(this,a);for(var n=r(this,(a.__proto__||Object.getPrototypeOf(a)).call(this)),o=new v.default(n),u=arguments.length,c=Array(u),l=0;l<u;l++)c[l]=arguments[l];for(var s=0;s<c.length;s++){var p=t[s];if(void 0===p||void 0===e[p])throw new m(n,p,c[s]);var h=y.Optional.from(e[p]),d=f(h,2),b=d[0],w=d[1];if(o.addProperty(p),!b||void 0!==c[s]&&null!==c[s])if("Mixed"===w.name)o.modifier[p]=c[s];else if(w==Number||w==String||w==Boolean)o.modifier[p]=new w(c[s]).valueOf();else{if(w instanceof Object&&!(c[s]instanceof w))throw new m(n,p,c[s],w);o.modifier[p]=c[s]}else o.modifier[p]=c[s]}return n}return o(a,n),a}(d)}function u(e){return function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),t}(e).alias("Event"+ ++h)}function c(e){return function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),t}(d).alias(e||"Event"+ ++h)}function l(e,t){return u(e).alias(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Event=void 0;var f=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.defineEventType=a,t.eventOfType=u,t.basicEvent=c,t.defineEvent=l;var p=n(5),v=function(e){return e&&e.__esModule?e:{default:e}}(p),y=n(12),h=0,d=function(){function e(){i(this,e),this.name=this.constructor.EventName}return s(e,[{key:"event",value:function(){return this.originalEvent||(this.originalEvent=new CustomEvent(this.name,{detail:this,bubbles:!this.constructor._cancelBubble,cancelable:!0})),this.originalEvent}},{key:"stopPropagation",value:function(){this.originalEvent&&this.originalEvent.stopPropagation()}},{key:"preventDefault",value:function(){this.originalEvent&&this.originalEvent.preventDefault()}}],[{key:"bubbles",value:function(e){return this._cancelBubble=!e,this}},{key:"alias",value:function(e){return this.EventName=e,this}},{key:"on",value:function(e){return{namespace:e,event:this}}}]),e}();t.Event=d;var m=function(e){function t(e,n,o,a){if(i(this,t),a)var u=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"Type mismatch for Event '"+e.name+"' for attribute '"+n+"'"));else var u=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"Unexpected parameter for Event '"+e.name+"'"));return u.event=e,u.name=n,u.value=o,u.type=a,r(u)}return o(t,e),t}(Error)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){return e instanceof Object?new Proxy(e,{get:function(e,t){return o(e[t])},set:function(){return!0}}):e}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.readOnly=o;var a=n(6),u=function(e){return e&&e.__esModule?e:{default:e}}(a),c=function(){function e(t){r(this,e),this.reader=t||{},this.modifier={}}return i(e,[{key:"addProperty",value:function(e){var t=this;this.modifier[e]=null,Object.defineProperty(this.reader,e,{get:function(){return(0,u.default)(t.modifier[e])},enumerable:!0})}}]),e}();t.default=c},function(e,t,n){"use strict";function r(e){if(!(e instanceof Object)||e instanceof Function)return e;if(e instanceof Array)return e.map(function(e){return r(e)});if(e instanceof Number||e instanceof String||e instanceof Date||e instanceof RegExp||e instanceof Boolean)return new e.constructor(e);if(e.clone instanceof Function)return e.clone();var t={},n=!0,o=!1,i=void 0;try{for(var a,u=Object.getOwnPropertyNames(e)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var c=a.value;t[c]=r(e[c])}}catch(e){o=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.EventFlow=t.EventFlowType=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=(n(4),n(0));t.EventFlowType=function e(){r(this,e);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];this.steps=n,n.forEach(function(e){if(!(e.namespace instanceof i.EventGateway&&e.event.EventName))throw new Error("wrong argument for Flow step!")})},t.EventFlow=function(){function e(t){var n=this;r(this,e),this.steps=t.steps,this.currentEvent=null,this.currentNameSpace=null,this.promise=new Promise(function(e,t){n.resolve=e,n.reject=t})}return o(e,[{key:"trigger",value:function(e){var t=this.steps.shift();return t||this.reject(e),!e instanceof t.event&&this.reject(e),this.currentEvent=e,this.currentNameSpace=t.namespace,e.flow=this,this.currentNameSpace.trigger(e),this.steps.length||this.resolve(this),this.promise}},{key:"listen",value:function(){throw new Error("You can't set listeners on an EventFlow! (yet?)")}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},l=n(3),f=r(l),s=n(0),p=(n(1),n(9)),v=r(p),y=n(2),h=r(y),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return this.constructor.template&&(this.view=v.default.render(this.constructor.template)),this.listen(),this.view}},{key:"getNameSpaceByPath",value:function(){return this.EventGateway||(this.EventGateway=s.EventGateway.forComponent(this))}},{key:"on",value:function(e){return e=c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"on",this).call(this,e),e instanceof s.EventGateway?new m(this,e):e}},{key:"ui",value:function(e){var t=v.default.getElement(e||this.view,this.view);return t?new m(this,s.EventGateway.forElement(t,this)):null}},{key:"view",get:function(){return this._view},set:function(e){this._view=e,this.getNameSpaceByPath().element=e,e&&h.default.registerComponent(this)}},{key:"namespace",get:function(){return this.getNameSpaceByPath()}}],[{key:"elementName",value:function(){return this.name.replace("Component","").replace(/[A-Z]/g,"-$&").toLowerCase().substr(1)}},{key:"withTemplate",value:function(e){return function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,null,[{key:"__setTemplate",value:function(e){return this.template=e,this}}]),t}(this).__setTemplate(e)}},{key:"attachTo",value:function(e){e=v.default.getElement(e);for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=new(Function.prototype.bind.apply(this,[null].concat(n)));o._attached=!0;var i=this.template?v.default.render(this.template):null;return i?i.tagName==e.tagName?(e.replaceWith(i),o.view=i):(o.view=e,o.view.append(i)):o.view=e,o.listen(),o}},{key:"populate",value:function(e){var t=this;if(!e instanceof Element)return!1;var n=e.querySelectorAll(this.elementName());return e.tagName.toLowerCase()==this.elementName()&&(n=[e]),n.forEach(function(e){t.attachTo(e)}),n}}]),t}(f.default),m=function(){function e(t,n){o(this,e),this.component=t,this.EventGateway=n}return u(e,[{key:"listen",value:function(){for(var e=this,t=arguments,n=0;n<arguments.length;n+=2)!function(n){var r=e.EventGateway.addEventListener(t.length<=n?void 0:t[n],t.length<=n+1?void 0:t[n+1]);r.events.forEach(function(t){return h.default.registerListener(e.component,e.EventGateway.element,t,r.callback)})}(n)}},{key:"trigger",value:function(e){return this.EventGateway.trigger(e)}},{key:"triggerSync",value:function(e){return this.EventGateway.triggerSync(e)}}]),e}();t.default=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i={};i.getElement=function(e,t){return"string"==typeof e?(t||document).querySelector(e):e},i.render=function(e,t){if(e instanceof Element)return e;var n=document.createElement(t||"div");return n.innerHTML=e,t||1!=n.childElementCount?n:n.firstElementChild},i.renderWithComponents=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e=i.render(e);var o=!0,a=!1,u=void 0;try{for(var c,l=n[Symbol.iterator]();!(o=(c=l.next()).done);o=!0){c.value.populate(e)}}catch(e){a=!0,u=e}finally{try{!o&&l.return&&l.return()}finally{if(a)throw u}}return e},i.detach=function(e){o.default.observe(e),e.remove()},t.default=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),i=r(o),a=n(11),u=r(a),c=n(8),l=r(c),f=n(1),s=n(4),p=n(7),v=n(6),y=r(v),h=n(9),d=r(h),m=n(13),b=r(m),w={};w.GC=i.default,w.DataComponent=u.default,w.UIComponent=l.default,w.namespace=f.getNameSpaceByPath,w.NameSpace={create:f.getNameSpaceByPath,Defined:f.DefinedEvent},w.Event=s.Event,w.defineEvent=s.defineEvent,w.defineEventType=s.defineEventType,w.basicEvent=s.basicEvent,w.EventFlow={define:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new(Function.prototype.bind.apply(p.EventFlowType,[null].concat(t)))}},w.clone=y.default,w.DOM=d.default,w.Debugger=b.default,w.System=(0,f.getNameSpaceByPath)("data/system"),w.System.Ready=(0,s.basicEvent)("System:Ready");var g=w.DataComponent.attachTo(w.System);w.app=function(e){e(),g.on(w.System).trigger(new w.System.Ready)},t.default=w},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(3),c=function(e){return e&&e.__esModule?e:{default:e}}(u),l=n(0),f=n(1),s=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),a(t,[{key:"namespace",get:function(){return this.EventGateway}}],[{key:"attachTo",value:function(e){var t=new this;return t.EventGateway=e instanceof l.EventGateway?e:(0,f.getNameSpaceByPath)(e),t.listen(),t}}]),t}(c.default);t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),(t.Optional=function(e){return{$isOptional:!0,value:e}}).from=function(e){return e.$isOptional?[!0,e.value]:[!1,e]};t.Mixed=function e(){r(this,e)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(e.name)return e.name;try{return e.toString().match(/_this[0-9][.]([^(]*)[(]/).pop()}catch(e){return"[inline method]"}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=r(i),u=n(8),c=r(u),l=n(0),f={},s=null,p="font-weight: bold; color: black;",v="font-weight: normal; color: red;",y="font-weight: normal;";f.init=function(){a.default.prototype.$$on=a.default.prototype.on,a.default.prototype.on=function(e){return s=this,this.$$on(e)},c.default.prototype.$$ui=c.default.prototype.ui,c.default.prototype.ui=function(e){return s=this,this.$$ui(e)},a.default.prototype.$$flow=a.default.prototype.flow,a.default.prototype.flow=function(e){return s=this,this.$$flow(e)},l.EventGateway.prototype.$$triggerSync=l.EventGateway.prototype.triggerSync,l.EventGateway.prototype.triggerSync=function(e){var t=this.name&&"data/"+this.name||"DOM",n=s.constructor.name;return 1==n.length&&(n="FiberJS"),console.log(" %c"+e.name+" %ctriggered on %c"+t+"%c by %c"+n,"font-weight: bold; color: navy;",y,p,y,p),f.showEvents&&console.log(e),this.$$triggerSync(e)},l.EventGateway.prototype.$$addEventListener=l.EventGateway.prototype.addEventListener,l.EventGateway.prototype.addEventListener=function(e,t){var n="string"==typeof e,r=n?e:e.EventName,i=s.constructor.name,a=s.view,u=function(e){return n?console.log(" %c"+r.replace(" ","/")+"%c was triggered on "+i,"font-weight: bold; color: navy;",y):a&&f.showView?console.log(" "+i+" listening for %c"+r,a,v):console.log(" %c"+i+"%c listening for %c"+r,"font-weight: bold; color: #2D602D;",y,v),console.log(" %c"+o(t)+"%c is called by "+i,"font-weight: bold; color: #d9534f;",y),t(e)};return this.$$addEventListener(e,u)}},t.default=f}])});