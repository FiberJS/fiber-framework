import ComponentInterface from './component-interface';
import { EventPool, getOrCreateEventPool } from './event-pool';

class DataComponent extends ComponentInterface{

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
