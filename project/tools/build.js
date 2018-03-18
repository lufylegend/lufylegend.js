/* eslint-env node */
const { exec } = require('child_process');
const fs = require('fs');
const commonJson = require('./prefab-class.json');
let imports = [];
for (let key of Object.keys(commonJson)) {
    imports.push(`import ${key} from "${commonJson[key]}";`);
}

const applicationPath = './assets/application.js';
let applicationText;
let metaList = [];


function getAtlas(atlas) {
    let paths = [];
    if (atlas.property.bind && atlas.property.bind.atlas) {
        paths.push(atlas.property.bind.atlas);
    }
    if (atlas.property.button) {
        let nodes = [];
        if (atlas.property.button.upState) {
            nodes.push(atlas.property.button.upState);
        }
        for (let child of nodes) {
            paths = paths.concat(getAtlas(child));
        }
    }
    if (atlas.childNodes) {
        for (let child of atlas.childNodes) {
            paths = paths.concat(getAtlas(child));
        }
    }
    return paths;
}
const jsPaths = ['./assets/plugin', './assets/scripts'];
let jsPathObject = {};
function getImpports(json) {
    let objs = [];
    if (json.class && !jsPathObject[json.class]) {
        let classes = [];
        for (let jsPath of jsPaths) {
            classes = classes.concat(readFiles(jsPath, new RegExp('.*\\' + json.class + '.js$')));
            if (classes.length > 0) {
                break;
            }
        }
        if (classes.length > 0) {
            let classPath = classes[0].replace('assets/', '');
            objs.push(`import ${json.class} from "${classPath}";`);
        }
        jsPathObject[json.class] = true;
    }
    if (json.childNodes) {
        for (let child of json.childNodes) {
            objs = objs.concat(getImpports(child));
        }
    }
    return objs;
}
function readFiles(path, regExp) {
    let result = [];
    let files = fs.readdirSync(path);
    for (let file of files) {
        let stat = statSync(`${path}/${file}`);
        if (!stat) {
            continue;
        }
        if (stat.isFile()) {
            if (regExp.test(file)) {
                result.push(`${path}/${file}`);
            }
            continue;
        }
        if (stat.isDirectory()) {
            result = result.concat(readFiles(`${path}/${file}`, regExp));
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
        let prefabs = readFiles('./assets/resources', /.*\.prefab$/);
        for (let prefab of prefabs) {
            let prefabContext = fs.readFileSync(prefab);
            let json = JSON.parse(prefabContext);
            let atlasPaths = getAtlas(json);
            imports = imports.concat(getImpports(json));
            let metaPath = `${prefab}.meta`;
            let metaContent = {};
            let atlasObj = {};
            for (let atlasPath of atlasPaths) {
                atlasObj[atlasPath] = true;
            }
            metaContent.atlas = Object.keys(atlasObj).map((atlas) => {
                let index = atlas.lastIndexOf('/');
                return { name: atlas.substring(index + 1), path: atlas.substring(0, index) };
            });
            metaList.push(metaPath);
            fs.writeFileSync(metaPath, JSON.stringify(metaContent));
        }
        resolve();
    });
}
function filesRestore() {
    for (let methPath of metaList) {
        fs.unlinkSync(methPath);
    }
    if (applicationText) {
        writeFile(applicationPath, applicationText);
    }
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
        filesRestore();
        console.log('build success!!');
    }).catch((err) => {
        console.error(err);
        filesRestore();
    });

function ExecCommand(command) {
    console.log(command);
    return new Promise(function(resolve, reject) {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err, stdout, stderr);
                reject(err);
            } else {
                resolve(stdout.split('\n'));
            }
        });
    });
}
