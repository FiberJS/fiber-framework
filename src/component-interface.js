import { EventPool, getOrCreateEventPool } from './event-pool';
import { EventFlowType, EventFlow } from './event-flow';

class ComponentInterface {

    constructor(...params) {
        this.init.apply(this, params);
    }

    /**
    * called from component's constructor to initialize component instance
    * parameters are passed from the contrusctor or from the attachTo call
    -- keeping it for now but so far it seems unecessary --
    */
    init() {}

    /**
    * called after NameSpace/DOM is attached to the component to set up
    * its listeners
    * never gets any parameters
    */
    listen() {}

    /**
    * access namespaces/flows from the component
    */
    on(target) {
        if(target instanceof EventFlowType) {
            return this.flow(target);
        }

        return target instanceof EventPool || target instanceof EventFlow
            ? target
            : getOrCreateEventPool(target)
            ;
    }

    /**
    * starts a new flow of the given FlowType
    */
    flow(flowType) {
        return new EventFlow(flowType);
    }
}

export default ComponentInterface;
