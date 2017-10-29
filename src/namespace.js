import { Event, basicEvent } from './event';
import { EventGateway } from './event-gateway';
import { EventPool } from './event-pool';
import ReadOnly from './read-only';

export const DefinedEvent = basicEvent('Fiber:NameSpace:Defined');

export class NameSpace extends EventGateway {

    constructor(name) {
        super();
        this.name = name;
        this.eventPool = new EventPool();
    }

    defineState(stateDefinition) {
        this.__state || (this.__state = new ReadOnly());
        this.state = this.__state.reader;
        Object.getOwnPropertyNames(stateDefinition).forEach((property) => {
            this.__state.addProperty(property);
            const setters = stateDefinition[property](this.__state.modifier);
            for(let i = 0; i < setters.length; i+=2) {
                this.addEventListener(setters[i], setters[i+1]);
            }
        });

        this.trigger(new DefinedEvent());
    }

    addEventListener(fiberEvent, eventHandler) {
        const events = [];
        if(!(fiberEvent instanceof Event) && fiberEvent.namespace instanceof EventGateway) {
            return fiberEvent.namespace.addEventListener(
                fiberEvent.event,
                eventHandler
            );
        } else {
            this.eventPool.addEventListener(
                fiberEvent.EventName,
                eventHandler
            );
            events.push(fiberEvent.EventName);
        }
        return {
            callback: eventHandler,
            events: events,
            element: this.eventPool,
        };
    }

    triggerSync(fiberEvent) {
        return this.eventPool.dispatchEvent(fiberEvent);
    }

    static get(name) {
        this.namespaces || (this.namespaces = new Map());

        let namespace = this.namespaces.get(name);

        if(!namespace) {
            namespace = new NameSpace(name);
            this.namespaces.set(name, namespace);
        }
        return namespace;
    }
}
