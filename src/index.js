
const Flight = {};
export default Flight;

// garbage Collector
import GC from './gc';
Flight.GC = GC;

// DataComponent
import DataComponent from './data-component';
Flight.DataComponent = DataComponent;

// UIComponent
import UIComponent from './ui-component';
Flight.UIComponent = UIComponent;

// eventPool
import { EventPool, DataEventPool, getOrCreateEventPool, detachEventPool } from './event-pool';
Flight.namespace = getOrCreateEventPool;

// events
import { Event, defineEvent, defineEventType, basicEvent } from './event';
Flight.Event = Event;
Flight.defineEvent = defineEvent;
Flight.defineEventType = defineEventType;
Flight.basicEvent = basicEvent;

// clone
import clone from './clone';
Flight.clone = clone;

// DOM
import DOM from './DOM';
Flight.DOM = DOM;

// Debugger
import Debugger from './debugger';
Flight.Debugger = Debugger;

// System events
class System extends DataComponent {};
const _system = new System();
Flight.System = getOrCreateEventPool('data/system');
Flight.System.Ready = basicEvent().alias('System:Ready');

Flight.app = startupScript => {
    startupScript();
    _system.on(Flight.System).trigger(new Flight.System.Ready());
};
