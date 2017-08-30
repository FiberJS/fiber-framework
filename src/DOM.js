import GC from './gc';

const DOM = {};

DOM.getElement = (element, root) => {
    return typeof(element) == 'string' ?
        (root || document).querySelector(element) : element;
};

DOM.render = (template, wrapper) => {
    if(template instanceof Element) {
        return template;
    }
    const parent = document.createElement(wrapper || 'div');
    parent.innerHTML = template;
    if(!wrapper && parent.childElementCount==1) {
        return parent.firstElementChild;
    }

    return parent;
};

DOM.renderWithComponents = (template, ...components) => {
    template = DOM.render(template);

    for(let component of components) {
        component.populate(template);
    }

    return template;
};

DOM.detach = (element) => {
    GC.observe(element);
    element.remove();
}

export default DOM;
