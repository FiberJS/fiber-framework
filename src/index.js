
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

// Namespace
import { NameSpace, DefinedEvent } from './namespace';
Fiber.namespace = (name) => NameSpace.get(name);
Fiber.NameSpace = {
    create: (name) => NameSpace.get(name),
    Defined: DefinedEvent
};

// events
import { Event, defineEvent, defineEventType, basicEvent } from './event';
Fiber.Event = Event;
Fiber.defineEvent = defineEvent;
Fiber.defineEventType = defineEventType;
Fiber.basicEvent = basicEvent;

// event-flows
import { EventFlowType } from './event-flow';
Fiber.EventFlow = {
    define: (...steps) => new EventFlowType(...steps),
};

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
Fiber.System = NameSpace.get('data/system');
Fiber.System.Ready = basicEvent('System:Ready');
const System = Fiber.DataComponent.attachTo(Fiber.System);

Fiber.app = startupScript => {
    startupScript();
    System.on(Fiber.System).trigger(new Fiber.System.Ready());
};

import { EventGateway } from './event-gateway';
import { registerSystemLoaded } from './global';
registerSystemLoaded({Fiber, NameSpace, EventGateway});

export default Fiber;
