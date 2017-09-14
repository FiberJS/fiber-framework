import DataComponent from './data-component';
import UIComponent from './ui-component';
import { EventPool } from './event-pool';

const Debugger = {};
let actor = null;

const triggeredStyle = 'font-weight: bold; color: navy;';
const eventStyle = 'font-weight: normal; color: red;';
const componentStyle = 'font-weight: bold; color: #2D602D;';
const normalStyle = 'font-weight: normal;';

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
    EventPool.prototype.trigger = function(fiberEvent) {
        console.log(`${tab()}#%c${fiberEvent.name} %ctriggered by ${actor.constructor.name}`, triggeredStyle, normalStyle);
        if(Debugger.showEvents) {
            console.log(fiberEvent);
        }
        ++EventPool.depth;
        return this.$$trigger(fiberEvent).then(() => --EventPool.depth);
    };

    EventPool.prototype.$$addEventListener = EventPool.prototype.addEventListener;
    EventPool.prototype.addEventListener = function(fiberEvent, handler) {
        let nativeEvent = (typeof fiberEvent == 'string');
        let eventName = nativeEvent ? fiberEvent : fiberEvent.EventName;
        let boundActor = actor.constructor.name;
        let boundView = actor.view;

        const debugHandler = function(event) {
            if(nativeEvent) {
                console.log(`${tab()}%c${eventName}%c was triggered on ${boundActor}`, triggeredStyle, normalStyle);
            } else {
                boundView && Debugger.showView
                    ? console.log(`${tab()}${boundActor} listening for %c${eventName}`, boundView, eventStyle)
                    : console.log(`${tab()}%c${boundActor}%c listening for %c${eventName}`, componentStyle, normalStyle, eventStyle)
                    ;
            }
            console.log(`${tab()} > calling ${boundActor}.${handlerToString(handler)}`);
            return handler(event);
        }
        return this.$$addEventListener(fiberEvent, debugHandler);
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

function tab() {
    return " ".repeat(EventPool.depth * 2);
}

export default Debugger;
