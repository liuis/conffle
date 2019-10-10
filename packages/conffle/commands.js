const compile = require('./compile/compile.js');
const init = require('./init/init.js');
const account = require('./account/account.js');
//const testConfig = require('./test/test.js');
//const node = require('./node/node.js');
const deploy = require('./deploy/deploy.js');
//const config = require('conflux-dapp-config');

const addInitOption = (program) => {
    program
        .command('init')
        .description('Initialize Conflux-dapp-js')
        .option('--update [update]', 'Update project files')
        .action(async (option) => {
            await init.run(option.update);
        })
}

const addAccountOption = (program) => {
    program
        .command('account')
        .description('Get the privateKey, Address, mnemonic')
        .option('--account', 'Generator 10 PrivateKey&&Address')
        .action(async (option) => {
            await account.run(option.account);
        })
}


const addCompileOption = (program) => {
    program
        .command('compile')
        .option('--path [compile path]', 'Path to contract files', './contracts')
        //.option('--compiler [compiler url]', 'Url to the desired compiler', config.compilerUrl + "/compile")
        .description('Compile contracts')
        .action(async (option) => {
            await compile.run(option.path, option.compiler);
        })
}

const addTestOption = (program) => {
    program
        .command('test')
        .description('Running the tests')
        .option('--path [tests path]', 'Path to test files', './test')
        .action(async (options) => {
            await testConfig.run(options.path);
        })
}

const addNodeOption = (program) => {
    program
        .command('node')
        .description('Running a local node. Without any argument node will be runned with --start argument')
        .option('--stop', 'Stop the node')
        .option('--start', 'Start the node')
        .option('--only', 'Start only the node without local compiler')
        .action(async (options) => {
            await node.run(options);
        })
}

const addDeployOption = (program) => {
    program
        .command('deploy')
        .description('Run deploy script')
        .option('--path [deploy path]', 'Path to deployment file', './deployment/deploy.js')
        .option('-n --network [network]', 'Select network', "local")
        .option('--networkId [networkId]', 'Configure your network id')
        .option('-s --secretKey [secretKey]', 'Wallet secretKey(privateKey)')
        .option('--compiler [compiler_url]', 'Url to the desired compiler')
        .action(async (options) => {
            await deploy.run(options.path, options.network, options.secretKey, options.compiler, options.networkId);
        })
};


const initCommands = (program) => {
    addInitOption(program);
    addCompileOption(program);
    //addTestOption(program);
    //addNodeOption(program);
    addDeployOption(program);
}

module.exports = {
    initCommands
}