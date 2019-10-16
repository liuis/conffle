const TruffleBox = require("truffle-conflux-box");
const unboxOptions = {
    force: false
};

async function run() {
    try {
        await createProjectStructure();

    } catch (e) {
        console.error(e);
    }
}

function createProjectStructure(dir="./demo-test") {
    console.log("start the example procject, pls wait....")

    TruffleBox.unbox("https://github.com/liuis/truffle-conflux-init-default", dir, unboxOptions);
}

module.exports = {
    run,
    createProjectStructure
}
