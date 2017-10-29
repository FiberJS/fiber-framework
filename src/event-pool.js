
class ListenerChain {
    constructor(listener, next = null) {
        this.listener = listener;
        this.next = next;
    }

    execute(event) {
        this.listener(event);
        if(this.next) {
            this.next.execute(event);
        }
    }

    add(listener) {
        let node = this;

        while(node.next) {
            node = node.next;
        }

        node.next = new ListenerChain(listener);
    }

    without(listener) {
        let root = this,
            node = root,
            prev = null;

        while(node) {
            if(node.listener == listener) {

                if(prev == null) {
                    root = node.next;
                } else {
                    prev.next = node.next;
                }

                return root;
            }

            prev = node;
            node = node.next;
        }

        return root;
    }

    static with(listener) {
        return new ListenerChain(listener);
    }
}

export class EventPool {
    constructor() {
        this.eventPool = new Map();
    }

    addEventListener(eventName, listener) {
        if(this.eventPool.has(eventName)) {
            this.eventPool.get(eventName).add(listener);
        } else {
            this.eventPool.set(eventName, ListenerChain.with(listener))
        }
    }

    removeEventListener(eventName, listener) {
        let chain = this.eventPool.get(eventName);

        if(chain) {
            let newChain = chain.without(listener);

            if(newChain) {
                this.eventPool.set(eventName, newChain);
            } else {
                this.eventPool.delete(eventName);
            }
        }
    }

    dispatchEvent(fiberEvent) {
        const chain = this.eventPool.get(fiberEvent.name);
        chain && chain.execute(fiberEvent);
    }
}
