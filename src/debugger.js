import DataComponent from './data-component';
import UIComponent from './ui-component';
import { EventPool } from './event-pool';

const Debugger = {};
let actor = null;

const boldStyle = 'font-weight: bold; color: black;';
const triggeredStyle = 'font-weight: bold; color: navy;';
const eventStyle = 'font-weight: normal; color: red;';
const componentStyle = 'font-weight: bold; color: #2D602D;';
const handlerStyle = 'font-weight: bold; color: #d9534f;';
const normalStyle = 'font-weight: normal;';

Debugger.init = function() {

    // .on(), .ui() and .flow()
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
    UIComponent.prototype.$$flow = UIComponent.prototype.flow;
    UIComponent.prototype.flow = function(eventFlow) {
        actor = this;
        return this.$$flow(eventFlow);
    };
    DataComponent.prototype.$$on = DataComponent.prototype.on;
    DataComponent.prototype.on = function(path) {
        actor = this;
        return this.$$on(path);
    };
    DataComponent.prototype.$$flow = DataComponent.prototype.flow;
    DataComponent.prototype.flow = function(eventFlow) {
        actor = this;
        return this.$$flow(eventFlow);
    };

    // EventPool
    EventPool.prototype.$$trigger = EventPool.prototype.trigger;
    EventPool.prototype.trigger = function(fiberEvent) {
        let poolName = this.name && `data/${this.name}` || 'DOM';
        let actorName = actor.constructor.name;
        if(actorName.length == 1) {
            actorName = 'FiberJS';
        }

        console.log(`${tab()}%c${fiberEvent.name} %ctriggered on %c${poolName}%c by %c${actorName}`, triggeredStyle, normalStyle, boldStyle, normalStyle, boldStyle);
        if(Debugger.showEvents) {
            console.log(fiberEvent);
        }
        return this.$$trigger(fiberEvent);
    };

    EventPool.prototype.$$addEventListener = EventPool.prototype.addEventListener;
    EventPool.prototype.addEventListener = function(fiberEvent, handler) {
        let nativeEvent = (typeof fiberEvent == 'string');
        let eventName = nativeEvent ? fiberEvent : fiberEvent.EventName;
        let boundActor = actor.constructor.name;
        let boundView = actor.view;

        const debugHandler = function(event) {
            if(nativeEvent) {
                console.log(`${tab()}%c${eventName.replace(' ', '/')}%c was triggered on ${boundActor}`, triggeredStyle, normalStyle);
            } else {
                boundView && Debugger.showView
                    ? console.log(`${tab()}${boundActor} listening for %c${eventName}`, boundView, eventStyle)
                    : console.log(`${tab()}%c${boundActor}%c listening for %c${eventName}`, componentStyle, normalStyle, eventStyle)
                    ;
            }
            console.log(`${tab()}%c${handlerToString(handler)}%c is called by ${boundActor}`, handlerStyle, normalStyle);
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
        return '[inline method]';
    }
}

function tab() {
    return " ".repeat(EventPool.depth * 4);
}

export default Debugger;
