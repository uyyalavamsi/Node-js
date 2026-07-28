/* The os module is a built-in Node.js module that provides 
information about the operating system and its resources.

The os module is used to retrieve information about the operating system 
and the environment where your Node.js application is running.

It allows your Node.js application to access system-related information such as:

Operating system details
CPU information
Memory usage
Current user information
Network interfaces
System uptime
Temporary directory
Home directory
*/

import * as os from "node:os";

function runOsDemo(): void {
    console.log("OS platform is : ", os.platform());
    console.log("architecture :", os.arch());//it will give the os architecture like Nodejs binary was complied arm64 or arm,loong64,ia32,mips
    console.log("type of os: ", os.type());
    console.log("os release", os.release());
    // os.release() returns the release (version) of the operating system's kernel that your
    //  Node.js application is running on.
    console.log("Home directory :", os.homedir());
    console.log("temporary directory :", os.tmpdir());  // The tempdir() method in the os module returns the path of the system's temporary directory. 
    console.log("total memory", os.totalmem());
    console.log("total memory in MB :", os.totalmem() / 1024 / 1024);
    console.log("total memory in GB :", os.totalmem() / 1024 / 1024 / 1024);
    console.log("free memory :", os.freemem());
    console.log("free memory in MB :", os.freemem() / 1024 / 1024);
    console.log("free memory in GB :", os.freemem() / 1024 / 1024 / 1024);
    console.log("Uptime :", os.uptime());
    console.log("Uptime in hours :", os.uptime() / 60 / 60);
    console.log("Uptime in minutes :", os.uptime() / 60);
    console.log("Uptime in seconds :", os.uptime());
    console.log("Uptime in milliseconds :", os.uptime() / 1000);
    console.log("OS version :", os.version());
    console.log("OS type :", os.type());
    console.log("OS architecture :", os.arch());
    console.log("OS platform :", os.platform());
    console.log("OS release :", os.release());
    console.log("OS total memory :", os.totalmem());
    console.log("OS free memory :", os.freemem());
    console.log("OS tmpdir :", os.tmpdir());
    console.log("OS homedir :", os.homedir());
    // console.log("OS cpus :", os.cpus());
    const cpus = os.cpus();
    console.log(cpus.length);
    if (cpus.length > 0) {
        console.log("cpu model ", cpus[0].model, cpus[0].speed, cpus[0].times);
    }
    console.log("OS network interfaces :", os.networkInterfaces());
}

runOsDemo();

