/********* EMITTER ***********************************/
// callback function is passed with event object, a module can emit
// various kinds of event
// Name of events should be mentioned module API 
// but "error" is a special event should only be used to emit errors

var events = require('events');
var em = new events.EventEmitter();
em.emit('event1'); // emit custom event
em.emit('error', new Error('My mistake')); // emit error event

//removing all listeners
emitter.removeAllListeners('event1');



/********************* LISTENER **********************/
/*************************************************
➤ .addListener and .on — To add an event listener to an event type
➤ .once — To attach an event listener to a given event type that will be called at most once
➤ .removeEventListener — To remove a specifi c event listener of a given event
➤ .removeAllEventListeners — To remove all event listeners of a given event type
**************************************************/
function receiveData(data) {
    console.log("got data from file read stream: %j", data);
}
readStream.addListener(“data”, receiveData);
//or
readStream.on(“data”, receiveData);

//executing callback atmost one
readStream.on(“data”, receiveData);

//removing event listener
readStream.removeListener("data", receiveData);

//more compact way of doing it and adding two listeners
readStream.on("data", function(data) {
    console.log('I have some data here.');
});
readStream.on("data", function(data) {
    console.log('I have some data here too.');
});


/**************** SCHEDULING EXECUTION **************/
var oneSecond = 1000;
setTimeout (receiveData, oneSecond); // execute after 1s
setInterval (receiveData, oneSecond); // repeat after 1s


// execute after 1s
var timeout = setTimeout (receiveData, oneSecond); 
//later clear timeout
clearTimeout(timeout);

//you can defer the execution of a function until the next iteration of the event loop by using process.nextTick()
stream.on("data", function(data) {
    stream.end("my response");
    process.nextTick(function() {
        fs.unlink("/path/to/file");
    });
});

