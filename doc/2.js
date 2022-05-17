

let pathToRegexp = require('path-to-regexp');
let keys = [];
let regexp = pathToRegexp('/user/:id/:age', keys);
console.log(regexp); // /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i

let url = '/user/100/200';
let match = url.match(regexp);
console.log(match);

let paramNames = keys.map(item => item.name);
let params = paramNames.reduce((memo, paramName, index) => {
  memo[paramName] = match[index+1]
  return memo;
}, {})
console.log(params);