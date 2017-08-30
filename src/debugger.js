import DataComponent from './data-component';
import UIComponent from './ui-component';
import { EventPool } from './event-pool';

const Debugger = {};
let actor = null;

Debugger.init = function() {

    // .on() and .ui()
    UIComponent.prototype.$$on = UIComponent.prototype.on;
    UIComponent.prototype.on = function(path) {
        actor = this;
        return this.$$on(path);
    };
    UIComponent.prototype.$$ui = UIComponent.prototype.ui;
    UIComponent.prototype.ui = function(path) {
        actor = this;
        return this.$$ui(path);
    };
    DataComponent.prototype.$$on = DataComponent.prototype.on;
    DataComponent.prototype.on = function(path) {
        actor = this;
        return this.$$on(path);
    };

    // EventPool
    EventPool.prototype.$$trigger = EventPool.prototype.trigger;
    EventPool.prototype.trigger = function(flightEvent) {
        console.log(`${flightEvent.name} triggered by ${actor.constructor.name}`);
        if(Debugger.showEvents) {
            console.log(flightEvent);
        }
        return this.$$trigger(flightEvent);
    };

    EventPool.prototype.$$addEventListener = EventPool.prototype.addEventListener;
    EventPool.prototype.addEventListener = function(flightEvent, handler) {
        let nativeEvent = (typeof flightEvent == 'string');
        let eventName = nativeEvent ? flightEvent : flightEvent.EventName;
        let boundActor = actor.constructor.name;
        let boundView = actor.view;

        const debugHandler = function(event) {
            if(nativeEvent) {
                console.log(`${eventName} was triggered on ${boundActor}`);
            } else {
                boundView && Debugger.showView
                    ? console.log(`    ${boundActor} listening for ${eventName}`, boundView)
                    : console.log(`    ${boundActor} listening for ${eventName}`)
                    ;
            }
            console.log(`    calling ${boundActor}.${handlerToString(handler)}`);
            return handler(event);
        }
        return this.$$addEventListener(flightEvent, debugHandler);
    };
};

function handlerToString(handler) {
    if(handler.name) {
        return handler.name;
    }
    try {
        return handler.toString().match(/_this[0-9][.]([^(]*)[(]/).pop();
    } catch(e) {
        return 'Unknown';
    }
}

export default Debugger;
