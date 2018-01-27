const triggerLogs = new Map();

import { afterSystemLoaded } from './global';
afterSystemLoaded( ({Fiber, NameSpace, EventGateway}) => {
    Fiber.Event.prototype.$$event = Fiber.Event.prototype.event;
    Fiber.Event.prototype.event = function() {
        if(!triggerLogs.has(this.name)) {
            triggerLogs.set(this.name, [this]);
        } else {
            triggerLogs.get(this.name).push(this);
        }
        return this.$$event();
    }
    Fiber.Event.last = function() {
        return this.prototype.lastTriggered;
    }

    NameSpace.prototype.$$triggerSync = NameSpace.prototype.triggerSync;
    NameSpace.prototype.triggerSync = function(fiberEvent) {
        fiberEvent.event();
        return this.$$triggerSync(fiberEvent);
    }
});

export function lastTriggeredOf(EventType) {
    const allTriggered = triggerLogs.get(EventType.EventName);

    return allTriggered
        ? allTriggered[allTriggered.length - 1]
        : null
        ;
}
