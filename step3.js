"use strict";

const fsP = require("fs/promises");
const axios = require("axios");
let inPath;
let outFile;

/** Reads a file and print to the console the contents. */

async function cat(path, outFile="") {
    let contents;
    try {
        contents = await fsP.readFile(path, "utf8");
        // console.log(contents);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
    handleOutput(contents, outFile);
    // if(outFile){
    //     fsP.writeFile(outFile, contents, "utf8");
    // } else {
    //     console.log(contents);
    // }
}


/** Gets website HTML and prints it to the console. */

async function webCat(url, outFile="") {
    let resp;
    try {
        resp = await axios.get(url);
        // console.log(resp.data);
    } catch (err) {
        console.log(`Error fetching ${url}`);
        console.log(err.message);
        process.exit(1);
    }
    handleOutput(resp.data, outFile);
    // if(outFile){
    //     fsP.writeFile(outFile, resp.data, "utf8");
    // } else {
    //     console.log(resp.data);
    // }
}

function handleOutput(content, outFile=""){

    if(outFile){
        fsP.writeFile(outFile, content, "utf8");
    } else {
        console.log(content);
    }
} 

if(process.argv[2] === "--out"){
    inPath = process.argv[4];
    outFile = process.argv[3];
} else {
    inPath = process.argv[2];
}


if (inPath.startsWith("http://") || inPath.startsWith("https://")) {
    webCat(inPath, outFile);
} else {
    cat(inPath, outFile);
}