const fs = require('fs');

module.exports.getIndexHtml = (req, res, payload, cb) => {
    fs.readFile('./index.html', (err, data) => {
        if (!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
};

module.exports.getFormHtml = (req, res, payload, cb) => {
    fs.readFile('./form.html', (err, data) => {
        if (!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
};

module.exports.getFormJs = (req, res, payload, cb) => {
    fs.readFile('./form.js', (err, data) => {
        if (!err)
            cb(null, data, 'text/javascript');
        else
            console.error(err);
    })
};

module.exports.getIndexJs = (req, res, payload, cb) => {
    fs.readFile('./main.js', (err, data) => {
        if (!err)
            cb(null, data, 'text/javascript');
        else
            console.error(err);
    })
};

module.exports.getMainCSS = (req, res, payload, cb) => {
    fs.readFile('./main.css', (err, data) => {
        if (!err)
            cb(null, data, 'text/css');
        else
            console.error(err);
    })
};