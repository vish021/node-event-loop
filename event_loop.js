//node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];// Any networking operations http
const pendingOperations = [];// tasks inside threadpool

// New timers, tasks and operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate ? Then return true or false otherwise
    // Check two: any pending OS tasks? (Like servers listeting to port)
    // Check three: Any pending long running operations? (Like fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}


// Entire body executes in one 'tick'
while (shouldContinue()) {
    // 1) Node looks at pendingTimers and sees if any functions are ready to be called. setTimeout, setIntervals
    
    // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

    // 3) Pause execution. Continue when ...
    // - a new pendingOStask is done like HTTP call
    // - a new pendingOperation is done like fs
    // - a timer is about to complete

    // 4)  Look at pendingTimer. Call any setImmediate

    // 5) Handle any 'close' events like closing file handles and cleanup of any resources
}

// exit back to terminal