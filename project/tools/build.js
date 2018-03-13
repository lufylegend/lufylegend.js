/* eslint-env node */
const { exec } = require('child_process');
const fs = require('fs');
const commonJson = require('./prefab-class.json');
const classJson = require('../assets/prefab-class.json');
let imports = [];
for (let key of Object.keys(commonJson)) {
    imports.push(`import ${key} from "${commonJson[key]}";`);
}
for (let key of Object.keys(classJson)) {
    imports.push(`import ${key} from "${classJson[key]}";`);
}

const applicationPath = './assets/application.js';
let applicationText;
let metaList = [];


function getAtlas(atlas) {
    let paths = [];
    if (atlas.property.bind && atlas.property.bind.atlas) {
        paths.push(atlas.property.bind.atlas);
    }
    if (atlas.childNodes) {
        for (let child of atlas.childNodes) {
            paths = paths.concat(getAtlas(child));
        }
    }
    return paths;
}
function readPrefabs(path) {
    let result = [];
    let files = fs.readdirSync(path);
    for (let file of files) {
        let stat = statSync(`${path}/${file}`);
        if (!stat) {
            continue;
        }
        if (stat.isFile()) {
            if (/.*\.prefab$/.test(file)) {
                result.push(`${path}/${file}`);
            }
            continue;
        }
        if (stat.isDirectory()) {
            result = result.concat(readPrefabs(`${path}/${file}`));
        }
    }
    return result;
}
function statSync(file) {
    let stat = '';
    try {
        stat = fs.statSync(file);
        return stat;
    } catch (err) {
        return stat;
    }
}
function readFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject();
            } else {
                resolve(data);
            }
        });
    });
}
function writeFile(path, text) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, text, function(err) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        });
    });
}
function createMeta() {
    return new Promise(function(resolve, reject) {
        let prefabs = readPrefabs('./assets/resources');
        for (let prefab of prefabs) {
            let json = JSON.parse(fs.readFileSync(prefab));
            let atlasPaths = getAtlas(json);
            let atlasList;
            let atlasObj = {};
            for (let atlasPath of atlasPaths) {
                atlasObj[atlasPath] = true;
            }
            atlasList = Object.keys(atlasObj);
            let metaPath = `${prefab}.meta`;
            metaList.push(metaPath);
            fs.writeFileSync(metaPath, atlasList);
        }
        resolve();
    });
}
createMeta()
    .then(() => {
        return readFile(applicationPath);
    })
    .then((data) => {
        applicationText = data;
        return writeFile(applicationPath, data + imports.join(''));
    })
    .then(() => {
        return ExecCommand('rm -rf build/resources');
    })
    .then(() => {
        return ExecCommand('cp -a assets/resources build/resources');
    })
    .then(() => {
        return ExecCommand('`npm bin`/webpack');
    })
    .then((res) => {
        console.log(res);
        return writeFile(applicationPath, applicationText);
    })
    .then(() => {
        console.log('build success!!');
    }).catch((err) => {
        console.error(err);
    });

function ExecCommand(command) {
    console.log(command);
    return new Promise(function(resolve, reject) {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout.split('\n'));
            }
        });
    });
}
