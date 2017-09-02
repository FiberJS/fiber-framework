
const Fiber = {};

// garbage Collector
import GC from './gc';
Fiber.GC = GC;

// DataComponent
import DataComponent from './data-component';
Fiber.DataComponent = DataComponent;

// UIComponent
import UIComponent from './ui-component';
Fiber.UIComponent = UIComponent;

// eventPool
import { EventPool, DataEventPool, getOrCreateEventPool, detachEventPool } from './event-pool';
Fiber.namespace = getOrCreateEventPool;

// events
import { Event, defineEvent, defineEventType, basicEvent } from './event';
Fiber.Event = Event;
Fiber.defineEvent = defineEvent;
Fiber.defineEventType = defineEventType;
Fiber.basicEvent = basicEvent;

// clone
import clone from './clone';
Fiber.clone = clone;

// DOM
import DOM from './DOM';
Fiber.DOM = DOM;

// Debugger
import Debugger from './debugger';
Fiber.Debugger = Debugger;

// System events
class System extends DataComponent {};
const _system = new System();
Fiber.System = getOrCreateEventPool('data/system');
Fiber.System.Ready = basicEvent().alias('System:Ready');

Fiber.app = startupScript => {
    startupScript();
    _system.on(Fiber.System).trigger(new Fiber.System.Ready());
};

export default Fiber;
