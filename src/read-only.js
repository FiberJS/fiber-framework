import { coldClone } from './clone';

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

    addProperty(name, value) {
        this.modifier[name] = coldClone(value);
        Object.defineProperty(this.reader, name, {
            get: () => this.modifier[name],
            // get: () => readOnly(this.modifier[name]),
            enumerable: true,
        });
    }
}

/*
    Performance tests show that proxies are slower than cloning on demand
*/

export default ReadOnly;
