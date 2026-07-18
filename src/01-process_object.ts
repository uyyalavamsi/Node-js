
//env variables
//read backend port from the env 
//read secrets
//command line arguments
//exit codes
//process lifecycle events.

const node_env = process.env.NODE_ENV ?? "development";
/*bad  coding 
const PORT =3000;
*/

const PORT = Number(process.env.PORT) || 3000;
// console.log(node_env);

const command = process.argv[2] ?? "start";
const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash");
//final log or final cleanup


function runApp(): void {
    console.log({ command });
    if (shouldFail) {
        console.error(`Application is failing as requested`);
        process.exit(1);
    }
    if (shouldCrash) {
        throw new Error(`Application is crashing as requested`);
    }
    console.log(`Application is running`);
}
runApp();

process.on('exit', (code) => {
    console.log(`Process exited with code : ${code}`);
});
process.on('beforeExit', (code) => {
    console.log(`Process about to exit with code : ${code}`);
});
//process.env values always be either String or undefined.
