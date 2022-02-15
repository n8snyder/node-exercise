"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
let inPath;
let outFile;


/** Reads a file and print to the console the contents. */

async function cat(path, outFile = "") {
    let contents;
    try {
        contents = await fsP.readFile(path, "utf8");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
    return contents;
}


/** Gets website HTML and prints it to the console. */

async function webCat(url, outFile = "") {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.log(`Error fetching ${url}`);
        console.log(err.message);
        process.exit(1);
    }
    return resp.data;
}


/** Handles how the content should be outputted, to a file or console. */

function handleOutput(content, outFile = "") {
    if (outFile) {
        try {
            fsP.writeFile(outFile, content, "utf8");
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    } else {
        console.log(content);
    }
}


async function start(inPath, outFile = "") {
    let content;
    if (inPath.startsWith("http://") || inPath.startsWith("https://")) {
        content = await webCat(inPath, outFile);
    } else {
        content = await cat(inPath, outFile);
    }
    handleOutput(content, outFile);
}


if (process.argv[2] === "--out") {
    inPath = process.argv[4];
    outFile = process.argv[3];
} else {
    inPath = process.argv[2];
}

start(inPath, outFile);