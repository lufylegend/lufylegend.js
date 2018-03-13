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
readFile(applicationPath)
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
