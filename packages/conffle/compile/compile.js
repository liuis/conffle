var solc = require('solc');
var fs = require('fs');
var util = require('util');
const {
    findImports
} = require('conffle-utils/utils');

async function run() {
    try {
        console.log("start compile all the contracts, pls wait....")
        console.log("--------------------------------------------")
        await compile();

    } catch (e) {
        console.error(e);
    }
};

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

function compile() {

    var input = {};
    var teamJson = {
        'contractFile': '',
        'contractAddress': '',
        'abi': {},
        'bytecode': '',
        'linkReferences': {}
    };

    //linkReferences
    var noNeedlink = [];
    var Linked = [];

    var files = fs.readdirSync("./contracts/");
    var i;
    for (i in files) {
        var file = files[i];
        input[file] = {
            content: fs.readFileSync("./contracts/" + file, 'utf8')
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
                        //'*': ['evm.bytecode', 'abi']
                        '*': ['*']
                    }
                }
            },
            sources: input
        })))
    };

    wfile_output = "./build/CompileOutput.json"
    fs.writeFile(wfile_output, JSON.stringify(output, null, 4), function(err) {
        if (err)
            console.error(err);
    })

    console.log("output:", output);
    //console.log(util.inspect(output, {
    //    showHidden: false,
    //    depth: null
    //}));


    for (var file in output.contracts) {
        for (var contractName in output.contracts[file]) {
            teamJson.contractFile = file;
            teamJson.contractAddress = '';
            teamJson.abi = output.contracts[file][contractName].abi;
            teamJson.bytecode = output.contracts[file][contractName].evm.bytecode.object;
            teamJson.linkReferences = output.contracts[file][contractName].evm.bytecode.linkReferences;
            wfile = "./build/" + file + ".json"

            if (isEmptyObject(teamJson.linkReferences))
            {
                if(!isEmptyObject(teamJson.abi)){
                 noNeedlink.push(file)
                } 

            }
            else
            {
                if(!isEmptyObject(teamJson.abi)){
                Linked.push(file)
                } 
            }

            fs.writeFile(wfile, JSON.stringify(teamJson, null, 4), function(err) {
                if (err)
                    console.error(err);
            })
        }

    }

    console.log("\n")
    console.log("--------------------------------------------")
    console.log("See the above content, check whether there are any errors, if there is no error, may be a success!")
    console.log("--------------------------------------------")
    console.log("\n")
    console.log("U need first deploy this contract:", noNeedlink)
    console.log("\n")
    console.log("then deploy this contract:", Linked)
    console.log("\n")
}


module.exports = {
    run
}
