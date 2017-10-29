(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fiber", [], factory);
	else if(typeof exports === 'object')
		exports["fiber"] = factory();
	else
		root["fiber"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventGateway = exports.EventGateway = function () {
    function EventGateway() {
        _classCallCheck(this, EventGateway);
    }

    _createClass(EventGateway, [{
        key: 'trigger',
        value: function trigger(fiberEvent) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return resolve(_this.triggerSync(fiberEvent));
                }, 0);
            });
        }
    }, {
        key: 'triggerSync',
        value: function triggerSync(fiberEvent) {
            return this.element.dispatchEvent(fiberEvent.event());
        }
    }, {
        key: 'listen',
        value: function listen() {
            for (var i = 0; i < arguments.length; i += 2) {
                this.addEventListener(arguments.length <= i ? undefined : arguments[i], arguments.length <= i + 1 ? undefined : arguments[i + 1]);
            }
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(fiberEvent, eventHandler) {
            var _this2 = this;

            var realHandler = void 0;
            var events = [];
            if (typeof fiberEvent == 'string') {
                realHandler = eventHandler;
                fiberEvent.trim().split(/\s/).forEach(function (strEvent) {
                    events.push(strEvent);
                    _this2.element.addEventListener(strEvent, realHandler);
                });
            } else if (!(fiberEvent instanceof Event) && fiberEvent.namespace instanceof EventGateway) {
                return fiberEvent.namespace.addEventListener(fiberEvent.event, eventHandler);
            } else {
                realHandler = function realHandler(event) {
                    return eventHandler(event.detail);
                };
                this.element.addEventListener(fiberEvent.EventName, realHandler);
                events.push(fiberEvent.EventName);
            }
            return {
                callback: realHandler,
                events: events,
                element: this.element
            };
        }
    }], [{
        key: 'forElement',
        value: function forElement(element, component) {
            var instance = new this();

            instance.name = component && component.constructor.name;
            instance.element = element;

            return instance;
        }
    }, {
        key: 'forComponent',
        value: function forComponent(component) {
            var instance = new this();

            instance.name = component.constructor.name;
            instance.element = component.view;

            return instance;
        }
    }]);

    return EventGateway;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NameSpace = exports.DefinedEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(4);

var _eventGateway = __webpack_require__(0);

var _eventPool = __webpack_require__(14);

var _readOnly = __webpack_require__(5);

var _readOnly2 = _interopRequireDefault(_readOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefinedEvent = exports.DefinedEvent = (0, _event.basicEvent)('Fiber:NameSpace:Defined');

var NameSpace = exports.NameSpace = function (_EventGateway) {
    _inherits(NameSpace, _EventGateway);

    function NameSpace(name) {
        _classCallCheck(this, NameSpace);

        var _this = _possibleConstructorReturn(this, (NameSpace.__proto__ || Object.getPrototypeOf(NameSpace)).call(this));

        _this.name = name;
        _this.eventPool = new _eventPool.EventPool();
        return _this;
    }

    _createClass(NameSpace, [{
        key: 'defineState',
        value: function defineState(stateDefinition) {
            var _this2 = this;

            this.__state || (this.__state = new _readOnly2.default());
            this.state = this.__state.reader;
            Object.getOwnPropertyNames(stateDefinition).forEach(function (property) {
                _this2.__state.addProperty(property);
                var setters = stateDefinition[property](_this2.__state.modifier);
                for (var i = 0; i < setters.length; i += 2) {
                    _this2.addEventListener(setters[i], setters[i + 1]);
                }
            });

            this.trigger(new DefinedEvent());
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(fiberEvent, eventHandler) {
            var events = [];
            if (!(fiberEvent instanceof _event.Event) && fiberEvent.namespace instanceof _eventGateway.EventGateway) {
                return fiberEvent.namespace.addEventListener(fiberEvent.event, eventHandler);
            } else {
                this.eventPool.addEventListener(fiberEvent.EventName, eventHandler);
                events.push(fiberEvent.EventName);
            }
            return {
                callback: eventHandler,
                events: events,
                element: this.eventPool
            };
        }
    }, {
        key: 'triggerSync',
        value: function triggerSync(fiberEvent) {
            return this.eventPool.dispatchEvent(fiberEvent);
        }
    }], [{
        key: 'get',
        value: function get(name) {
            this.namespaces || (this.namespaces = new Map());

            var namespace = this.namespaces.get(name);

            if (!namespace) {
                namespace = new NameSpace(name);
                this.namespaces.set(name, namespace);
            }
            return namespace;
        }
    }]);

    return NameSpace;
}(_eventGateway.EventGateway);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var GC = {
    components: new Map(),
    listeners: new Map(),
    observers: new Map(),
    elementAttribute: 'fiber-component-id'
};

GC.init = function () {
    this.observe(document.body);
    this.init = false;
};

GC.observe = function (element) {
    var _this = this;

    var observerId = (this.observers.size + 1).toString();

    if (element._GC_observerId) {
        return;
    }

    element._GC_observerId = observerId;

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.removedNodes) {
                mutation.removedNodes.forEach(function (node) {
                    _this.removeNode(node);
                });
            }
        });
    });

    observer.observe(element, { childList: true, subtree: true });

    this.observers.set(observerId, {
        element: element,
        observer: observer
    });
};

GC.removeNode = function (element) {
    var _this2 = this;

    if (!element.querySelectorAll) return;

    if (element._GC_observerId) {
        return;
    }

    var processNode = function processNode(view) {
        var componentId = view.attributes[_this2.elementAttribute].value;
        var component = _this2.components.get(componentId);

        component && _this2.destroy(component);
    };

    element.querySelectorAll('[' + this.elementAttribute + ']').forEach(processNode);
    if (element.attributes[this.elementAttribute]) {
        processNode(element);
    }
};

GC.registerComponent = function (component) {
    component.componentId = generateComponentId();
    this.components.set(component.componentId, component);
    this.listeners.set(component.componentId, []);

    component.view.setAttribute(this.elementAttribute, component.componentId);
    GC.init && GC.init();
};

GC.registerListener = function (component, element, event, callback) {
    if (!this.listeners.has(component.componentId)) return;

    this.listeners.get(component.componentId).push({
        element: element,
        eventName: extractEventName(event),
        callback: callback
    });
};

GC.destroy = function (component) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = this.listeners.get(component.componentId)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener.element.removeEventListener(listener.eventName, listener.callback);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    component.view = null;
    this.components.delete(component.componentId);
    this.listeners.delete(component.componentId);
};

exports.default = GC;


function extractEventName(event) {
    return typeof event == 'string' ? event : event.EventName;
}

var __id = 0;
// let __fullId = '';
function generateComponentId() {
    return (++__id).toString();
    // if(__id > 122) {
    //     __fullId = incrementStr(__fullId);
    //     __id = 97;
    // }
    // return __fullId + String.fromCharCode(__id);
}

function incrementStr(str) {
    for (var i = str.length - 1; i >= 0; i--) {
        if (str[i] != 'z') {
            return str.substr(0, i) + String.fromCharCode(str.charCodeAt(i) + 1) + 'a'.repeat(str.length - i - 1);
        }
    }
    return 'a'.repeat(str.length + 1);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventGateway = __webpack_require__(0);

var _namespace = __webpack_require__(1);

var _eventFlow = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentInterface = function () {
    function ComponentInterface() {
        _classCallCheck(this, ComponentInterface);

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
        }

        this.init.apply(this, params);
    }

    /**
    * called from component's constructor to initialize component instance
    * parameters are passed from the contrusctor or from the attachTo call
    -- keeping it for now but so far it seems unecessary --
    */


    _createClass(ComponentInterface, [{
        key: 'init',
        value: function init() {}

        /**
        * called after NameSpace/DOM is attached to the component to set up
        * its listeners
        * never gets any parameters
        */

    }, {
        key: 'listen',
        value: function listen() {}

        /**
        * access namespaces/flows from the component
        */

    }, {
        key: 'on',
        value: function on(target) {
            if (target instanceof _eventFlow.EventFlowType) {
                return this.flow(target);
            }

            return target instanceof _eventGateway.EventGateway || target instanceof _eventFlow.EventFlow ? target : (0, _namespace.getNameSpaceByPath)(target);
        }

        /**
        * starts a new flow of the given FlowType
        */

    }, {
        key: 'flow',
        value: function flow(flowType) {
            return new _eventFlow.EventFlow(flowType);
        }
    }]);

    return ComponentInterface;
}();

exports.default = ComponentInterface;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Event = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.defineEventType = defineEventType;
exports.eventOfType = eventOfType;
exports.basicEvent = basicEvent;
exports.defineEvent = defineEvent;

var _readOnly = __webpack_require__(5);

var _readOnly2 = _interopRequireDefault(_readOnly);

var _domain = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventId = 0;

var Event = function () {
    function Event() {
        _classCallCheck(this, Event);

        this.name = this.constructor.EventName;
    }

    _createClass(Event, [{
        key: 'event',
        value: function event() {
            if (!this.originalEvent) {
                this.originalEvent = new CustomEvent(this.name, {
                    detail: this,
                    bubbles: !this.constructor._cancelBubble,
                    cancelable: true
                });
            }
            return this.originalEvent;
        }
    }, {
        key: 'stopPropagation',
        value: function stopPropagation() {
            this.originalEvent && this.originalEvent.stopPropagation();
        }
    }, {
        key: 'preventDefault',
        value: function preventDefault() {
            this.originalEvent && this.originalEvent.preventDefault();
        }
    }], [{
        key: 'bubbles',
        value: function bubbles(_bubbles) {
            this._cancelBubble = !_bubbles;
            return this;
        }
    }, {
        key: 'alias',
        value: function alias(name) {
            this.EventName = name;
            return this;
        }
    }, {
        key: 'on',
        value: function on(namespace) {
            return {
                namespace: namespace,
                event: this
            };
        }
    }]);

    return Event;
}();

exports.Event = Event;

var EventAttributeError = function (_Error) {
    _inherits(EventAttributeError, _Error);

    function EventAttributeError(event, name, value, ParamType) {
        _classCallCheck(this, EventAttributeError);

        if (ParamType) {
            var _this = _possibleConstructorReturn(this, (EventAttributeError.__proto__ || Object.getPrototypeOf(EventAttributeError)).call(this, 'Type mismatch for Event \'' + event.name + '\' for attribute \'' + name + '\''));
        } else {
            var _this = _possibleConstructorReturn(this, (EventAttributeError.__proto__ || Object.getPrototypeOf(EventAttributeError)).call(this, 'Unexpected parameter for Event \'' + event.name + '\''));
        }
        _this.event = event;
        _this.name = name;
        _this.value = value;
        _this.type = ParamType;
        return _possibleConstructorReturn(_this);
    }

    return EventAttributeError;
}(Error);

function defineEventType(descriptor) {
    var propNames = Object.getOwnPropertyNames(descriptor);
    var DefinedEventClass = function (_Event) {
        _inherits(DefinedEventClass, _Event);

        function DefinedEventClass() {
            _classCallCheck(this, DefinedEventClass);

            var _this2 = _possibleConstructorReturn(this, (DefinedEventClass.__proto__ || Object.getPrototypeOf(DefinedEventClass)).call(this));

            var readonly = new _readOnly2.default(_this2);

            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            for (var i = 0; i < params.length; i++) {
                var paramName = propNames[i];
                if (paramName === undefined || descriptor[paramName] === undefined) {
                    throw new EventAttributeError(_this2, paramName, params[i]);
                }

                var _Optional$from = _domain.Optional.from(descriptor[paramName]),
                    _Optional$from2 = _slicedToArray(_Optional$from, 2),
                    optional = _Optional$from2[0],
                    ParamType = _Optional$from2[1];

                readonly.addProperty(paramName);

                if (optional && (params[i] === undefined || params[i] === null)) {
                    readonly.modifier[paramName] = params[i];
                } else if (ParamType.name === 'Mixed') {
                    readonly.modifier[paramName] = params[i];
                } else if (ParamType == Number || ParamType == String || ParamType == Boolean) {
                    readonly.modifier[paramName] = new ParamType(params[i]).valueOf();
                } else if (ParamType instanceof Object && !(params[i] instanceof ParamType)) {
                    throw new EventAttributeError(_this2, paramName, params[i], ParamType);
                } else {
                    readonly.modifier[paramName] = params[i];
                }
            }
            return _this2;
        }

        return DefinedEventClass;
    }(Event);
    return DefinedEventClass;
};

function eventOfType(EventType) {
    return function (_EventType) {
        _inherits(_class, _EventType);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        return _class;
    }(EventType).alias('Event' + ++eventId);
};

function basicEvent(name) {
    return function (_Event2) {
        _inherits(_class2, _Event2);

        function _class2() {
            _classCallCheck(this, _class2);

            return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
        }

        return _class2;
    }(Event).alias(name || 'Event' + ++eventId);
};

function defineEvent(EventType, alias) {
    return eventOfType(EventType).alias(alias);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.readOnly = readOnly;

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function readOnly(original) {
    return original instanceof Object ? new Proxy(original, {
        get: function get(target, property) {
            return readOnly(target[property]);
        },
        set: function set() {
            return true;
        }
    }) : original;
}

var ReadOnly = function () {
    function ReadOnly(reader) {
        _classCallCheck(this, ReadOnly);

        this.reader = reader || {};
        this.modifier = {};
    }

    _createClass(ReadOnly, [{
        key: 'addProperty',
        value: function addProperty(name) {
            var _this = this;

            this.modifier[name] = null;
            Object.defineProperty(this.reader, name, {
                get: function get() {
                    return (0, _clone2.default)(_this.modifier[name]);
                },
                // get: () => readOnly(this.modifier[name]),
                enumerable: true
            });
        }
    }]);

    return ReadOnly;
}();

/*
    Performance tests show that proxies are slower than cloning on demand
*/

exports.default = ReadOnly;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(obj) {
    if (!(obj instanceof Object) || obj instanceof Function) {
        return obj;
    }
    if (obj instanceof Array) {
        return obj.map(function (item) {
            return clone(item);
        });
    }
    if (obj instanceof Number || obj instanceof String || obj instanceof Date || obj instanceof RegExp || obj instanceof Boolean) {
        return new obj.constructor(obj);
    }
    if (obj.clone instanceof Function) {
        return obj.clone();
    }

    var copied = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.getOwnPropertyNames(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            copied[key] = clone(obj[key]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return copied;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventFlow = exports.EventFlowType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(4);

var _eventGateway = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventFlowType = exports.EventFlowType = function EventFlowType() {
    _classCallCheck(this, EventFlowType);

    for (var _len = arguments.length, steps = Array(_len), _key = 0; _key < _len; _key++) {
        steps[_key] = arguments[_key];
    }

    this.steps = steps;

    steps.forEach(function (step) {
        if (!(step.namespace instanceof _eventGateway.EventGateway && step.event.EventName)) {
            throw new Error('wrong argument for Flow step!');
        }
    });
};

var EventFlow = exports.EventFlow = function () {
    function EventFlow(flowType) {
        var _this = this;

        _classCallCheck(this, EventFlow);

        this.steps = flowType.steps;
        this.currentEvent = null;
        this.currentNameSpace = null;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }

    _createClass(EventFlow, [{
        key: 'trigger',
        value: function trigger(fiberEvent) {
            var step = this.steps.shift();

            if (!step) {
                this.reject(fiberEvent);
            }
            if (!fiberEvent instanceof step.event) {
                this.reject(fiberEvent);
            }

            this.currentEvent = fiberEvent;
            this.currentNameSpace = step.namespace;

            fiberEvent.flow = this;

            this.currentNameSpace.trigger(fiberEvent);

            if (!this.steps.length) {
                this.resolve(this);
            }

            return this.promise;
        }
    }, {
        key: 'listen',
        value: function listen() {
            throw new Error("You can't set listeners on an EventFlow! (yet?)");
        }
    }]);

    return EventFlow;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _componentInterface = __webpack_require__(3);

var _componentInterface2 = _interopRequireDefault(_componentInterface);

var _eventGateway = __webpack_require__(0);

var _namespace = __webpack_require__(1);

var _DOM = __webpack_require__(9);

var _DOM2 = _interopRequireDefault(_DOM);

var _gc = __webpack_require__(2);

var _gc2 = _interopRequireDefault(_gc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIComponent = function (_ComponentInterface) {
    _inherits(UIComponent, _ComponentInterface);

    function UIComponent() {
        _classCallCheck(this, UIComponent);

        return _possibleConstructorReturn(this, (UIComponent.__proto__ || Object.getPrototypeOf(UIComponent)).apply(this, arguments));
    }

    _createClass(UIComponent, [{
        key: 'render',
        value: function render() {
            if (this.constructor.template) {
                this.view = _DOM2.default.render(this.constructor.template);
            }

            this.listen();

            return this.view;
        }
    }, {
        key: 'getNameSpaceByPath',
        value: function getNameSpaceByPath() {
            return this.EventGateway || (this.EventGateway = _eventGateway.EventGateway.forComponent(this));
        }
    }, {
        key: 'on',
        value: function on(target) {
            target = _get(UIComponent.prototype.__proto__ || Object.getPrototypeOf(UIComponent.prototype), 'on', this).call(this, target);

            return target instanceof _eventGateway.EventGateway ? new EventGatewayAccessor(this, target) : target;
        }
    }, {
        key: 'ui',
        value: function ui(query) {
            var element = _DOM2.default.getElement(query || this.view, this.view);
            return element ? new EventGatewayAccessor(this, _eventGateway.EventGateway.forElement(element, this)) : null;
        }
    }, {
        key: 'view',
        get: function get() {
            return this._view;
        },
        set: function set(element) {
            this._view = element;
            this.getNameSpaceByPath().element = element;
            if (element) {
                _gc2.default.registerComponent(this);
            }
        }
    }, {
        key: 'namespace',
        get: function get() {
            return this.getNameSpaceByPath();
        }
    }], [{
        key: 'elementName',
        value: function elementName() {
            return this.name.replace('Component', '').replace(/[A-Z]/g, '-$&').toLowerCase().substr(1);
        }
    }, {
        key: 'withTemplate',
        value: function withTemplate(template) {
            return function (_ref) {
                _inherits(_class, _ref);

                function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                _createClass(_class, null, [{
                    key: '__setTemplate',
                    value: function __setTemplate(template) {
                        this.template = template;
                        return this;
                    }
                }]);

                return _class;
            }(this).__setTemplate(template);
        }
    }, {
        key: 'attachTo',
        value: function attachTo(element) {
            element = _DOM2.default.getElement(element);

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var instance = new (Function.prototype.bind.apply(this, [null].concat(params)))();
            instance._attached = true;

            var renderedTemplate = this.template ? _DOM2.default.render(this.template) : null;

            if (!renderedTemplate) {
                instance.view = element;
            } else if (renderedTemplate.tagName == element.tagName) {
                element.replaceWith(renderedTemplate);
                instance.view = renderedTemplate;
            } else {
                instance.view = element;
                instance.view.append(renderedTemplate);
            }
            instance.listen();

            return instance;
        }
    }, {
        key: 'populate',
        value: function populate(parentElement) {
            var _this3 = this;

            if (!parentElement instanceof Element) {
                return false;
            }

            var elements = parentElement.querySelectorAll(this.elementName());
            if (parentElement.tagName.toLowerCase() == this.elementName()) {
                elements = [parentElement];
            }
            elements.forEach(function (element) {
                _this3.attachTo(element);
            });

            return elements;
        }
    }]);

    return UIComponent;
}(_componentInterface2.default);

var EventGatewayAccessor = function () {
    function EventGatewayAccessor(component, pool) {
        _classCallCheck(this, EventGatewayAccessor);

        this.component = component;
        this.EventGateway = pool;
    }

    _createClass(EventGatewayAccessor, [{
        key: 'listen',
        value: function listen() {
            var _this4 = this,
                _arguments = arguments;

            var _loop = function _loop(i) {
                var listener = _this4.EventGateway.addEventListener(_arguments.length <= i ? undefined : _arguments[i], _arguments.length <= i + 1 ? undefined : _arguments[i + 1]);
                listener.events.forEach(function (event) {
                    return _gc2.default.registerListener(_this4.component, listener.element, event, listener.callback);
                });
            };

            for (var i = 0; i < arguments.length; i += 2) {
                _loop(i);
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(event) {
            return this.EventGateway.trigger(event);
        }
    }, {
        key: 'triggerSync',
        value: function triggerSync(event) {
            return this.EventGateway.triggerSync(event);
        }
    }]);

    return EventGatewayAccessor;
}();

exports.default = UIComponent;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gc = __webpack_require__(2);

var _gc2 = _interopRequireDefault(_gc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOM = {};

DOM.getElement = function (element, root) {
    return typeof element == 'string' ? (root || document).querySelector(element) : element;
};

DOM.render = function (template, wrapper) {
    if (template instanceof Element) {
        return template;
    }
    var parent = document.createElement(wrapper || 'div');
    parent.innerHTML = template;
    if (!wrapper && parent.childElementCount == 1) {
        return parent.firstElementChild;
    }

    return parent;
};

DOM.renderWithComponents = function (template) {
    for (var _len = arguments.length, components = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        components[_key - 1] = arguments[_key];
    }

    template = DOM.render(template);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var component = _step.value;

            component.populate(template);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return template;
};

DOM.detach = function (element) {
    _gc2.default.observe(element);
    element.remove();
};

exports.default = DOM;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gc = __webpack_require__(2);

var _gc2 = _interopRequireDefault(_gc);

var _dataComponent = __webpack_require__(11);

var _dataComponent2 = _interopRequireDefault(_dataComponent);

var _uiComponent = __webpack_require__(8);

var _uiComponent2 = _interopRequireDefault(_uiComponent);

var _namespace = __webpack_require__(1);

var _event = __webpack_require__(4);

var _eventFlow = __webpack_require__(7);

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

var _DOM = __webpack_require__(9);

var _DOM2 = _interopRequireDefault(_DOM);

var _debugger = __webpack_require__(13);

var _debugger2 = _interopRequireDefault(_debugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fiber = {};

// garbage Collector

Fiber.GC = _gc2.default;

// DataComponent

Fiber.DataComponent = _dataComponent2.default;

// UIComponent

Fiber.UIComponent = _uiComponent2.default;

// Namespace

Fiber.namespace = function (name) {
    return _namespace.NameSpace.get(name);
};
Fiber.NameSpace = {
    create: function create(name) {
        return _namespace.NameSpace.get(name);
    },
    Defined: _namespace.DefinedEvent
};

// events

Fiber.Event = _event.Event;
Fiber.defineEvent = _event.defineEvent;
Fiber.defineEventType = _event.defineEventType;
Fiber.basicEvent = _event.basicEvent;

// event-flows

Fiber.EventFlow = {
    define: function define() {
        for (var _len = arguments.length, steps = Array(_len), _key = 0; _key < _len; _key++) {
            steps[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(_eventFlow.EventFlowType, [null].concat(steps)))();
    }
};

// clone

Fiber.clone = _clone2.default;

// DOM

Fiber.DOM = _DOM2.default;

// Debugger

Fiber.Debugger = _debugger2.default;

// System events
Fiber.System = _namespace.NameSpace.get('data/system');
Fiber.System.Ready = (0, _event.basicEvent)('System:Ready');
var System = Fiber.DataComponent.attachTo(Fiber.System);

Fiber.app = function (startupScript) {
    startupScript();
    System.on(Fiber.System).trigger(new Fiber.System.Ready());
};

exports.default = Fiber;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _componentInterface = __webpack_require__(3);

var _componentInterface2 = _interopRequireDefault(_componentInterface);

var _eventGateway = __webpack_require__(0);

var _namespace = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataComponent = function (_ComponentInterface) {
    _inherits(DataComponent, _ComponentInterface);

    function DataComponent() {
        _classCallCheck(this, DataComponent);

        return _possibleConstructorReturn(this, (DataComponent.__proto__ || Object.getPrototypeOf(DataComponent)).apply(this, arguments));
    }

    _createClass(DataComponent, [{
        key: 'namespace',
        get: function get() {
            return this.EventGateway;
        }
    }], [{
        key: 'attachTo',
        value: function attachTo(target) {
            var instance = new this();

            instance.EventGateway = target instanceof _eventGateway.EventGateway ? target : (0, _namespace.getNameSpaceByPath)(target);

            instance.listen();

            return instance;
        }
    }]);

    return DataComponent;
}(_componentInterface2.default);

exports.default = DataComponent;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Optional = exports.Optional = function Optional(value) {
  return { $isOptional: true, value: value };
};
Optional.from = function (obj) {
  return obj.$isOptional ? [true, obj.value] : [false, obj];
};

var Mixed = exports.Mixed = function Mixed() {
  _classCallCheck(this, Mixed);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _componentInterface = __webpack_require__(3);

var _componentInterface2 = _interopRequireDefault(_componentInterface);

var _uiComponent = __webpack_require__(8);

var _uiComponent2 = _interopRequireDefault(_uiComponent);

var _eventGateway = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Debugger = {};
var actor = null;

var boldStyle = 'font-weight: bold; color: black;';
var triggeredStyle = 'font-weight: bold; color: navy;';
var eventStyle = 'font-weight: normal; color: red;';
var componentStyle = 'font-weight: bold; color: #2D602D;';
var handlerStyle = 'font-weight: bold; color: #d9534f;';
var normalStyle = 'font-weight: normal;';

Debugger.init = function () {

    // .on(), .ui() and .flow()
    _componentInterface2.default.prototype.$$on = _componentInterface2.default.prototype.on;
    _componentInterface2.default.prototype.on = function (path) {
        actor = this;
        return this.$$on(path);
    };
    _uiComponent2.default.prototype.$$ui = _uiComponent2.default.prototype.ui;
    _uiComponent2.default.prototype.ui = function (path) {
        actor = this;
        return this.$$ui(path);
    };
    _componentInterface2.default.prototype.$$flow = _componentInterface2.default.prototype.flow;
    _componentInterface2.default.prototype.flow = function (eventFlow) {
        actor = this;
        return this.$$flow(eventFlow);
    };

    // EventGateway
    _eventGateway.EventGateway.prototype.$$triggerSync = _eventGateway.EventGateway.prototype.triggerSync;
    _eventGateway.EventGateway.prototype.triggerSync = function (fiberEvent) {
        var poolName = this.name && 'data/' + this.name || 'DOM';
        var actorName = actor.constructor.name;
        if (actorName.length == 1) {
            actorName = 'FiberJS';
        }

        console.log(tab() + '%c' + fiberEvent.name + ' %ctriggered on %c' + poolName + '%c by %c' + actorName, triggeredStyle, normalStyle, boldStyle, normalStyle, boldStyle);
        if (Debugger.showEvents) {
            console.log(fiberEvent);
        }
        return this.$$triggerSync(fiberEvent);
    };

    _eventGateway.EventGateway.prototype.$$addEventListener = _eventGateway.EventGateway.prototype.addEventListener;
    _eventGateway.EventGateway.prototype.addEventListener = function (fiberEvent, handler) {
        var nativeEvent = typeof fiberEvent == 'string';
        var eventName = nativeEvent ? fiberEvent : fiberEvent.EventName;
        var boundActor = actor.constructor.name;
        var boundView = actor.view;

        var debugHandler = function debugHandler(event) {
            if (nativeEvent) {
                console.log(tab() + '%c' + eventName.replace(' ', '/') + '%c was triggered on ' + boundActor, triggeredStyle, normalStyle);
            } else {
                boundView && Debugger.showView ? console.log('' + tab() + boundActor + ' listening for %c' + eventName, boundView, eventStyle) : console.log(tab() + '%c' + boundActor + '%c listening for %c' + eventName, componentStyle, normalStyle, eventStyle);
            }
            console.log(tab() + '%c' + handlerToString(handler) + '%c is called by ' + boundActor, handlerStyle, normalStyle);
            return handler(event);
        };
        return this.$$addEventListener(fiberEvent, debugHandler);
    };
};

function handlerToString(handler) {
    if (handler.name) {
        return handler.name;
    }
    try {
        return handler.toString().match(/_this[0-9][.]([^(]*)[(]/).pop();
    } catch (e) {
        return '[inline method]';
    }
}

function tab() {
    return " "; //.repeat(EventGateway.depth * 4);
}

exports.default = Debugger;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListenerChain = function () {
    function ListenerChain(listener) {
        var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, ListenerChain);

        this.listener = listener;
        this.next = next;
    }

    _createClass(ListenerChain, [{
        key: "execute",
        value: function execute(event) {
            this.listener(event);
            if (this.next) {
                this.next.execute(event);
            }
        }
    }, {
        key: "add",
        value: function add(listener) {
            var node = this;

            while (node.next) {
                node = node.next;
            }

            node.next = new ListenerChain(listener);
        }
    }, {
        key: "without",
        value: function without(listener) {
            var root = this,
                node = root,
                prev = null;

            while (node) {
                if (node.listener == listener) {

                    if (prev == null) {
                        root = node.next;
                    } else {
                        prev.next = node.next;
                    }

                    return root;
                }

                prev = node;
                node = node.next;
            }

            return root;
        }
    }], [{
        key: "with",
        value: function _with(listener) {
            return new ListenerChain(listener);
        }
    }]);

    return ListenerChain;
}();

var EventPool = exports.EventPool = function () {
    function EventPool() {
        _classCallCheck(this, EventPool);

        this.eventPool = new Map();
    }

    _createClass(EventPool, [{
        key: "addEventListener",
        value: function addEventListener(eventName, listener) {
            if (this.eventPool.has(eventName)) {
                this.eventPool.get(eventName).add(listener);
            } else {
                this.eventPool.set(eventName, ListenerChain.with(listener));
            }
        }
    }, {
        key: "removeEventListener",
        value: function removeEventListener(eventName, listener) {
            var chain = this.eventPool.get(eventName);

            if (chain) {
                var newChain = chain.without(listener);

                if (newChain) {
                    this.eventPool.set(eventName, newChain);
                } else {
                    this.eventPool.delete(eventName);
                }
            }
        }
    }, {
        key: "dispatchEvent",
        value: function dispatchEvent(fiberEvent) {
            var chain = this.eventPool.get(fiberEvent.name);
            chain && chain.execute(fiberEvent);
        }
    }]);

    return EventPool;
}();

/***/ })
/******/ ]);
});