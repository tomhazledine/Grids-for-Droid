import { readFileSync } from "fs"
import Mustache from "mustache"

import { config } from "../droid.config.js"
const { controls, inputs, outputs } = config

export const generate = () => {
    const template = readFileSync("./src/templates/droid-footer.ini", {
        encoding: "utf8",
        flag: "r",
    })

    return Mustache.render(template, {
        ...controls,
        ...inputs,
        ...outputs
    })
}