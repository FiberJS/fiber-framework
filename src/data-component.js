import ComponentInterface from './component-interface';
import { EventGateway } from './event-gateway';
import { getNameSpaceByPath } from './namespace';

class DataComponent extends ComponentInterface{

    static attachTo(target) {
        const instance = new this();

        instance.EventGateway = target instanceof EventGateway
            ? target
            : getNameSpaceByPath(target)
            ;

        instance.listen();

        return instance;
    }

    get namespace() {
        return this.EventGateway;
    }

}

export default DataComponent;
