import { Buffer } from "node:buffer"

/* Staic */
const buffalloc = Buffer.alloc(2, "lutz")

const str = "\u00bd + \u00bc = \u00be"

console.log(`${str}: ${str.length} characters, ` + `${Buffer.byteLength(str, "utf8")} bytes`)
