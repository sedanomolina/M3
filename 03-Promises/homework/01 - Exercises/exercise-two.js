"use strict";

const { promises } = require("dns");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  // exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });
  // exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });

  // promise version
  // Tu código acá:

  const { promisifiedReadFile, blue, magenta } = exerciseUtils;

  promisifiedReadFile("poem-two/stanza-01.txt")
    .then(res => blue(res))
    .catch(err => magenta(new Error(err)))
  promisifiedReadFile("poem-two/stanza-02.txt")
    .then(res => blue(res))
    .catch(err => magenta(new Error(err)))
    .then(() => blue('done'))
};

// problemA()

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  // filenames.forEach((filename) => {
  //   exerciseUtils.readFile(filename, function (err, stanza) {
  //     exerciseUtils.blue(stanza);
  //     if (err) exerciseUtils.magenta(new Error(err));
  //   });
  // });

  // promise version
  // Tu código acá:

  const { promisifiedReadFile, blue, magenta } = exerciseUtils;

  const promises = filenames.map(file =>
    promisifiedReadFile(file)
      .then(res => blue(res))
      .catch(err => magenta(new Error(err)))
  );

  Promise
    .all(promises)
    .then(() => blue('done'))
    .catch(err => magenta(new Error(err)));
}
problemB()
// const fileNames = fs.readdirSync(__dirname + '/poem-two');

// EJERCICIO EXTRA
function problemC() {
  const { writeFile } = require("fs");
  const { blue, magenta } = exerciseUtils
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
    return new Promise((resolve, reject) => {
      writeFile(filename, str, err => {
        err
          ? reject(err)
          : resolve()
      })
    })
  }
  promisifiedWriteFile("file.txt", "Hello, World!")
    .then(() => {
      blue("Archivo guardado exitosamente.");
    })
    .catch((err) => {
      magenta("Error al guardar el archivo:", err);
    });
}
problemC()