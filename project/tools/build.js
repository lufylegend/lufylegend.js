const { exec } = require('child_process');

ExecCommand('rm -rf build/resources')
.then(()=>{
    return ExecCommand('cp -a assets/resources build/resources');
})
.then(()=>{
    return ExecCommand('`npm bin`/webpack');
})
.then((res)=>{
    console.log(res);
    console.log('build success!!');
}).catch((err)=>{
    console.error(log);
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