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

    //if (process.argv.length < 3) {
    //    console.log('needs the contract Name as argument!');
    //    process.exit(1);
    //}
    //var fileName = process.argv[2];
    /*
    var fileName = name 

    confile = fileName + '.sol';

    console.log("confile:", confile);

    var contentfile = fs.readFileSync('./demo-test/contracts/' + fileName + '.sol', {
        encoding: 'utf8'
    }).toString().replace(/\n/g, ' ');

    var input = {
        language: 'Solidity',
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    }
    temp = {}
    temp.content = contentfile;
    temp2 = {}
    temp2[confile] = temp

    input.sources = temp2

    console.log(JSON.stringify(input))

    teamJson = {
        'abi': {},
        'bytecode': ''
    };
    importpath = findImports("./demo-test/contracts")
        //console.log("importpath:", importpath)
    solcResult = solc.compile(JSON.stringify(input), importpath)
    if (typeof solcResult === 'string') {
     output = JSON.parse(solcResult)
    }
    else {
     output = solcResult
    }
    */
    var input = {};
    var teamJson = {
        'abi': {},
        'bytecode': ''
    };
 
    var files = ['FC.sol', 'FCPausable.sol', 'FCRoles.sol', 'IFC.sol', 'Roles.sol', 'SafeMath.sol'];
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

    wfile = "./demo-test/build/" + file + ".json"

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
