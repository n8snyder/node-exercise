"use strict";

const fsP = require("fs/promises");
const path = process.argv[2];

async function cat(path){
    console.log("path", path);
    try {
        let contents = await fsP.readFile(path, "utf8");
        console.log("contents", contents);
    } catch(err) {
        console.log(err.message);
        process.exit(1);
        
    }
}

cat(path);

async function webCat() {
    
}