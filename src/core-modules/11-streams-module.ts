/*
what is streams ?
A Stream is a way to process data piece by piece (chunks) instead of loading the entire data into memory at once.
Definition
A Stream is an object that lets you read or write data continuously in small pieces called chunks.
-----------------
Without Stream
-----------------
        Water Tank
            ↓
        Fill Entire Bucket
            ↓
          Drink

You wait until the entire bucket is full.

-----------------


-----------------
With Stream
-----------------
        Water Tank
            ↓
        Fill Small Glass
            ↓
          Drink
            ↓
        Fill Next Glass
            ↓
          Drink

Drink sip by sip as it comes.

why do we need streams ?
Memory Efficiency: For large files (e.g., 1GB video, 10GB database dump), reading the whole file into RAM can crash the server.

Performance: Processing starts immediately with the first chunk, rather than waiting for the entire file to load.

Better UX: For user uploads, you can start processing or compressing the file while it's still uploading.

Common Use Cases:

HTTP Requests/Responses (e.g., streaming a video file to a client)

Network Operations

Data Pipelines (transforming data from one format to another)



📌 EventEmitter and Streams
    Every Stream in Node.js is an EventEmitter.
    ReadStream and WriteStream inherit the features of the EventEmitter class.
    Because of this inheritance, streams can emit events and allow listeners to respond to those events.
    Common stream events include data, end, error, close, and finish.
📌 How Streams Use EventEmitter
    A stream continuously reads or writes data.
    Whenever an important action occurs, the stream emits an event.
    Developers register listeners using on() or once() to respond to these events.
    The application reacts automatically whenever an event is emitted.
📌 Who Emits the Events?
    Developers do not manually emit built-in stream events.
    Node.js internally emits events such as:
    data – when a new chunk is available.
    end – when all data has been read.
    error – when an error occurs.
    close – when the stream is closed.
    finish – when writing is completed.
📌 What is a Chunk?
    A chunk is a small piece of data processed by a stream.
    Large files are divided into multiple chunks instead of being processed all at once.
    Processing data in chunks improves memory efficiency and performance.
📌 Is chunk a Keyword?
    No.
    chunk is not a JavaScript keyword.
    chunk is not a Node.js keyword.
    It is simply a descriptive variable name commonly used to represent one piece of streamed data.
    Any valid variable name can be used instead of chunk.
📌 What is a Buffer?
    A Buffer is a temporary memory area used to store binary data.
    It is designed to handle raw binary data efficiently.
    Buffers are commonly used for files, images, videos, audio, PDFs, network packets, and other binary data.
📌 Relationship Between Buffer and Chunk
    Every chunk received from a stream is usually a Buffer object (unless an encoding is specified).
    A chunk represents the data being processed.
    The Buffer is the object that temporarily stores that chunk in memory.
📌 Relationship Between Buffer and Stream
    A Stream is responsible for transferring data.
    A Buffer temporarily stores each piece of that data.
    Streams internally use Buffers to process data chunk by chunk.
    Without Buffers, streams would not have a temporary place to hold the incoming or outgoing binary data.
📌 Data Flow in Streams
    Large File
        ↓
    Stream starts reading
        ↓
    Data is divided into chunks
        ↓
    Each chunk is stored in a Buffer
        ↓
    The stream emits a "data" event
        ↓
    The listener processes the Buffer
        ↓
    The process repeats until the file ends
        ↓
    The stream emits the "end" event
📌 Key Points
    Streams are built on top of EventEmitter.
    Streams internally emit events.
    Developers listen for these events using on() or once().
    Streams process data in chunks.
    Each chunk is stored in a Buffer by default.
    Buffers temporarily hold binary data in memory.
    This design makes Node.js fast, memory-efficient, and suitable for handling large-scale I/O operations.

📌 Types of Streams
    1. Readable Stream:
       - Used to read data from a source.
       - Events: 'data' (emitted when a chunk is available), 'end' (emitted when no more data to read), 'error' (emitted when an error occurs), 'close'.
       - Examples: fs.createReadStream(), process.stdin, http.IncomingMessage (server request, client response).
    2. Writable Stream:
       - Used to write data to a destination.
       - Events: 'drain' (writable buffer is empty/ready for more data), 'finish' (writable.end() called and all data flushed), 'error', 'close'.
       - Examples: fs.createWriteStream(), process.stdout, process.stderr, http.ServerResponse.
    3. Duplex Stream:
       - A stream that is both Readable and Writable, where both channels operate independently (e.g., TCP socket net.Socket).
    4. Transform Stream:
       - A type of Duplex stream where the output is computed based on the input. The input is transformed/modified before writing to the output.
       - Examples: zlib.createGzip() (compression), crypto.createCipheriv() (encryption).

📌 Key Stream Mechanisms
    - Backpressure: Occurs when the consumer (Writable stream) is slower than the producer (Readable stream). Node handles this by pausing the readable stream when the writable internal buffer exceeds its highWaterMark, and resuming it (via 'drain' event) once the buffer clears.
    - pipe() vs. pipeline():
      - pipe() connects a Readable to a Writable: `readable.pipe(writable)`. It does NOT auto-forward errors, which can leave streams open and cause memory leaks.
      - pipeline() chains multiple streams and handles errors, cleanup, and backpressure automatically.

===========================================================
Node.js Streams - Top Interview Questions & Answers
===========================================================

Q1: Why should you use streams instead of fs.readFile()?
A1: fs.readFile() loads the entire file into memory before processing, which can crash the application for large files. Streams process files chunk by chunk, keeping memory consumption low and constant regardless of the file size. Also, streams start processing immediately rather than waiting for the entire file to load.

Q2: What is backpressure and how is it managed?
A2: Backpressure is when a Writable stream cannot write as fast as the Readable stream is reading. When the internal buffer exceeds highWaterMark, writable.write() returns false, signaling the readable stream to pause. Once the buffer is cleared, the writable stream emits 'drain', signaling the readable stream to resume.

Q3: What is the difference between a Duplex and a Transform stream?
A3: In a Duplex stream, the read and write sides are independent (like a TCP connection where you can read and write separate data). In a Transform stream, the output is directly derived from the input (like gzip compression where input text is transformed to compressed bytes).
*/

import fs from "node:fs";
import path from "node:path";
import { Readable, Writable, Transform, pipeline } from "node:stream";
import { promisify } from "node:util";
import zlib from "node:zlib";

// Define file paths for examples
const tempInputPath = path.join(process.cwd(), "dist", "temp", "temp-input.txt");
const tempOutputPath = path.join(process.cwd(), "dist", "temp", "temp-output.txt.gz");

// Helper to create a dummy file for stream examples
function setupDummyFile() {
    fs.writeFileSync(tempInputPath, "Hello! ".repeat(50000) + "\nNode.js Streams are powerful!");
    console.log("Setup: Temporary input file created.");
}

// Helper to clean up files
function cleanupFiles() {
    try {
        if (fs.existsSync(tempInputPath)) fs.unlinkSync(tempInputPath);
        if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
        console.log("Cleanup: Temporary files removed.");
    } catch (err) {
        console.error("Cleanup error:", err);
    }
}

// 1. READABLE STREAM (Flowing Mode Example)
function runReadableExample() {
    console.log("\n--- Running Readable Stream Example ---");
    const readableStream = fs.createReadStream(tempInputPath, {
        encoding: "utf8",
        highWaterMark: 64 * 1024, // 64KB chunk size
    });

    let chunkCount = 0;

    readableStream.on("data", (chunk) => {
        chunkCount++;
        console.log(`Received chunk #${chunkCount} of size: ${chunk.length} characters`);
    });

    readableStream.on("end", () => {
        console.log(`Finished reading. Total chunks read: ${chunkCount}`);
    });

    readableStream.on("error", (error) => {
        console.error("Readable stream error:", error);
    });
}

// 2. WRITABLE STREAM Example
function runWritableExample() {
    console.log("\n--- Running Writable Stream Example ---");
    const tempWritePath = path.join(process.cwd(), "dist", "temp", "temp-write-demo.txt");
    const writableStream = fs.createWriteStream(tempWritePath, { encoding: "utf8" });

    writableStream.write("First line of data.\n");
    writableStream.write("Second line of data.\n");
    writableStream.end("Final line of data. Stream closing.\n");

    writableStream.on("finish", () => {
        console.log("Successfully wrote all data to:", tempWritePath);
        try {
            fs.unlinkSync(tempWritePath);
        } catch { }
    });

    writableStream.on("error", (error) => {
        console.error("Writable stream error:", error);
    });
}

// 3. TRANSFORM STREAM (Custom implementation: converts text to UPPERCASE)
class UppercaseTransform extends Transform {
    _transform(chunk: any, encoding: BufferEncoding, callback: Function) {
        try {
            const upperChunk = chunk.toString().toUpperCase();
            this.push(upperChunk);
            callback();
        } catch (err: any) {
            callback(err);
        }
    }
}

// 4. PIPELINE (Chaining Readable -> Transform -> Compress -> Writable with proper error handling)
const pipelinePromise = promisify(pipeline);

async function runPipelineExample() {
    console.log("\n--- Running Pipeline & Transform Example ---");
    setupDummyFile();

    const source = fs.createReadStream(tempInputPath);
    const uppercaseTransform = new UppercaseTransform();
    const compress = zlib.createGzip();
    const destination = fs.createWriteStream(tempOutputPath);

    try {
        await pipelinePromise(source, uppercaseTransform, compress, destination);
        console.log("Pipeline successfully executed!");
        console.log(`Original file size: ${fs.statSync(tempInputPath).size} bytes`);
        console.log(`Compressed & Uppercased file size: ${fs.statSync(tempOutputPath).size} bytes`);
    } catch (error) {
        console.error("Pipeline failed with error:", error);
    } finally {
        cleanupFiles();
    }
}

// Execute examples sequentially
async function runAll() {
    setupDummyFile();
    runReadableExample();
    runWritableExample();
    setTimeout(async () => {
        await runPipelineExample();
    }, 1000);
}

runAll();

/*
    Basic implementation of streams.

*/
// import { Readable,Transform, Writable} from "node:stream";
// import { pipeline } from "node:stream/promises";

const readableStream = Readable.from([
    "hello ",
    "world",
    " from nodejs streams"
]);
//callback(error, result)

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const text = chunk.toString();
        callback(null, text.toUpperCase());
    }
});

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        console.log("received", chunk.toString());
        callback(null);
    }
})

async function main(): Promise<void> {
    try {
        await pipeline(readableStream, uppercaseTransform, writableStream);
        console.log("Pipeline completed");
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.log("Pipeline failed", msg);
    }

}
main();


