import { JSON5 } from "./JSON5.js";

const s = `{
  a: "abc", // comment
  b: 123, /* comment */
}`;

const obj = JSON5.parse(s);
console.log(obj);
const s2 = JSON5.stringify(obj);
console.log(s2);
