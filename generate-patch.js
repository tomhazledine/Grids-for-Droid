import fs from "fs";

import * as header from "./src/generate-header.js"
import * as sequencers from "./src/generate-sequencers.js"
import * as footer from "./src/generate-footer.js"

console.log("---");
console.log("Generate Grids patch for Droid");
console.log("---");
console.log("Parsing patterns...");

console.log("Loading droid parts...");

const headerOutput = header.generate();
const sequencersOutput = sequencers.generate()
const footerOutput = footer.generate();

console.log("Saving droid.ini...");
fs.writeFile(
    "./droid.ini",
    [
        headerOutput,
        sequencersOutput,
        footerOutput
    ].join(''),
    err => {
        if (err) {
            return console.error(err);
        }
        console.log("The droid.ini was saved.");
        console.log("Complete");
    }
);
