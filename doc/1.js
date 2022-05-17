

let pathToRegexp = require('path-to-regexp');
let keys = [];
let regexp = pathToRegexp('/home', { end: true});
console.log(regexp);
console.log(regexp.test('/home'));
console.log(regexp.test('/home/'));
console.log(regexp.test('/home/2'));
