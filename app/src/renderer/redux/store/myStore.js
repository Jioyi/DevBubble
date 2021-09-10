const isElectron = require('is-electron');
const electron = isElectron();
const myStore = electron ? window.localStorage : localStorage;

export default myStore;