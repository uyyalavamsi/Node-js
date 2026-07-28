// Definition
// The Timer module in Node.js provides functions to schedule the execution of code after a delay or at regular intervals.
// It allows you to execute functions immediately, after a specified delay, or repeatedly at fixed time intervals.
/* What does it do
// 
// It provides functions such as:
// 
// setTimeout() - Executes a function after a specified delay.
// setInterval() - Executes a function repeatedly at a specified interval.
// setImmediate() - Executes a function as soon as possible after the current poll phase of the event loop completes.
// clearTimeout() - Cancels a timeout created by setTimeout().
// clearInterval() - Cancels an interval created by setInterval().Immediate() - Cancels an immediate created by setImmediate().
*/

//1.setTimeout example
import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeOut(): void {
    console.log("1. setTimeout started");

    setTimeout(() => {
        console.log("2.This statemnet is from the settimeout and it will run after 2 seconds");
    }, 2000);

    console.log("3.setTimeout ended")
}
//clearTimeout
function runClearTimeOut(): void {
    const timerId = setTimeout(() => {
        console.log("this message won't run");
    }, 1000);
    clearTimeout(timerId);
    console.log("4.timer cleared before execution");
}

// 3.setInterval example
// Executes a function repeatedly at a specified interval.
// so going to run the callback again and again with the interval of n seconds
function runSetIntervalExample(): void {
    console.log("5.setInterval started");
    let count = 0;
    const timerInterval = setInterval(() => {
        count++;
        console.log(`count is ${count}`);
        if (count === 5) {
            clearInterval(timerInterval);
            console.log("6.Set Interval stopped");
        }

    }, 1000)
}

/*
Definition
setImmediate() schedules a callback function to execute immediately 
after the current event loop iteration completes.
Real-World Uses
✅ Schedule work after the current task completes.
✅ Prevent blocking the event loop with long-running operations.
✅ Break large tasks into smaller chunks.
✅ Execute background work after sending a response  to the client.
*/

function runSetImmediateExample(): void {
    console.log("7.setImmediate started");
    setImmediate(() => {
        console.log("8.This statemnet is from the setImmediate and it will run after the current event loop iteration completes");
    })
    console.log("9.setImmediate ended")
}

/*
Promise-based Timers in Node.js
Definition

Promise-based timers are timer functions that return a Promise instead of using callback functions, 
allowing you to use async/await for cleaner asynchronous code.

*/

/*-----------------------------------------
The main difference is that normal timers use callback functions, whereas promise-based timers 
return Promises and work with async/await. Promise-based timers produce cleaner, more readable 
asynchronous code and help avoid callback nesting, making them the preferred choice in 
modern Node.js applications.
---------------------------------------------
*/
async function promisebasedtime(): Promise<void> {
    console.log("10. waiting for the promise based timer");

    await sleep(1500);

    console.log("11.Promise based timer is finished after the 1.5 sec...")

}

function runTimerDemo() {
    runSetTimeOut();
    runClearTimeOut();
    runSetIntervalExample();
    runSetImmediateExample();
    promisebasedtime();
}
runTimerDemo();
