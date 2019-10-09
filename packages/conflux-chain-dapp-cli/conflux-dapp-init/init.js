const TruffleBox = require("truffle-conflux-box");
const unboxOptions = {
    force: false
};

async function run() {
    try {
        await createProjectStructure();

    } catch (e) {
        printError(e.message)
        console.error(e);
    }
}

function createProjectStructure() {
    console.log("start the example procject, pls wait....")

    TruffleBox.unbox("https://github.com/liuis/truffle-conflux-init-default", "./demo-test", unboxOptions);
}

module.exports = {
    run
}
