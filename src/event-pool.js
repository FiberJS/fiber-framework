
export class EventPool {
    trigger(flightEvent) {
        flightEvent.originalEvent = flightEvent.event();
        this.element.dispatchEvent(flightEvent.originalEvent);
    }

    listen(...listeners) {
        for(let i=0; i < listeners.length; i+=2) {
            this.addEventListener(listeners[i], listeners[i+1]);
        }
    }

    addEventListener(flightEvent, eventHandler) {
        let realHandler;
        const events = [];
        if(typeof flightEvent == 'string') {
            realHandler = eventHandler;
            flightEvent.trim().split(/\s/).forEach(strEvent => {
                events.push(strEvent);
                this.element.addEventListener(
                    strEvent,
                    realHandler
                );
            })
        } else {
            realHandler = event => eventHandler(event.detail);
            this.element.addEventListener(
                flightEvent.EventName,
                realHandler
            );
            events.push(flightEvent.EventName);
        }
        return {
            callback: realHandler,
            events: events
        };
    }

    defineState(stateDefinition) {
        this.__state || (this.__state = {});
        this.state || (this.state = {});
        Object.getOwnPropertyNames(stateDefinition).forEach((property) => {
            this.__state[property] = null;
            Object.defineProperty(this.state, property, {
                get: () => this.__state[property],
                enumerable: true,
            });
            const setters = stateDefinition[property](this.__state);
            for(let i = 0; i < setters.length; i+=2) {
                this.addEventListener(setters[i], setters[i+1]);
            }
        });
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

export class DataEventPool extends EventPool {
    constructor(name, path) {
        super();
        this.name = name;
        this.path = path;
        this.element = this.createElement(name);
        this.children = {};
    }

    detach() {
        delete this.element;
        detachEventPool(this.path);
    }

    createElement(name) {
        const idFromName = (name) => {
            return name.replace(/[^A-Za-z0-9/]/g,'').replace(/[/]/g, '-');
        };
        const elementFromName = (name) => {
            return name[0] == '#' ? 'item' : name.toLowerCase().replace(/[^a-z0-9]/g,'');
        };

        const element = document.createElement(elementFromName(name));
        element.id = idFromName(name);

        return element;
    }
};

const dataEventPoolRoot = new DataEventPool('data');

export function getOrCreateEventPool(path) {
    const poolPath = path.split('/').slice(1);
    let currentPath = 'data';
    let eventPool = dataEventPoolRoot;
    for(let poolName of poolPath) {
        currentPath += '/' + poolName;
        if(!eventPool.children[poolName]) {
            const newPool = new DataEventPool(poolName, currentPath);
            eventPool.children[poolName] = newPool;
            eventPool.element.appendChild(newPool.element);
        }
        eventPool = eventPool.children[poolName];
    }
    return eventPool;
};

export function detachEventPool(path) {
    const poolPath = path.split('/').slice(1);
    let eventPool = dataEventPoolRoot;
    const poolToDelete = poolPath.pop();
    for(let poolName of poolPath) {
        if(!eventPool.children[poolName]) {
            return false;
        }
        eventPool = eventPool.children[poolName];
    }

    if(eventPool.children[poolToDelete]) {
        delete eventPool.children[poolToDelete];
    }

    return true;
};
