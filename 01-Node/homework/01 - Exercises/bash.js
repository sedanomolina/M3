const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function bash() {
   process.stdout.write("prompt > ");
   process.stdin.on('data', function (data) {
      const [cmd,...args] = data.toString().trim().split(' ');
      commands[cmd]
         ? commands[cmd](print, args.join(' '))
         : print(`command not found: ${cmd}`);
   });
}

function print(output) {
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
};

bash();
module.exports = {
   print,
   bash,
};
const str = "mi mama es alegre";
const [firstWord, ...restOfString] = str.split(" ");
const arr = [firstWord, restOfString.join(' ')];
console.log(arr);
// Resultado: ["mi", "mama es alegre"]
