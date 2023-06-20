const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
    print(process.cwd())
};

function date(print) {
    print(Date())
};

function echo(print, args) {
    print(args)
}

function ls(print) {
    fs.readdir('.', (error, files) => {
        error
            ? print(error)
            : print(files.join(' '))
    })
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        error
            ? print(error)
            : print(data)
    })
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        error
            ? print(error)
            : print(data.split('\n')[0])
    })
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        error
            ? print(error)
            : print(data.split('\n').at(-1).trim())
    })
}

function curl(print, args) {
    utils.request(args, (error, response) => {
        error
            ? print(error)
            : print(response)
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};
