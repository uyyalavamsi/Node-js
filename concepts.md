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
