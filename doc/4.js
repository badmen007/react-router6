
// ?= 属于正向肯定 前瞻 后面需要跟着什么， 但是不消耗字符
console.log('1a'.match(/\d(?=[a-z])[a-z]/))

// 正向否定
console.log('1a'.match(/\d(?![a-z])[a-z]/))

// 反向肯定
console.log('1a'.match(/(?<=[a-z])[a-z]/))

// 反向否定
console.log('1a'.match(/(?![a-z])[a-z]/))
