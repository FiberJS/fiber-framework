import { EventPool, getOrCreateEventPool } from './event-pool';
import { EventFlowType, EventFlow } from './event-flow';

class DataComponent {
    constructor(...params) {
        this.init.apply(this, params);
    }

    init() {}
    listen() {}

    on(path) {
        if(path instanceof EventFlowType) {
            return this.flow(path);
        }

        return path instanceof EventPool || path instanceof EventFlow
            ? path
            : getOrCreateEventPool(path)
            ;
    }

    flow(flowType) {
        return new EventFlow(flowType);
    }

    static attachTo(eventPool) {
        const instance = new this();

        instance.eventPool = eventPool instanceof EventPool
            ? eventPool
            : getOrCreateEventPool(eventPool)
            ;

        instance.listen();

        return instance;
    }
}

export default DataComponent;
