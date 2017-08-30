import {EventPool, getOrCreateEventPool} from './event-pool';

class DataComponent {
    constructor(...params) {
        this.init.apply(this, params);
    }

    init() {}

    on(path) {
        return path instanceof EventPool
            ? path
            : getOrCreateEventPool(path)
            ;
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
