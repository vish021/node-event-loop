process.env.UV_THREADPOOL_SIZE = 1;//have only one thread in threadpool for each child
const cluster = require('cluster');

// is file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js being executed AGAIN but in child/worker mode 
    // NOTE:  one child and one instance of event loop
    // Every child has group of 4 threads in threadpool default unless specified in UV_THREADPOOL_SIZE
   cluster.fork();
   cluster.fork();
} else {
    // I'm a worker and going to act like server and do nothing else
    const express = require('express');
    const app = express();
    const crypto = require('crypto');

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi There');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast');
    });
    
    app.listen(3000);
}



