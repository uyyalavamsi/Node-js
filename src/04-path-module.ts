/*
Definition

The path module is a built-in Node.js module that provides utilities for 
working with file and directory paths.

What does it do?
It helps you:
Join file and folder paths
Get file names and extensions
Convert relative paths to absolute paths
Normalize paths
Parse and format file paths

The path module is used to create, manipulate, and work with file and directory paths in a platform-independent way.
*/
import * as path from "node:path";

// pwd -- print working directory command in linux
//cwd -- current working directory command in nodejs

const projectroot = process.cwd();
console.log(projectroot);
// 1. path.join -  It joins path segments together in a platform-independent way.
// According to the os.platform() it will add the separator. if the os.platform() is 'win32' then it will add '\' and if the os.platform() is 'linux' or 'darwin' then it will add '/'
//it will create the path not the folder. and it will not check the either the file exist or not.
const joinedPath = path.join(projectroot, "src", "04-path-module.ts");
console.log(joinedPath);

// 2. path.resolve - It resolves a sequence of paths or path segments into an absolute path.
/*A relative path is a path relative to the current working directory. 
It does not start from the root of the file system.
*/
/*
An absolute path is the complete path from the root of the file system to a file or folder.
*/

const resolvedPath = path.resolve("src", "04-path-module.ts");
console.log(resolvedPath);

// 3. path.normalize - It normalizes a path by removing redundant separators and resolving up-level directory references.

const normalizedPath = path.normalize("folder/subfolder/../file.txt");
console.log(normalizedPath);

// 4. path.parse - It parses a path and returns an object with the path's components.

const parsedPath = path.parse("folder/subfolder/file.txt");
console.log(parsedPath);

// 5. path.basename - It returns the base name of a path.

const basename = path.basename("folder/subfolder/file.txt");
console.log(basename);

// 6. path.dirname - It returns the directory name of a path.

const dirname = path.dirname("folder/subfolder/file.txt");
console.log(dirname);

// 7. path.extname - It returns the extension of a path.

const extname = path.extname("folder/subfolder/file.txt");
console.log(extname);

