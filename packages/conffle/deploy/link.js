// 


var linker = require('solc/linker');

bytecode = linker.linkBytecode(bytecode, { MyLibrary: '0x123456...' });
