
// 分组捕获
console.log('1ab'.match(/1[a-z]([b-c])/));

// 分组不捕获
console.log('1ab'.match(/1[a-z](?:[b-c])/));

// 命名捕获
console.log('11-22'.replace(/(?<x>\d{2})-(?<y>\d{2})/,"$<y>-$<x>"));

// match 字符串的方法
// test 是正则的方法
// exec 也是正则的方法