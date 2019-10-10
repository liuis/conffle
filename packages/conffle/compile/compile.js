var solc = require('solc');
var fs = require('fs');
const {
    findImports
} = require('conffle-utils/utils');

async function run() {
    j
    try {
        await compile();

    } catch (e) {
        printError(e.message)
        console.error(e);
    }
}

function compile() {

    if (process.argv.length < 3) {
        console.log('needs the contract Name as argument!');
        process.exit(1);
    }
    var fileName = process.argv[2];

    confile = fileName + '.sol';

    console.log("confile:", confile);

    var contentfile = fs.readFileSync(__dirname + '/demo-test/contracts/' + fileName + '.sol', {
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
    importpath = findImports(__dirname + "/demo-test/contracts")
        //console.log("importpath:", importpath)
    var output = JSON.parse(solc.compile(JSON.stringify(input), importpath))

    console.log("output:", output);

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

}


module.exports = {
    run
}
