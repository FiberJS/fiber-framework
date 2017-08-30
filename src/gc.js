const GC = {
    components: new Map(),
    listeners : new Map(),
    observers : new Map(),
    elementAttribute: 'flight-component-id',
};

GC.init = function() {
    this.observe(document.body);
    this.init = false;
};

GC.observe = function(element) {
    const observerId = (this.observers.size + 1).toString();

    if(element._GC_observerId) {
        return ;
    }

    element._GC_observerId = observerId;

    var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if(mutation.removedNodes) {
                mutation.removedNodes.forEach((node) => {
                    this.removeNode(node);
                });
            }
        });
    });

    observer.observe(element, {childList: true, subtree: true});

    this.observers.set(observerId, {
        element: element,
        observer: observer,
    });
};

GC.removeNode = function(element) {
    if(!element.querySelectorAll) return ;

    if(element._GC_observerId) {
        return ;
    }

    const processNode = (view) => {
        let componentId = view.attributes[this.elementAttribute].value;
        let component = this.components.get(componentId);

        component && this.destroy(component);
    };

    element.querySelectorAll(`[${this.elementAttribute}]`).forEach(processNode);
    if(element.attributes[this.elementAttribute]) {
        processNode(element);
    }
};

GC.registerComponent = function(component) {
    component.componentId = generateComponentId();
    this.components.set(component.componentId, component);
    this.listeners.set(component.componentId, []);

    component.view.setAttribute(this.elementAttribute, component.componentId);
    GC.init && GC.init();
};

GC.registerListener = function(component, element, event, callback) {
    if(!this.listeners.has(component.componentId)) return;

    this.listeners.get(component.componentId).push({
        element   : element,
        eventName : extractEventName(event),
        callback  : callback
    });
};

GC.destroy = function(component) {
    for(let listener of this.listeners.get(component.componentId)) {
        listener.element.removeEventListener(listener.eventName, listener.callback);
    }
    component.view = null;
    this.components.delete(component.componentId);
    this.listeners.delete(component.componentId);
};

export default GC;

function extractEventName(event) {
    return (typeof event == 'string')
        ? event
        : event.EventName;
}

let __id = 0;
// let __fullId = '';
function generateComponentId() {
    return (++__id).toString();
    // if(__id > 122) {
    //     __fullId = incrementStr(__fullId);
    //     __id = 97;
    // }
    // return __fullId + String.fromCharCode(__id);
}

function incrementStr(str) {
    for(let i = str.length - 1; i >=0; i--) {
        if(str[i] != 'z') {
            return str.substr(0, i) + String.fromCharCode(str.charCodeAt(i) + 1) + ('a'.repeat(str.length - i - 1));
        }
    }
    return 'a'.repeat(str.length + 1);
}
