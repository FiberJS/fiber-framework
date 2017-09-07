import clone from './clone';
import { Optional } from './domain';

let eventId = 0;

export class Event{
    constructor() {
        this.name = this.constructor.EventName;
    }

    event() {
        return new CustomEvent(this.name, {
            detail     : this,
            bubbles    : !this.constructor._cancelBubble,
            cancelable : true
        });
    }

    stopPropagation() {
        this.originalEvent && this.originalEvent.stopPropagation();
    }

    preventDefault() {
        this.originalEvent && this.originalEvent.preventDefault();
    }

    static bubbles(bubbles) {
        this._cancelBubble = !bubbles;
        return this;
    }

    static alias(name) {
        this.EventName = name;
        return this;
    }
}

class EventAttributeError extends Error {
    constructor(event, name, value, ParamType) {
        if(ParamType) {
            super(`Type mismatch for Event '${event.name}' for attribute '${name}'`);
        } else {
            super(`Unexpected parameter for Event '${event.name}'`);
        }
        this.event = event;
        this.name = name;
        this.value = value;
        this.type = ParamType;
    }
}
export function defineEventType(descriptor) {
    const propNames = Object.getOwnPropertyNames(descriptor);
    const DefinedEventClass = class extends Event {
        constructor(...params) {
            super();
            for(let i = 0; i < params.length; i++) {
                const paramName = propNames[i];
                if(paramName === undefined || descriptor[paramName] === undefined) {
                    throw new EventAttributeError(this, paramName, params[i]);
                }
                const [ optional, ParamType ] = (
                    Optional.isOptional(descriptor[paramName])
                    ? [ true, descriptor[paramName].value ]
                    : [ false, descriptor[paramName] ]
                );

                if(optional && !params[i]) {
                    // (this)[paramName] = null;
                }
                else if(ParamType == Number || ParamType == String || ParamType == Boolean) {
                    (this)[paramName] = new ParamType(params[i]).valueOf();
                }
                else if(ParamType instanceof Object && !(params[i] instanceof ParamType)) {
                    throw new EventAttributeError(this, paramName, params[i], ParamType);
                }
                else {
                    (this)[paramName] = clone(params[i]);
                }
            }
        }
    };
    return DefinedEventClass;
};

export function eventOfType(EventType) {
    return (
        class extends EventType {}
    ).alias(`Event${++eventId}`);
};

export function basicEvent() {
    return (
        class extends Event {}
    ).alias(`Event${++eventId}`);
};

export function defineEvent(EventType, alias) {
    return eventOfType(EventType).alias(alias);
};
