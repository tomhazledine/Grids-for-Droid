import fs from "fs"

export const generate = () => {
    const header = fs.readFileSync("./src/templates/droid-header.ini", {
        encoding: "utf8",
        flag: "r",
    })

    return header
}