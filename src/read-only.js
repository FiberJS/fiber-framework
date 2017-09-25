import clone from './clone';

class ReadOnly {
    constructor(reader) {
        this.reader = reader || {};
        this.modifier = {};
    }

    addProperty(name) {
        this.modifier[name] = null;
        Object.defineProperty(this.reader, name, {
            get: () => clone(this.modifier[name]),
            enumerable: true,
        });
    }
}

export default ReadOnly;
