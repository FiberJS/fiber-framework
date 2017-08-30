import Flight from './';

Flight.Event.prototype.$$event = Flight.Event.prototype.event;
Flight.Event.prototype.event = function() {
    this.__proto__.lastTriggered = this;
    return this.$$event();
}
Flight.Event.last = function() {
    return this.prototype.lastTriggered;
}
