# #Fiber

## Features
- event-driven architecture
- decoupled components
- super lightweight
- non-opinionated
- webpack compatible
- easily debuggable and testable
- smooth like a well done cappuccino :coffee:

## Based on FlightJS
Using the orininal drive behind FlightJS: to help you write highly scalable and maintainable code as a strong base for your applications. Flight's event driven architecture will help you to avoid design mistakes like **tight coupling**, **dependency-hell** (*you have to scroll a page of dependency imports to see your code*) and **wild wonders** (*magical behaviours too hard to follow and understand for common people*)

## But enhanced
- Less freetext events, more stability
- Using ES6, Webpack and modern debugging tools
- Features **state encapsulation** in namespaces, but you can use it with **Redux** or can write stateful components - the choice is yours to make

Using a shadow DOM to host data events makes communication between parts of the application easier to follow. Components don't rely solely on their position in the DOM anymore. By declaring clear namespaces for certain resources and their events, and joining them with an isolated state we can create a system that is easy to read, understand and maintain.

Compatible with **Domain Driven Design** - you can separate your layers of implementation to create reusable code that is more flexible to architecture or infrastructure changes.

Most frameworks are wasting lots of resources on dependency injection when the best way to tackle dependencies is to get rid of them as much as possible.

Another typical problem of modern frameworks is that they are trying to be the swiss-army-knife of all your problems - becoming too complex and restrictive in the process.
