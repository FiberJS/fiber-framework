import { Event, basicEvent } from './event';
import { EventGateway } from './event-gateway';
import ReadOnly from './read-only';

export const DefinedEvent = basicEvent('Fiber:NameSpace:Defined');

export class NameSpace extends EventGateway {

    constructor(name, path) {
        super();
        this.name = name;
        this.path = path;
        this.element = this.createElement(name);
        this.children = {};
    }

    detach() {
        delete this.element;
        detachEventGateway(this.path);
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

    defineState(stateDefinition) {
        this.__state || (this.__state = new ReadOnly());
        this.state = this.__state.reader;
        Object.getOwnPropertyNames(stateDefinition).forEach((property) => {
            this.__state.addProperty(property);
            const setters = stateDefinition[property](this.__state.modifier);
            for(let i = 0; i < setters.length; i+=2) {
                this.addEventListener(setters[i], setters[i+1]);
            }
        });

        this.trigger(new DefinedEvent());
    }
}

const NameSpaceRoot = new NameSpace('data');

export function getNameSpaceByPath(path) {
    const poolPath = path.split('/').slice(1);
    let currentPath = 'data';
    let EventGateway = NameSpaceRoot;
    for(let poolName of poolPath) {
        currentPath += '/' + poolName;
        if(!EventGateway.children[poolName]) {
            const newPool = new NameSpace(poolName, currentPath);
            EventGateway.children[poolName] = newPool;
            EventGateway.element.appendChild(newPool.element);
        }
        EventGateway = EventGateway.children[poolName];
    }
    return EventGateway;
};

export function detachEventGateway(path) {
    const poolPath = path.split('/').slice(1);
    let EventGateway = NameSpaceRoot;
    const poolToDelete = poolPath.pop();
    for(let poolName of poolPath) {
        if(!EventGateway.children[poolName]) {
            return false;
        }
        EventGateway = EventGateway.children[poolName];
    }

    if(EventGateway.children[poolToDelete]) {
        delete EventGateway.children[poolToDelete];
    }

    return true;
};
