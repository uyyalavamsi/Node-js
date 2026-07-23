import path from "node:path";
import fs from "node:fs";
import { resolve } from "node:dns";
import fsPromises from 'node:fs/promises';

const DEMO_FILE_PATH = path.join(process.cwd(), 'File-System', 'fs-Demo');
// output be like /Users/atul/Desktop/Node/File-System/fs-Demo

const SYNC_FILE_PATH = path.join(DEMO_FILE_PATH, 'sync-node.txt');
const CALLBACK_FILE_PATH = path.join(DEMO_FILE_PATH, 'callback-node.txt');
const PROMISE_FILE_PATH = path.join(DEMO_FILE_PATH, 'promise-node.txt');

type FileResult = {
    style: string,
    filename: string,
    content: string,
    sizeInBytes: number

}
function ensureDemoFolderExists(): void {
    if (!fs.existsSync(DEMO_FILE_PATH)) {
        fs.mkdirSync(DEMO_FILE_PATH, { recursive: true })
    }
}
/*

FS Module (fs) in Node.js
Definition

The fs (File System) module is a built-in Node.js module used to create, read, update, delete,
rename, and manage files and directories on the file system.
Real-World Uses
✅ Read configuration files (config.json)
✅ Upload and store user files
✅ Generate log files
✅ Read/write CSV or JSON data
✅ Create reports
✅ Manage folders
✅ Delete temporary files
✅ Backup data
*/
// ----------------------------------------------------------------------------------------------
/* fs API Types
1.sync apis
2.promise based apis
3.callback based apis
*/
/* Synchronous APIs should be used for startup tasks, configuration loading,
and small scripts where blocking is acceptable.
Callback-based APIs are mainly used in legacy Node.js code.
Promise-based APIs are recommended for modern applications because they work with async/await,
don't block the event loop, and allow the server to handle multiple requests efficiently.
*/

//1-----------------------------------------------------------------------------------------------------
/* What are Synchronous APIs in fs?
Definition
Synchronous APIs execute tasks one at a time and block the execution of the program until the 
current operation is completed.
The program waits for the file operation to finish before executing the next line of code.
*/

function runSyncExample(): FileResult {
    //write content into the file 
    fs.writeFileSync(SYNC_FILE_PATH, "Synchronous file writiing demonstration ", "utf-8");
    fs.appendFileSync(SYNC_FILE_PATH, "This text is ignored here.", "utf-8");
    const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");
    const stats = fs.statSync(SYNC_FILE_PATH);
    //statsync MEANS IT WILL GIVE THE SIZEOF BYTES IT WILL GIVE THE INFORMATION ABOUT THE FILE. so in this one it will give the information of the file
    // like how much soze in bytes like .size
    return {
        style: "sync",
        filename: path.basename(SYNC_FILE_PATH),
        content,
        sizeInBytes: stats.size
    }

}
// Now we are creating the allback hell example 

function runCallbackExample(): Promise<FileResult> {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            CALLBACK_FILE_PATH,
            "Created using the callback function.",
            "utf-8",
            (writeError) => {
                if (writeError) {
                    reject(writeError);
                    return;
                }
                fs.appendFile(
                    CALLBACK_FILE_PATH,
                    " This text is appended ",
                    "utf-8",
                    (appendError) => {
                        if (appendError) {
                            reject(appendError);
                            return;
                        }
                        fs.readFile(
                            CALLBACK_FILE_PATH,
                            "utf-8",
                            (readError, content) => {
                                if (readError) {
                                    reject(readError);
                                    return;
                                }
                                fs.stat(
                                    CALLBACK_FILE_PATH,
                                    (statError, stats) => {
                                        if (statError) {
                                            reject(statError);
                                            return;
                                        }
                                        resolve({
                                            style: "callback",
                                            filename: path.basename(CALLBACK_FILE_PATH),
                                            content: content,
                                            sizeInBytes: stats.size
                                        });
                                    }
                                );
                            }
                        )
                    }
                )
            })
    })
}

async function runpromiseExample(): Promise<FileResult> {
    await fsPromises.writeFile(
        PROMISE_FILE_PATH,
        "this is promise based file system.",
        "utf-8");
    await fsPromises.appendFile(PROMISE_FILE_PATH, "this is appended");
    const content = await fsPromises.readFile(PROMISE_FILE_PATH, "utf-8");
    const stats = await fsPromises.stat(PROMISE_FILE_PATH);
    return {
        style: "promise",
        filename: path.basename(PROMISE_FILE_PATH),
        content: content,
        sizeInBytes: stats.size
    }
}
async function main(): Promise<void> {
    try {
        ensureDemoFolderExists()
        const syncResult = runSyncExample();
        console.log("sync result", syncResult);

        const callbackResult = await runCallbackExample();
        console.log("callback result", callbackResult);

        const promiseResult = await runpromiseExample();
        console.log("promise result", promiseResult);

    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown ";
        console.log("file system error", message);


    }
}
main();