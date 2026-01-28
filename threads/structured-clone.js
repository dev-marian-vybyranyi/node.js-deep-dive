const v8 = require("v8");

function structuredClone(value) {
  const buffer = v8.serialize(value);
  return v8.deserialize(buffer);
}

const obj = {
  name: "Marian",
  more: {
    items: ["surfing", "skating"],
    test: {
      foo: "bar",
    },
  },
  created: new Date(),
};

// Structured clone
const clonedObj = structuredClone(obj);
clonedObj.name = "Marian";
clonedObj.more.test.foo = "something else";

// Contrast structuredClone with this:
// anotherObj = obj;
// anotherObj.name = "Marian";
// anotherObj.more.test.foo = "something else";

console.log("Original Object:", obj);
console.log("Cloned Object:", clonedObj);
