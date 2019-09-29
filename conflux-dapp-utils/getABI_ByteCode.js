const fs = require('fs');

fs.readdir("./demo-test/build/contracts", (err, files) => {
  files.forEach(file => {
    console.log(file);
    const fd = require("./demo-test/build/contracts/" + file)
    console.log(fd.contractName)
    //console.log(fd.abi)
    console.log(fd.bytecode)
    console.log(fd.deployedBytecode)
  });
})
