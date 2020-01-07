const Box = require('./box');
const unboxOptions = {
    force: false
};

function mkdirs(dirname, callback) {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback();
        } else {
            //console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

function mkdirsSync(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


async function run() {

    createProjectStructure();

}

function createProjectStructure(dir = "./") {
    console.log("start the example procject, pls wait....")

    Box.unbox("https://github.com/liuis/truffle-conflux-init-default", dir, unboxOptions);
}

module.exports = {
    run
}
