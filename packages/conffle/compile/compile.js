var solc = require('solc');
var fs = require('fs');
const {
    findImports
} = require('conffle-utils/utils');

async function run() {
    try {
        await compile();

    } catch (e) {
        console.error(e);
    }
}

function compile() {

    /*
   */
    var input = {};
    var teamJson = {
        'abi': {},
        'bytecode': ''
    };
 
    //var files = ['FC.sol', 'FCPausable.sol', 'FCRoles.sol', 'IFC.sol', 'Roles.sol', 'SafeMath.sol'];
    var files = fs.readdirSync("./demo-test/contracts/");
    var i;
    for (i in files) {
        var file = files[i];
        input[file] = {
            content: fs.readFileSync("./demo-test/contracts/" + file, 'utf8')
        };
    }
    for (i = 0; i < 10; i++) {
        var output = JSON.parse(solc.compileStandardWrapper(JSON.stringify({
            language: 'Solidity',
            settings: {
                optimizer: {
                    enabled: true
                },
                outputSelection: {
                    '*': {
                        '*': ['evm.bytecode', 'abi']
                    }
                }
            },
            sources: input
        })))
    };


    console.log("output:", output);

    //for (var file in output.contracts) {
    //    for (var contractName in output.contracts[file]) {
    console.log(output.contracts['FC.sol']['FC'].evm.bytecode.object)
    console.log(output.contracts['FC.sol']['FC'].abi)
    teamJson.abi = output.contracts['FC.sol']['FC'].abi;
    teamJson.bytecode = output.contracts['FC.sol']['FC'].evm.bytecode.object;

    wfile = "./demo-test/build/FC.sol.json"

    fs.writeFile(wfile, JSON.stringify(teamJson), function(err) {
            if (err)
                console.error(err);
        })
        //}

    console.log("contract compiled sucessfully")
        //}

}


module.exports = {
    run
}
