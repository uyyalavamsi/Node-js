/*

Definition
A callback is a function that is passed as an argument to another function 
and is executed later when a specific task is completed.
Inshort:
A callback is a function that you give to another function so it can call it back later.

Callbacks are commonly used in asynchronous operations where a task takes time to complete.
Real-world examples include reading and writing files, handling API requests,
database queries, timers (setTimeout and setInterval), event handling,
Express routes, and Socket.IO events.
A callback is executed automatically once the asynchronous operation finishes.
*/

import { error } from "node:console";
import { resolve } from "node:dns";

/*
type user={
    name:string,
    age:number,
    isStudent:boolean,
    address:{city:string,state:string}
}
    normal js 
    const user={
        name:"Atul",
        age:21,
        isStudent:true,
        address:{city:"patna",state:"bihar"}
    }
        even like we do like in the js 
        const user:user={
        name:"Atul",
        age:21,
        address:{city:"patna",state:"bihar"}
    }

    
  In JavaScript, objects are dynamic, so missing properties don't produce an error. 
  Accessing a missing property returns undefined. In TypeScript, if an object 
  is assigned a specific type, it must contain all the required properties; otherwise, 
  the compiler reports an error before the code runs.
In JavaScript, we directly create objects without defining their structure, 
so there's no compile-time type checking. In TypeScript, we use type (or interface) 
to define the structure of data first. The TypeScript compiler then ensures that objects 
follow that structure, helping catch errors before the code runs.
*/

type User = {
    id: number,
    name: string,
    character: "excellent" | "good" | "bad" | "worst"
}

const users: User[] = [
    {
        id: 1,
        name: "uv",
        character: "good"
    },
    {
        id: 2,
        name: "lokesh",
        character: "worst"
    },
    {
        id: 3,
        name: "harsha",
        character: "excellent"
    },
    {
        id: 4,
        name: "gopi",
        character: "bad"
    },
    {
        id: 5,
        name: "gana",
        character: "bad"
    }
]

/*
classic callback pattern
The classic Node.js callback pattern is an error-first callback pattern 
where the callback function always receives the error as the first argument 
and the result as the second argument.

function callback(error, result) {
    // Handle error or result
}
*/

function getUserById(
    userid: number,
    callback: (error: Error | null, user?: User) => void
): void {
    //one condition we are checking for that 
    const user = users.find((currentUser => currentUser.id === userid));

    if (!user) {
        callback(new Error(`user with the ${userid} is not found !`));
        return;
    }
    callback(null, user);
}

// getUserById(30, (error, user) => {
//     if (error) {
//         console.log(error.message);
//     }
//     console.log(user?.id, user?.name, user?.character);
// })

/*
What is Callback Hell?

Definition
Callback Hell is a situation where multiple asynchronous callbacks are nested inside one another, 
making the code difficult to read, understand, and maintain.
It is also called the "Pyramid of Doom" because the code keeps shifting to the right.
*/
// ------------------------------------------------------------------------------------------------------
/*
promise call back example fetching the data from the array if present

Note: Always reject a Promise with an `Error` object (e.g., `new Error("...")`)
instead of a plain string. This ensures that the stack trace is preserved
and error handling like `error instanceof Error` works correctly in `try-catch` blocks.
*/
function findUserByPromise(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((currentUser => currentUser.id === userId));
            if (!user) {
                reject(new Error(`userId ${userId} was not found`));
                return;
            }
            resolve(user);
        }, 1000)
    })
}
// findUserByPromise(2).then((user) => {
//     console.log("promise callack", user?.id, user?.name, user?.character);
// }).catch((error: Error) => {
//     console.log(error.message);
// })

// --------------------------------------------------------------------------------------------------
/*Async and await 

What is async?
Definition
async is a keyword used to declare a function that always returns a Promise.

In simple words:
An async function allows you to use await inside it and automatically wraps the return value in a Promise.

What is await?
Definition

await is a keyword used to pause the execution of an async function until a Promise is resolved or rejected.

In simple words:

await waits for a Promise to complete before moving to the next line of code.
*/

async function findUserByAsyncAwait(userId: number): Promise<void> {
    try {
        console.log("start");
        const user = await findUserByPromise(userId);
        console.log("Async/await", user?.id, user?.name, user?.character);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        console.log("async/await ERROR message", message);
    }
    finally {
        console.log("end");
    }
}

findUserByAsyncAwait(7);


