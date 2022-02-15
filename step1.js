"use strict";

const fsP = require("fs/promises");
const path = process.argv[2];


/** Reads a file and print to the console the contents. */

async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        console.log(contents);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

cat(path);