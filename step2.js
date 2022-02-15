"use strict";

const fsP = require("fs/promises");
const axios = require("axios");


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


/** Gets website HTML and prints it to the console. */

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.log(`Error fetching ${url}`);
        console.log(err.message);
        process.exit(1);
    }
}

const path = process.argv[2];
if (path.startsWith("http://") || path.startsWith("https://")) {
    webCat(path);
} else {
    cat(path);
}