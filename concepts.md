## Nodejs is a JS runtime environment.

JS runs outside of the browsers.

v8 engine.

Version need to install-----LTS(Long term support)

## NPM-node package manager
node -v

1 command 
npm init -y ------package.json
npm install -D typescript tsx @types/node(Dev dependancy)

# difference between dependacy and dev dependacy

dependencies
----->Required for your application to run.	
ex:npm install express
devDependencies
----->Required only while developing, testing, or building the application.
ex:npm install -D nodemon
folder 
always have one entry file or root file 
dont mix the service with the database queries
root file -->should have the information of entire source code.

core modules:
1.process object 
2.path module
3.file system module
4.event loop basics
5.callback promise async/await (Important Questions)
6.Event Emitters
7.Buffers
8.Crypto module
9.Error handling
10.Streams

Rest of the things like workerer threads,child process +Advanced level concepts will be on part 3.

# tsconfig.json is the configuration file for TypeScript. It tells the TypeScript compiler (tsc) how to compile your TypeScript code into JavaScript.

# Process Module
The process module is a built-in global object in Node.js that provides information about and control over the current Node.js process.

-->The number passed to process.exit() is called the exit code. It tells the operating system whether your program finished successfully or failed.
Means the program completed successfully.
Means the program exited because of an error.


2.Crypto Module.


# Buffers Module
A Buffer is a built-in Node.js class designed to handle raw binary data. Buffers allocate a fixed-size chunk of memory outside the V8 JavaScript engine's heap.

- **Buffer.alloc(size)**: Allocates a zero-filled buffer of `size` bytes.
- **Buffer.allocUnsafe(size)**: Allocates raw memory without initializing it. Slower but potentially contains old memory.
- **Buffer.from(data[, encoding])**: Creates a buffer from a string, array, or other buffer.
- **buf.toString([encoding])**: Decodes buffer data back into a readable string.
- **buf.subarray(start, end)**: Returns a subarray that shares the same underlying memory. Modifying it will modify the original buffer.
- **Buffer.concat(list)**: Combines multiple buffers into one.

# URL Module
The `url` module provides utilities for URL resolution, parsing, and formatting. Modern Node.js uses the WHATWG URL standard (global `URL` and `URLSearchParams` classes).

- **`new URL(urlString[, baseUrl])`**: Parses a URL string into structured properties (e.g., `.protocol`, `.hostname`, `.pathname`, `.searchParams`, `.hash`).
- **`url.searchParams`**: A helper class containing utility methods to read/manipulate query parameters:
  - **`get(key)`**: Reads the value of a query parameter (e.g., read `page` or `limit`).
  - **`set(key, value)`**: Sets/Updates a query parameter value.
  - **`has(key)`**: Checks if a key exists in parameters.
  - **`append(key, value)`**: Adds a new key-value pair.
  - **`delete(key)`**: Removes a key.
- **`new URLSearchParams()`**: Instantiates standalone query parameter objects. Can be constructed from:
  - **Query string**: `new URLSearchParams("?search=laptop&sort=asc")`
  - **Object**: `new URLSearchParams({ category: "electronics", brand: "apple" })`
  - **2D Array**: `new URLSearchParams([["tags", "node"], ["active", "true"]])`
- **Integrating Standalone URLSearchParams into a URL**:
  - **Overwrite**: `myUrl.search = newParams.toString()`
  - **Merge**: Iterate over parameters and apply them: `newParams.forEach((val, key) => myUrl.searchParams.set(key, val))`



