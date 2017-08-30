import Fiber from './';

Fiber.Event.prototype.$$event = Fiber.Event.prototype.event;
Fiber.Event.prototype.event = function() {
    this.__proto__.lastTriggered = this;
    return this.$$event();
}
Fiber.Event.last = function() {
    return this.prototype.lastTriggered;
}
