import ComponentInterface from './component-interface';
import { EventGateway } from './event-gateway';
import { getNameSpaceByPath } from './namespace';
import DOM from './DOM';
import GC from './gc';

class UIComponent extends ComponentInterface {

    get view() {
        return this._view;
    }

    set view(element) {
        this._view = element;
        this.getNameSpaceByPath().element = element;
        if(element) {
            GC.registerComponent(this);
        }
    }

    render() {
        if(this.constructor.template) {
            this.view = DOM.render(this.constructor.template);
        }

        this.listen();

        return this.view;
    }

    getNameSpaceByPath() {
        return this.EventGateway || (this.EventGateway = EventGateway.forComponent(this));
    }

    on(target) {
        target = super.on(target);

        return target instanceof EventGateway
            ? new EventGatewayAccessor(this, target)
            : target
            ;
    }

    ui(query) {
        let element = DOM.getElement(query || this.view, this.view);
        return element
            ? new EventGatewayAccessor(this, EventGateway.forElement(element, this))
            : null
            ;
    }

    get namespace() {
        return this.getNameSpaceByPath();
    }

    static elementName() {
        return this.name
            .replace('Component','')
            .replace(/[A-Z]/g, '-$&')
            .toLowerCase().substr(1);
    }

    static withTemplate(template) {
        return class extends this {
            static __setTemplate(template) {
                this.template = template;
                return this;
            }
        }.__setTemplate(template);
    }

    static attachTo(element, ...params) {
        element = DOM.getElement(element);

        const instance = new this(...params);
        instance._attached = true;

        const renderedTemplate = this.template
            ? DOM.render(this.template)
            : null
            ;

        if(!renderedTemplate) {
            instance.view = element;
        } else if(renderedTemplate.tagName == element.tagName) {
            element.replaceWith(renderedTemplate);
            instance.view = renderedTemplate;
        } else {
            instance.view = element;
            instance.view.append(renderedTemplate);
        }
        instance.listen();

        return instance;
    }

    static populate(parentElement) {
        if(! parentElement instanceof Element) {
            return false;
        }

        let elements = parentElement.querySelectorAll(this.elementName());
        if(parentElement.tagName.toLowerCase() == this.elementName()) {
            elements = [parentElement];
        }
        elements.forEach((element) => {
            this.attachTo(element);
        });

        return elements;
    }
}

class EventGatewayAccessor {
    constructor(component, pool) {
        this.component = component;
        this.EventGateway = pool;
    }

    listen(...listeners) {
        console.log(...listeners);
        for(let i = 0; i < listeners.length; i += 2) {
            const listener = this.EventGateway.addEventListener(listeners[i], listeners[i+1]);
            listener.events.forEach(
                event => GC.registerListener(this.component, listener.element, event, listener.callback)
            );
        }
    }

    trigger(event) {
        return this.EventGateway.trigger(event);
    }

    triggerSync(event) {
        return this.EventGateway.triggerSync(event);
    }
}

export default UIComponent;
