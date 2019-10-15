var solc = require('solc');
var fs = require('fs');
const {
    findImports
} = require('conffle-utils/utils');

async function run(name) {
    try {
        await compile(name);

    } catch (e) {
        console.error(e);
    }
}

function compile(name) {

    //if (process.argv.length < 3) {
    //    console.log('needs the contract Name as argument!');
    //    process.exit(1);
    //}
    //var fileName = process.argv[2];
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
    //solcResult = solc.compile(JSON.stringify(input), importpath)
    const preparedSource = source.replace('Erc20TokenNamePlaceholder', "FC2");
    const compiledContract = solc.compile(preparedSource, 1).contracts[':'+"FC2"];

    //if (typeof solcResult === 'string') {
    // output = JSON.parse(solcResult)
    //}
    //else {
    // output = solcResult
    //}

    console.log("output:", compiledContract);
    /*
    for (var file in output.contracts) {
        for (var contractName in output.contracts[file]) {
            teamJson.abi = output.contracts[file][contractName].abi;
            teamJson.bytecode = output.contracts[file][contractName].evm.bytecode.object;

            wfile = "./demo-test/build/" + file + ".json"

            fs.writeFile(wfile, JSON.stringify(teamJson), function(err) {
                if (err)
                    console.error(err);
            })
        }

        console.log("contract compiled sucessfully:", file)
    }
    */

}


module.exports = {
    run
}
