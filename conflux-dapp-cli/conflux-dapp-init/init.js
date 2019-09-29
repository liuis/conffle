const TruffleBox = require("truffle-conflux-box");
const unboxOptions = { force: false };


console.log("start the example procject, pls wait....")

TruffleBox.unbox("https://github.com/liuis/truffle-conflux-init-default", "./demo-test", unboxOptions);

