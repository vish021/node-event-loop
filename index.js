const cluster = require('cluster');

// is file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js being executed AGAIN but in child/worker mode 
   cluster.fork();
} else {
    // I'm a worker and going to act like server and do nothing else
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);//code in event loop not in thread or process
        res.send('Hi There');
    });
    
    app.listen(3000);
}



