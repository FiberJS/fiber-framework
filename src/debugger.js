import ComponentInterface from './component-interface';
import UIComponent from './ui-component';
import { EventGateway } from './event-gateway';
import { NameSpace } from './namespace';

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
    ComponentInterface.prototype.$$on = ComponentInterface.prototype.on;
    ComponentInterface.prototype.on = function(path) {
        actor = this;
        return this.$$on(path);
    };
    UIComponent.prototype.$$ui = UIComponent.prototype.ui;
    UIComponent.prototype.ui = function(path) {
        actor = this;
        return this.$$ui(path);
    };
    ComponentInterface.prototype.$$flow = ComponentInterface.prototype.flow;
    ComponentInterface.prototype.flow = function(eventFlow) {
        actor = this;
        return this.$$flow(eventFlow);
    };

    // EventGateway
    const debuggerTriggerSync = function(fiberEvent) {
        let poolName = this.name || 'DOM';
        let actorName = actor.displayName || actor.constructor.name;
        if(actorName.length == 1) {
            actorName = 'FiberJS';
        }

        console.log(`${tab()}%c${fiberEvent.name} %ctriggered on %c${poolName}%c by %c${actorName}`, triggeredStyle, normalStyle, boldStyle, normalStyle, boldStyle);
        if(Debugger.showEvents) {
            console.log(fiberEvent);
        }
        return this.$$triggerSync(fiberEvent);
    };
    EventGateway.prototype.$$triggerSync = EventGateway.prototype.triggerSync;
    EventGateway.prototype.triggerSync = debuggerTriggerSync;

    // NameSpace
    NameSpace.prototype.$$triggerSync = NameSpace.prototype.triggerSync;
    NameSpace.prototype.triggerSync = debuggerTriggerSync;

    EventGateway.prototype.$$addEventListener = EventGateway.prototype.addEventListener;
    EventGateway.prototype.addEventListener = function(fiberEvent, handler) {
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
    return " "; //.repeat(EventGateway.depth * 4);
}

export default Debugger;
