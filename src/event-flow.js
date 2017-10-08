import { Event } from './event';
import { EventGateway } from './event-gateway';

export class EventFlowType {

    constructor(...steps) {
        this.steps = steps;

        steps.forEach( step => {
            if(!(step.namespace instanceof EventGateway && step.event.EventName)) {
                throw new Error('wrong argument for Flow step!');
            }
        });
    }
}

export class EventFlow {

    constructor(flowType) {
        this.steps = flowType.steps;
        this.currentEvent = null;
        this.currentNameSpace = null;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    trigger(fiberEvent) {
        const step = this.steps.shift();

        if(!step) {
            this.reject(fiberEvent);
        }
        if(! fiberEvent instanceof step.event) {
            this.reject(fiberEvent);
        }

        this.currentEvent = fiberEvent;
        this.currentNameSpace = step.namespace;

        fiberEvent.flow = this;

        this.currentNameSpace.trigger(fiberEvent);

        if(!this.steps.length) {
            this.resolve(this);
        }

        return this.promise;
    }

    listen() {
        throw new Error("You can't set listeners on an EventFlow! (yet?)");
    }
}
