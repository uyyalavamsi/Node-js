import { Buffer } from "node:buffer";
import { log } from "node:console";
/*
what is buffer?
A Buffer is a global class in Node.js (no import required, though you can use 
import { Buffer } from 'node:buffer') that represents a fixed-size chunk of memory 
allocated outside the V8 JavaScript engine's heap.

It stores raw binary data as a sequence of bytes (integers between 0 and 255, 
representing 8-bit octets).

1.Why We Need Buffers?
Because strings and arrays are not always sufficient for handling raw binary data,
such as:
✅ Images (JPEG, PNG, GIF)
✅ receving data from the network, it is in the form of buffers.(http)
✅ Audio (MP3, WAV, FLAC)
✅ Video files
✅ PDF documents
✅ Encrypted data
✅ File I/O (binary files)
2.Key Characteristics of Buffers
✅ Fixed-size: You must specify the buffer size when creating it.
✅ Raw binary data: Buffers store raw bytes, not text.
✅ Typed arrays: They behave like JavaScript Typed Arrays (ArrayBuffer). ✅ Off-heap storage: Located outside the V8 heap,
 allowing you to store large binary data without slowing down the garbage collector.
✅ Mutable: You can modify the bytes in a buffer.

string --human readbale text
buffer -- raw binary data (8-bit integers)
*/

const language = "NODE";
const textBuffer = Buffer.from(language, "utf-8");
console.log("Binary representation of the textBuffer is :", textBuffer);
console.log("Normal text from the buffer is :", textBuffer.toString());
console.log("length of the textBuffer is :", textBuffer.length);

//allocation method

const fixedBuffer = Buffer.alloc(5);
console.log("allocated buffer is :", fixedBuffer);
fixedBuffer.write('API');
console.log("after writing data into buffer is :", fixedBuffer);
console.log(fixedBuffer.toString());
//what if i write more than the fixed size
fixedBuffer.write('rapdatasdasd');
console.log("after writing data into buffer is :", fixedBuffer);
console.log(fixedBuffer.toString());

//we can take chunks of data individually and concat to one 
const chunks = [
    Buffer.from("hello "),
    Buffer.from("how are"),
    Buffer.from("you ")
];
console.log("Actually buffers are :", chunks);
const textChunks = Buffer.concat(chunks);
console.log("chunks are :", textChunks);
console.log("the string concat is : ", textChunks.toString());

// 1. Buffer.allocUnsafe(size)
console.log("\n--- allocUnsafe Example ---");
const unsafeBuf = Buffer.allocUnsafe(10);
console.log("Unsafe Buffer content (may contain garbage data):", unsafeBuf);
unsafeBuf.fill(0);
console.log("Unsafe Buffer after fill(0):", unsafeBuf);

// 2. Sharing Memory (subarray) vs Copying (copy)
console.log("\n--- Sharing Memory vs Copying Example ---");
const original = Buffer.from("JavaScript");

// Scenario A: Subarray (shares memory)
const sub = original.subarray(0, 4); // "Java"
sub.write("Type");
console.log("Original after subarray edit:", original.toString()); // "TypeScript"

// Scenario B: Copy (independent memory)
const originalAgain = Buffer.from("JavaScript");
const target = Buffer.alloc(4);
originalAgain.copy(target, 0, 0, 4); // copy "Java"
target.write("Type");
console.log("Original after copy edit (remains same):", originalAgain.toString()); // "JavaScript"
console.log("Target copy after edit:", target.toString()); // "Type"

// 3. String Length vs Buffer Byte Length
console.log("\n--- String Length vs Buffer Byte Length ---");
const rocket = "🚀";
console.log("String character length:", rocket.length); // 2 (due to UTF-16 surrogate pairs in JS)
console.log("Buffer byte length:", Buffer.byteLength(rocket)); // 4 (UTF-8 bytes)

// 4. Encodings (Hex and Base64)
console.log("\n--- Encodings Example ---");
const secret = "TopSecret123";
const secretBuffer = Buffer.from(secret, "utf-8");
const base64String = secretBuffer.toString("base64");
console.log("Base64 representation:", base64String);

const decodedBuffer = Buffer.from(base64String, "base64");
console.log("Decoded back to text:", decodedBuffer.toString("utf-8"));

// 5. Reading & Writing Binary Numbers
console.log("\n--- Reading & Writing Binary Numbers ---");
const numBuffer = Buffer.alloc(4);
numBuffer.writeUInt32BE(1024, 0); // 32-bit integer in Big Endian
console.log("Binary representation of 1024:", numBuffer);
const num = numBuffer.readUInt32BE(0);
console.log("Read integer back:", num); // 1024


