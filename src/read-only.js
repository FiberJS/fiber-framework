import clone from './clone';

export function readOnly(original) {
    return original instanceof Object
        ? new Proxy(original, {
            get: function(target, property) {
                return readOnly(target[property]);
            },
            set: function() {
                return true;
            }
        })
        : original
        ;
}

class ReadOnly {
    constructor(reader) {
        this.reader = reader || {};
        this.modifier = {};
    }

    addProperty(name) {
        this.modifier[name] = null;
        Object.defineProperty(this.reader, name, {
            get: () => clone(this.modifier[name]),
            // get: () => readOnly(this.modifier[name]),
            enumerable: true,
        });
    }
}

/*
    Performance tests show that proxies are slower than cloning on demand
*/

export default ReadOnly;
