const exercise06 = require("./exercise06");
var obj = {here: {is: "an"}, object: 2};
console.log(exercise06.objectsDeeplyEqual(obj, obj));
console.log(exercise06.objectsDeeplyEqual(obj, {here: 1, object: 2}));
console.log(exercise06.objectsDeeplyEqual(obj, {here: {is: "an"}, object: 2}));