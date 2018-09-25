process.env.UV_THREADPOOL_SIZE = 5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');


const start = Date.now();

function doRequest () {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('Request', Date.now() - start);
        });
    })
    .end();
}

function doHash () {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash: ', Date.now() - start);
    });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {// thread 1
    console.log('Fs:', Date.now() - start);
});

doHash();// thread 2
doHash();// thread 3
doHash();// thread 4
doHash();