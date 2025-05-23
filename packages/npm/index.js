// #region workspaces
const moduleA = require('a')
console.log(moduleA) // -> a
// #endregion workspaces

// #region imports
// 引入imports
const moduleB = require('#utils/index.js')
console.log(moduleB) // -> utils index

const moduleC = require('#config')
console.log(moduleC) // -> config

const dep = require('#dep')
console.log(dep) // -> fetch
// 引入exports
const moduleD = require('@play/npm/config')
console.log(moduleD) // -> config
// #endregion imports



