!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("fiber",[],t):"object"==typeof exports?exports.fiber=t():e.fiber=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=8)}([function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){var t=e.split("/").slice(1),n="data",r=d,o=!0,i=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(o=(u=l.next()).done);o=!0){var c=u.value;if(n+="/"+c,!r.children[c]){var s=new h(c,n);r.children[c]=s,r.element.appendChild(s.element)}r=r.children[c]}}catch(e){i=!0,a=e}finally{try{!o&&l.return&&l.return()}finally{if(i)throw a}}return r}function u(e){var t=e.split("/").slice(1),n=d,r=t.pop(),o=!0,i=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(o=(u=l.next()).done);o=!0){var c=u.value;if(!n.children[c])return!1;n=n.children[c]}}catch(e){i=!0,a=e}finally{try{!o&&l.return&&l.return()}finally{if(i)throw a}}return n.children[r]&&delete n.children[r],!0}Object.defineProperty(t,"__esModule",{value:!0}),t.DataEventPool=t.EventPool=t.DefinedEvent=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.getOrCreateEventPool=a,t.detachEventPool=u;var c=n(2),s=n(3),f=function(e){return e&&e.__esModule?e:{default:e}}(s),v=t.DefinedEvent=(0,c.basicEvent)("Fiber:NameSpace:Defined"),p=t.EventPool=function(){function e(){i(this,e)}return l(e,[{key:"trigger",value:function(e){var t=this;return new Promise(function(n,r){setTimeout(function(){return n(t.triggerSync(e))},0)})}},{key:"triggerSync",value:function(e){return this.element.dispatchEvent(e.event())}},{key:"listen",value:function(){for(var e=0;e<arguments.length;e+=2)this.addEventListener(arguments.length<=e?void 0:arguments[e],arguments.length<=e+1?void 0:arguments[e+1])}},{key:"addEventListener",value:function(e,t){var n=this,r=void 0,o=[];return"string"==typeof e?(r=t,e.trim().split(/\s/).forEach(function(e){o.push(e),n.element.addEventListener(e,r)})):(r=function(e){return t(e.detail)},this.element.addEventListener(e.EventName,r),o.push(e.EventName)),{callback:r,events:o}}},{key:"defineState",value:function(e){var t=this;this.__state||(this.__state={}),this.state||(this.state={}),Object.getOwnPropertyNames(e).forEach(function(n){t.__state[n]=null,Object.defineProperty(t.state,n,{get:function(){return(0,f.default)(t.__state[n])},enumerable:!0});for(var r=e[n](t.__state),o=0;o<r.length;o+=2)t.addEventListener(r[o],r[o+1])}),this.trigger(new v)}}],[{key:"forElement",value:function(e,t){var n=new this;return n.name=t&&t.constructor.name,n.element=e,n}},{key:"forComponent",value:function(e){var t=new this;return t.name=e.constructor.name,t.element=e.view,t}}]),e}(),h=t.DataEventPool=function(e){function t(e,n){i(this,t);var o=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o.name=e,o.path=n,o.element=o.createElement(e),o.children={},o}return o(t,e),l(t,[{key:"detach",value:function(){delete this.element,u(this.path)}},{key:"createElement",value:function(e){var t=document.createElement(function(e){return"#"==e[0]?"item":e.toLowerCase().replace(/[^a-z0-9]/g,"")}(e));return t.id=function(e){return e.replace(/[^A-Za-z0-9\/]/g,"").replace(/[\/]/g,"-")}(e),t}}]),t}(p);p.depth=0;var d=new h("data")},function(e,t,n){"use strict";function r(e){return"string"==typeof e?e:e.EventName}function o(){return(++a).toString()}Object.defineProperty(t,"__esModule",{value:!0});var i={components:new Map,listeners:new Map,observers:new Map,elementAttribute:"fiber-component-id"};i.init=function(){this.observe(document.body),this.init=!1},i.observe=function(e){var t=this,n=(this.observers.size+1).toString();if(!e._GC_observerId){e._GC_observerId=n;var r=new MutationObserver(function(e){e.forEach(function(e){e.removedNodes&&e.removedNodes.forEach(function(e){t.removeNode(e)})})});r.observe(e,{childList:!0,subtree:!0}),this.observers.set(n,{element:e,observer:r})}},i.removeNode=function(e){var t=this;if(e.querySelectorAll&&!e._GC_observerId){var n=function(e){var n=e.attributes[t.elementAttribute].value,r=t.components.get(n);r&&t.destroy(r)};e.querySelectorAll("["+this.elementAttribute+"]").forEach(n),e.attributes[this.elementAttribute]&&n(e)}},i.registerComponent=function(e){e.componentId=o(),this.components.set(e.componentId,e),this.listeners.set(e.componentId,[]),e.view.setAttribute(this.elementAttribute,e.componentId),i.init&&i.init()},i.registerListener=function(e,t,n,o){this.listeners.has(e.componentId)&&this.listeners.get(e.componentId).push({element:t,eventName:r(n),callback:o})},i.destroy=function(e){var t=!0,n=!1,r=void 0;try{for(var o,i=this.listeners.get(e.componentId)[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;a.element.removeEventListener(a.eventName,a.callback)}}catch(e){n=!0,r=e}finally{try{!t&&i.return&&i.return()}finally{if(n)throw r}}e.view=null,this.components.delete(e.componentId),this.listeners.delete(e.componentId)},t.default=i;var a=0},function(e,t,n){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){var t=Object.getOwnPropertyNames(e);return function(n){function a(){i(this,a);for(var n=r(this,(a.__proto__||Object.getPrototypeOf(a)).call(this)),o=arguments.length,u=Array(o),l=0;l<o;l++)u[l]=arguments[l];for(var c=0;c<u.length;c++){var f=t[c];if(void 0===f||void 0===e[f])throw new m(n,f,u[c]);var v=h.Optional.from(e[f]),d=s(v,2),y=d[0],b=d[1];if(!y||void 0!==u[c]&&null!==u[c])if("Mixed"===b.name)n[f]=(0,p.default)(u[c]);else if(b==Number||b==String||b==Boolean)n[f]=new b(u[c]).valueOf();else{if(b instanceof Object&&!(u[c]instanceof b))throw new m(n,f,u[c],b);n[f]=(0,p.default)(u[c])}else n[f]=u[c]}return n}return o(a,n),a}(y)}function u(e){return function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),t}(e).alias("Event"+ ++d)}function l(e){return function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),t}(y).alias(e||"Event"+ ++d)}function c(e,t){return u(e).alias(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Event=void 0;var s=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.defineEventType=a,t.eventOfType=u,t.basicEvent=l,t.defineEvent=c;var v=n(3),p=function(e){return e&&e.__esModule?e:{default:e}}(v),h=n(9),d=0,y=function(){function e(){i(this,e),this.name=this.constructor.EventName}return f(e,[{key:"event",value:function(){return this.originalEvent||(this.originalEvent=new CustomEvent(this.name,{detail:this,bubbles:!this.constructor._cancelBubble,cancelable:!0})),this.originalEvent}},{key:"stopPropagation",value:function(){this.originalEvent&&this.originalEvent.stopPropagation()}},{key:"preventDefault",value:function(){this.originalEvent&&this.originalEvent.preventDefault()}}],[{key:"bubbles",value:function(e){return this._cancelBubble=!e,this}},{key:"alias",value:function(e){return this.EventName=e,this}},{key:"on",value:function(e){return{namespace:e,event:this}}}]),e}();t.Event=y;var m=function(e){function t(e,n,o,a){if(i(this,t),a)var u=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"Type mismatch for Event '"+e.name+"' for attribute '"+n+"'"));else var u=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"Unexpected parameter for Event '"+e.name+"'"));return u.event=e,u.name=n,u.value=o,u.type=a,r(u)}return o(t,e),t}(Error)},function(e,t,n){"use strict";function r(e){if(!(e instanceof Object)||e instanceof Function)return e;if(e instanceof Array)return e.map(function(e){return r(e)});if(e instanceof Number||e instanceof String||e instanceof Date||e instanceof RegExp||e instanceof Boolean)return new e.constructor(e);if(e.clone instanceof Function)return e.clone();var t={},n=!0,o=!1,i=void 0;try{for(var a,u=Object.getOwnPropertyNames(e)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var l=a.value;t[l]=r(e[l])}}catch(e){o=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.EventFlow=t.EventFlowType=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=(n(2),n(0));t.EventFlowType=function e(){r(this,e);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];this.steps=n,n.forEach(function(e){if(!(e.namespace instanceof i.EventPool&&e.event.EventName))throw new Error("wrong argument for Flow step!")})},t.EventFlow=function(){function e(t){var n=this;r(this,e),this.steps=t.steps,this.currentEvent=null,this.currentNameSpace=null,this.promise=new Promise(function(e,t){n.resolve=e,n.reject=t})}return o(e,[{key:"trigger",value:function(e){var t=this.steps.shift();return t||this.reject(e),!e instanceof t.event&&this.reject(e),this.currentEvent=e,this.currentNameSpace=t.namespace,e.flow=this,this.currentNameSpace.trigger(e),this.steps.length||this.resolve(this),this.promise}},{key:"listen",value:function(){throw new Error("You can't set listeners on an EventFlow! (yet?)")}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=n(4),u=function(){function e(){r(this,e);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];this.init.apply(this,n)}return o(e,[{key:"init",value:function(){}},{key:"listen",value:function(){}},{key:"on",value:function(e){return e instanceof a.EventFlowType?this.flow(e):e instanceof i.EventPool||e instanceof a.EventFlow?e:(0,i.getOrCreateEventPool)(e)}},{key:"flow",value:function(e){return new a.EventFlow(e)}}],[{key:"attachTo",value:function(e){var t=new this;return t.eventPool=e instanceof i.EventPool?e:(0,i.getOrCreateEventPool)(e),t.listen(),t}}]),e}();t.default=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=n(4),s=n(7),f=r(s),v=n(1),p=r(v),h=function(){function e(){a(this,e);for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];this.init.apply(this,n)}return u(e,[{key:"init",value:function(){}},{key:"listen",value:function(){}},{key:"render",value:function(){return this.constructor.template&&(this.view=f.default.render(this.constructor.template)),this.listen(),this.view}},{key:"getOrCreateEventPool",value:function(){return this.eventPool||(this.eventPool=l.EventPool.forComponent(this))}},{key:"on",value:function(e){return e instanceof c.EventFlowType?this.flow(e):e instanceof c.EventFlow?e:e instanceof l.EventPool?new d(this,e):new d(this,(0,l.getOrCreateEventPool)(e))}},{key:"flow",value:function(e){return new c.EventFlow(e)}},{key:"ui",value:function(e){var t=f.default.getElement(e||this.view,this.view);return t?new d(this,l.EventPool.forElement(t,this)):null}},{key:"view",get:function(){return this._view},set:function(e){this._view=e,this.getOrCreateEventPool().element=e,e&&p.default.registerComponent(this)}}],[{key:"elementName",value:function(){return this.name.replace("Component","").replace(/[A-Z]/g,"-$&").toLowerCase().substr(1)}},{key:"withTemplate",value:function(e){return function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,null,[{key:"__setTemplate",value:function(e){return this.template=e,this}}]),t}(this).__setTemplate(e)}},{key:"attachTo",value:function(e){e=f.default.getElement(e);for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=new(Function.prototype.bind.apply(this,[null].concat(n)));o._attached=!0;var i=this.template?f.default.render(this.template):null;return i?i.tagName==e.tagName?(e.replaceWith(i),o.view=i):(o.view=e,o.view.append(i)):o.view=e,o.listen(),o}},{key:"populate",value:function(e){var t=this;if(!e instanceof Element)return!1;var n=e.querySelectorAll(this.elementName());return e.tagName.toLowerCase()==this.elementName()&&(n=[e]),n.forEach(function(e){t.attachTo(e)}),n}}]),e}(),d=function(){function e(t,n){a(this,e),this.component=t,this.eventPool=n}return u(e,[{key:"listen",value:function(){for(var e=this,t=arguments,n=0;n<arguments.length;n+=2)!function(n){var r=e.eventPool.addEventListener(t.length<=n?void 0:t[n],t.length<=n+1?void 0:t[n+1]);r.events.forEach(function(t){return p.default.registerListener(e.component,e.eventPool.element,t,r.callback)})}(n)}},{key:"trigger",value:function(e){return this.eventPool.trigger(e)}}]),e}();t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i={};i.getElement=function(e,t){return"string"==typeof e?(t||document).querySelector(e):e},i.render=function(e,t){if(e instanceof Element)return e;var n=document.createElement(t||"div");return n.innerHTML=e,t||1!=n.childElementCount?n:n.firstElementChild},i.renderWithComponents=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e=i.render(e);var o=!0,a=!1,u=void 0;try{for(var l,c=n[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){l.value.populate(e)}}catch(e){a=!0,u=e}finally{try{!o&&c.return&&c.return()}finally{if(a)throw u}}return e},i.detach=function(e){o.default.observe(e),e.remove()},t.default=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=r(o),a=n(5),u=r(a),l=n(6),c=r(l),s=n(0),f=n(2),v=n(4),p=n(3),h=r(p),d=n(7),y=r(d),m=n(10),b=r(m),g={};g.GC=i.default,g.DataComponent=u.default,g.UIComponent=c.default,g.namespace=s.getOrCreateEventPool,g.NameSpace={create:s.getOrCreateEventPool,Defined:s.DefinedEvent},g.Event=f.Event,g.defineEvent=f.defineEvent,g.defineEventType=f.defineEventType,g.basicEvent=f.basicEvent,g.EventFlow={define:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new(Function.prototype.bind.apply(v.EventFlowType,[null].concat(t)))}},g.clone=h.default,g.DOM=y.default,g.Debugger=b.default,g.System=(0,s.getOrCreateEventPool)("data/system"),g.System.Ready=(0,f.basicEvent)("System:Ready");var w=g.DataComponent.attachTo(g.System);g.app=function(e){e(),w.on(g.System).trigger(new g.System.Ready)},t.default=g},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),(t.Optional=function(e){return{$isOptional:!0,value:e}}).from=function(e){return e.$isOptional?[!0,e.value]:[!1,e]};t.Mixed=function e(){r(this,e)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(e.name)return e.name;try{return e.toString().match(/_this[0-9][.]([^(]*)[(]/).pop()}catch(e){return"[inline method]"}}function i(){return" ".repeat(4*s.EventPool.depth)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),u=r(a),l=n(6),c=r(l),s=n(0),f={},v=null,p="font-weight: bold; color: black;",h="font-weight: normal; color: red;",d="font-weight: normal;";f.init=function(){c.default.prototype.$$on=c.default.prototype.on,c.default.prototype.on=function(e){return v=this,this.$$on(e)},c.default.prototype.$$ui=c.default.prototype.ui,c.default.prototype.ui=function(e){return v=this,this.$$ui(e)},c.default.prototype.$$flow=c.default.prototype.flow,c.default.prototype.flow=function(e){return v=this,this.$$flow(e)},u.default.prototype.$$on=u.default.prototype.on,u.default.prototype.on=function(e){return v=this,this.$$on(e)},u.default.prototype.$$flow=u.default.prototype.flow,u.default.prototype.flow=function(e){return v=this,this.$$flow(e)},s.EventPool.prototype.$$trigger=s.EventPool.prototype.trigger,s.EventPool.prototype.trigger=function(e){var t=this.name&&"data/"+this.name||"DOM",n=v.constructor.name;return 1==n.length&&(n="FiberJS"),console.log(i()+"%c"+e.name+" %ctriggered on %c"+t+"%c by %c"+n,"font-weight: bold; color: navy;",d,p,d,p),f.showEvents&&console.log(e),this.$$trigger(e)},s.EventPool.prototype.$$addEventListener=s.EventPool.prototype.addEventListener,s.EventPool.prototype.addEventListener=function(e,t){var n="string"==typeof e,r=n?e:e.EventName,a=v.constructor.name,u=v.view,l=function(e){return n?console.log(i()+"%c"+r.replace(" ","/")+"%c was triggered on "+a,"font-weight: bold; color: navy;",d):u&&f.showView?console.log(""+i()+a+" listening for %c"+r,u,h):console.log(i()+"%c"+a+"%c listening for %c"+r,"font-weight: bold; color: #2D602D;",d,h),console.log(i()+"%c"+o(t)+"%c is called by "+a,"font-weight: bold; color: #d9534f;",d),t(e)};return this.$$addEventListener(e,l)}},t.default=f}])});