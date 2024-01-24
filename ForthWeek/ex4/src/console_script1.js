/* ********* */
/* CommonsJS */
/* ********* */
const fs = require('fs-extra')
const { argv } = require('node:process');

/* **** */
/* ES6  */
/* **** */
// import fs from 'fs-extra';
// import { argv } from 'node:process';

/************************* */
function read_sync() {
    console.log(`\x1B[32mFirst line of "read_sync()" function executed"\x1B[0m`);
    let data = fs.readFileSync(argv[1]);
    console.log('\x1B[33mFinished loading file contents - contents are available in the \'data\' variable\x1B[0m');
    console.log(`\x1B[32mLast line of "read_sync()" function executed\x1B[0m`);
}

function read_async() {
    console.log(`\x1B[32mFirst line of "read_async()" function executed\x1B[0m`);
    fs.readFile(argv[1], (err, data) => {
        if (err) throw err;
        console.log('\x1B[33mFinished loading file contents - contents are available in the \'data\' variable\x1B[0m');
    });
    console.log(`\x1B[32mLast line of "read_async()" function executed\x1B[0m`);
}
/************************* */

console.clear()
console.log(`\x1B[31mSynchronous reading of file "${argv[1]}"\x1B[0m`);
read_sync();
console.log('------------------');
console.log(`\x1B[31mAsynchronous reading of file "${argv[1]}"\x1B[0m`);
read_async();
console.log('\x1B[34mThe last line of the script has been executed\x1B[0m');    