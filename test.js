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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lastTriggeredOf = lastTriggeredOf;

var _global = __webpack_require__(1);

var triggerLogs = new Map();

(0, _global.afterSystemLoaded)(function (_ref) {
    var Fiber = _ref.Fiber,
        NameSpace = _ref.NameSpace,
        EventGateway = _ref.EventGateway;

    Fiber.Event.prototype.$$event = Fiber.Event.prototype.event;
    Fiber.Event.prototype.event = function () {
        if (!triggerLogs.has(this.name)) {
            triggerLogs.set(this.name, [this]);
        } else {
            triggerLogs.get(this.name).push(this);
        }
        return this.$$event();
    };
    Fiber.Event.last = function () {
        return this.prototype.lastTriggered;
    };

    NameSpace.prototype.$$triggerSync = NameSpace.prototype.triggerSync;
    NameSpace.prototype.triggerSync = function (fiberEvent) {
        fiberEvent.event();
        return this.$$triggerSync(fiberEvent);
    };

    EventGateway.prototype.$$trigger = EventGateway.prototype.trigger;
    EventGateway.prototype.trigger = function (fiberEvent) {
        return this.triggerSync(fiberEvent);
    };
});

function lastTriggeredOf(EventType) {
    var allTriggered = triggerLogs.get(EventType.EventName);

    return allTriggered ? allTriggered[allTriggered.length - 1] : null;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.afterSystemLoaded = afterSystemLoaded;
exports.registerSystemLoaded = registerSystemLoaded;

function root() {
    return global.__Fiber || (global.__Fiber = {});
}

function afterSystemLoaded(initScript) {
    if (root().system) {
        initScript(root().system);
    } else {
        root().afterSystemLoaded || (root().afterSystemLoaded = []);
        root().afterSystemLoaded.push(initScript);
    }
}

function registerSystemLoaded(systemNamespace) {
    root().system = systemNamespace;
    root().afterSystemLoaded && root().afterSystemLoaded.forEach(function (script) {
        script(systemNamespace);
    });
    root().afterSystemLoaded = [];
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});