const { Buffer } = require("buffer");

const buf1 = new TextEncoder("utf-8").encode("First portion. ");
const buf2 = new TextEncoder("utf-8").encode("Second one.");
const combined = new Uint8Array(buf1.length + buf2.length);

combined.set(buf1, 0);
combined.set(buf2, buf1.length);

console.log(combined.buffer);
console.log(new TextDecoder("utf-8").decode(combined));
