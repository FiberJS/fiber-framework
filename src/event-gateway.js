export class EventGateway {
    trigger(fiberEvent) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.triggerSync(fiberEvent)), 0);
        });
    }

    triggerSync(fiberEvent) {
        return this.element.dispatchEvent(fiberEvent.event());
    }

    listen(...listeners) {
        for(let i=0; i < listeners.length; i+=2) {
            this.addEventListener(listeners[i], listeners[i+1]);
        }
    }

    addEventListener(fiberEvent, eventHandler) {
        let realHandler;
        const events = [];
        if(typeof fiberEvent == 'string') {
            realHandler = eventHandler;
            fiberEvent.trim().split(/\s/).forEach(strEvent => {
                events.push(strEvent);
                this.element.addEventListener(
                    strEvent,
                    realHandler
                );
            })
        } else if(!(fiberEvent instanceof Event) && fiberEvent.namespace instanceof EventGateway) {
            realHandler = event => eventHandler(event.detail);
            fiberEvent.namespace.element.addEventListener(
                fiberEvent.event.EventName,
                realHandler
            );
            events.push(fiberEvent.EventName);
        } else {
            realHandler = event => eventHandler(event.detail);
            this.element.addEventListener(
                fiberEvent.EventName,
                realHandler
            );
            events.push(fiberEvent.EventName);
        }
        return {
            callback: realHandler,
            events: events
        };
    }

    static forElement(element, component) {
        let instance = new this();

        instance.name = component && component.constructor.name;
        instance.element = element;

        return instance;
    }

    static forComponent(component) {
        let instance = new this();

        instance.name = component.constructor.name;
        instance.element = component.view;

        return instance;
    }

}
