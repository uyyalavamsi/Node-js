/*
=========================================
Node.js EventEmitter - Definitions & Notes
=========================================

1. Definition
   - EventEmitter is a class from the built-in 'events' module in Node.js.
   - It facilitates communication between objects in Node.js. 
   - It lies at the core of Node's Event-Driven Architecture, where many of its built-in modules (like Streams, HTTP, FS) inherit from or use it.

2. Core Mechanism (Observer / Pub-Sub Pattern)
   - Publishers (Event Emitters): Emit named events using the `emit()` method.
   - Subscribers (Listeners): Register interest in specific named events using the `on()` or `addListener()` methods.
   - When an event is emitted, all listeners attached to it are called synchronously in the order they were registered.

3. Why is it used?
   - Decoupling: Allows different parts of an application to communicate without having direct references to each other.
   - Asynchronous flow control: Responds to events as they occur (e.g., data arrival, connection success, error detection).

4. Key Methods
   - `on(event, listener)`: Adds a callback function (listener) that will be executed every time the event is emitted. (Alias: `addListener`).
   - `once(event, listener)`: Adds a one-time listener. After the first time the event is emitted, this listener is removed and then invoked.
   - `emit(event, [arg1], [arg2], ...)`: Synchronously calls each of the listeners registered for the event, in the order they were registered, passing the supplied arguments.
   - `off(event, listener)`: Removes the specified listener from the listener array for the event. (Alias: `removeListener`).
   - `removeAllListeners([event])`: Removes all listeners, or those of the specified event.
   - `setMaxListeners(n)`: Sets the maximum limit of listeners for a single event (default is 10). Exceeding this triggers a warning to prevent memory leaks.

5. Critical Concept: Synchronous Execution
   - By default, EventEmitter executes all listeners synchronously. 
   - The emitter does not wait for a listener to finish before calling the next one.
   - If a listener needs to perform asynchronous operations, it can use `setImmediate()`, `process.nextTick()`, or standard promises/async-await inside the callback function.

6. Critical Concept: Error Handling
   - If an EventEmitter encounters an error, it is standard practice to emit an 'error' event.
   - IMPORTANT: If an 'error' event is emitted and there are no listeners registered for it, Node.js will throw the error, print a stack trace, and crash the application.
   - Always attach a listener to the 'error' event on emitters to prevent application crashes.

7. Internal Events
   - 'newListener': Emitted before a listener is added to the emitter's internal array of listeners.
   - 'removeListener': Emitted after a listener is removed.

===========================================================
Node.js EventEmitter - Top Interview Questions & Answers
===========================================================

Q1: What is the EventEmitter in Node.js and why is it used?
A1: EventEmitter is a core class from Node's built-in 'events' module. It allows objects to emit named events that trigger registered callbacks (listeners). It forms the foundation of Node's Event-Driven, non-blocking I/O architecture. Many built-in modules like streams, HTTP servers, and file systems inherit from it.

Q2: Are event listeners executed synchronously or asynchronously by default? Why?
A2: They are executed synchronously in the order they were registered. This ensures proper sequencing of events and avoids race conditions or unnecessary CPU context switching. If you need asynchronous execution, you must explicitly wrap the listener code in process.nextTick(), setImmediate(), or use async/await.

Q3: What happens if an 'error' event is emitted but no listener is registered for it?
A3: If an 'error' event is emitted and there are no listeners registered, Node.js will throw the error, print the stack trace to stderr, and crash the process (exit code 1). To prevent this, always register at least one listener for the 'error' event.

Q4: What is the difference between `emitter.on()` and `emitter.once()`?
A4: `on()` registers a listener that will be called *every time* the event is emitted. `once()` registers a listener that will be called at most *once*; it is automatically deregistered immediately after the first time it is invoked.

Q5: How does the maximum listener limit work, and how do we prevent memory leaks?
A5: By default, an EventEmitter allows a maximum of 10 listeners per event to help detect memory leaks (e.g., adding listeners in a loop). Exceeding this prints a warning to the console. You can change this limit using `setMaxListeners(n)`. To prevent leaks, always remove listeners when they are no longer needed using `off()` or `removeListener()`.

Q6: How can you check the list of listeners or the listener count for a specific event?
A6: Use `emitter.listenerCount(eventName)` to get the number of registered listeners, and `emitter.listeners(eventName)` to retrieve a copy of the array of listener functions.

Q7: How do you register a listener that runs before other existing listeners (prepended)?
A7: Use `emitter.prependListener(eventName, listener)` or `emitter.prependOnceListener(eventName, listener)`. These insert the listener at the beginning of the listener array instead of appending it.

Q8: What are 'newListener' and 'removeListener' events?
A8: These are built-in events emitted by the EventEmitter itself:
    - 'newListener' is emitted *before* a listener is added to the internal array. Allows logic like checking or modifying listeners as they're added.
    - 'removeListener' is emitted *after* a listener is removed.
*/

import EventEmitter from "node:events";

const appEvent = new EventEmitter();

appEvent.on("login", () => {
    console.log("Welcome User");

})

// appEvent.emit("login");

type userRegisterPayload = {
    id: number,
    name: string
    email: string,
}

appEvent.on("registered", (user: userRegisterPayload) => {
    console.log(`Welcome to our platform ${user.name}`);

})
//multiple listeners
appEvent.on("registered", (user: userRegisterPayload) => {
    console.log(`Please verify your email ${user.email}`);

})
appEvent.on("registered", (user: userRegisterPayload) => {
    console.log(`your id is  ${user.id}`);

})
//once listeners
appEvent.once("application-started", () => {
    console.log("Application started");
})


function userRegister(): void {
    const user = {
        id: 1,
        name: "vamsi",
        email: "uyyalavamsi37@gmail.com"
    }
    appEvent.emit("registered", user);

}
appEvent.emit("application-started");
appEvent.emit("application-started");

userRegister();

// ============================================================
// Advanced/Interview Concepts Demonstration
// ============================================================

console.log("\n--- Demonstration of Q&A Concepts ---");

// 1. Error Handling Demo
const errorEmitter = new EventEmitter();
// Registering an error listener to prevent crashing
errorEmitter.on("error", (err) => {
    console.error(`[Caught Error Gracefully]: ${err.message}`);
});
console.log("Emitting an 'error' event:");
errorEmitter.emit("error", new Error("Something went wrong!"));

// 2. Prepend Listener Demo
const orderEmitter = new EventEmitter();
orderEmitter.on("greet", () => console.log("Hello (registered first, but runs second)"));
orderEmitter.prependListener("greet", () => console.log("Hey there! (registered second, but runs first)"));

console.log("\nEmitting 'greet' event to show execution order:");
orderEmitter.emit("greet");

// 3. Checking Listener Counts and Listeners
console.log(`\nListener count for 'registered' on appEvent: ${appEvent.listenerCount("registered")}`);
console.log("Listeners for 'registered':", appEvent.listeners("registered"));
