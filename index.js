const http = require('http');
const fs = require('fs');

const articles = require("./articles.json");
const readAll = require('./readAll.js');
const read = require('./read.js');
const html = require('./html.js');
const createArticle = require('./createArticle.js');
const updateArticle = require('./updateArticle.js');
const deleteArticle = require('./deleteArticle.js');
const createComment = require('./createComment');
const deleteComment = require('./deleteComment');
const logs = require('./logs.js');


const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/api/articles/readall': readAll.readAll,
    '/api/articles/read': read.read,
    '/api/articles/create': createArticle.createArticle,
    '/api/articles/update': updateArticle.updateArticle,
    '/api/articles/delete': deleteArticle.deleteArticle,
    '/api/comments/create': createComment.createComment,
    '/api/comments/delete': deleteComment.deleteComment,
    '/api/logs': logs.logs,
    '/index.html': html.getIndexHtml,
    '/': html.getIndexHtml,
    '/main.js': html.getIndexJs,
    '/form.html': html.getFormHtml,
    '/form.js': html.getFormJs,
    '/main.css': html.getMainCSS
}

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result, h) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.setHeader('Content-Type', 'application/json');

                res.end(JSON.stringify(err));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Content-Type', h);
            if (h === 'application/json') {
                changeArticles();
                res.end(JSON.stringify(result));
            }
            res.end(result);
        })
    })
});

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let params;
        if (body !== "") {
            params = JSON.parse(body);
        }
        cb(null, params);
    })
}

function changeArticles() {
    const file = fs.createWriteStream('articles.json');
    file.write(JSON.stringify(articles));
}

function getHandler(url) {
    console.log(url);
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found' });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});