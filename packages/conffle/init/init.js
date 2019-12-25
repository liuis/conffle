const TruffleBox = require("truffle-conflux-box");
const fs = require("fs");
const path = require("path");
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
    //mkdirs("./build", function(err) {
    //    if (err) console.error(err)
    //    else {
    //        try {

    //            createProjectStructure();

    //        } catch (e) {
    //            console.error(e);
    //        }
    //    }

    //});

}

function createProjectStructure(dir = "./") {
    config = {};
    config.projectPath = __dirname;
    fs.writeFile('./build/config.json', JSON.stringify(config,null, 4), function(err) {
            if (err) console.error(err);
    })
    console.log("start the example procject, pls wait....")

    TruffleBox.unbox("https://github.com/liuis/truffle-conflux-init-default", dir, unboxOptions);
}

module.exports = {
    run,
    createProjectStructure
}
