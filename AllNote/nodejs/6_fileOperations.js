// module to manupulate path names
var path = require('path');
console.log(path.normalize('./foo/bar/..//nodejs')); /simplifies complex path names
/********************* has other methods like **********
join --     to join path
resolve --  resolve addition of complex paths
relative -- get relative path between two paths
basename -- to get base name 
dirname --  directory name 
extname --  extension name
.. so on
*******************************************************/
path.exists('./../nodejs', function(exists)) {
    console.log('path exists:', exists);
}

//module to manupulate file e.g. read, write, open and close in various modes 
var fs= require('fs');
fs.stat('./test.txt', function(err,stats)) {
    if (err) {throw err;}
    console.log(stats);
    /***************************************************
    ➤ stats.isFile()— Returns true if the fi le is a standard fi le and not a directory, a socket, a
    symbolic link, or a device.
    ➤ stats.isDirectory()—Returns true if the fi le is a directory.
    ➤ stats.isBlockDevice()—Returns true if the fi le is a device of the type block; in most
    UNIX systems this is generally under the /dev directory.
    ➤ stats.isCharacterDevice()—Returns true if the fi le is a device of the character type.
    ➤ stats.isSymbolicLink()—Returns true if the fi le is a symbolic link to another fi le.
    ➤ stats.isFifo()— Returns true if the fi le is a FIFO (a special kind of UNIX named pipe).
    ➤ stats.isSocket()—Returns true if the fi le is a UNIX domain socket.
    ***************************************************/
}

//opening a file in various modes
var fs = require('fs');
fs.open('/path/to/file', 'r', function opened(err, fd) {
    // got fd file descriptor
    if (err) { throw err }
    var readBuffer = new Buffer(1024),
    bufferOffset = 0,
    bufferLength = readBuffer.length,
    filePosition = 100;
    fs.read(fd,
    readBuffer,
    bufferOffset,
    bufferLength,
    filePosition,
    function read(err, readBytes) {
        if (err) { throw err; }
        console.log('just read ' + readBytes + ' bytes');
        if (readBytes > 0) {
            console.log(readBuffer.slice(0, readBytes));
        }
    });
});

/*****************************************************
➤ r—Opens the text fi le for reading. The stream is positioned at the beginning of the fi le.
➤ r+—Opens the fi le for reading and writing. The stream is positioned at the beginning of the
fi le.
➤ w—Truncates the fi le to zero length or creates a text fi le for writing. The stream is
positioned at the beginning of the fi le.
➤ w+—Opens the fi le for reading and writing. The fi le is created if it does not exist. Otherwise
it is truncated. The stream is positioned at the beginning of the fi le.
➤ a—Opens the fi le for writing. The fi le is created if it does not exist. The stream is
positioned at the end of the fi le. Subsequent writes to the fi le will always end up at the
current end of fi le.
➤ a+—Opens the fi le for reading and writing. The fi le is created if it does not exist. The
stream is positioned at the end of the fi le. Subsequent writes to the fi le will always end up at
the current end of fi le.
******************************************************/

//writing to a file 
var fs = require('fs');
function openAndWriteToSystemLog(writeBuffer, callback) {
    fs.open('./my_file', 'a', function opened(err, fd) {
        if (err) { return callback(err); }
        function notifyError(err) {
            fs.close(fd, function() {
                callback(err);
            });
        }
        var bufferOffset = 0,
        bufferLength = writeBuffer.length,
        filePosition = null;
        fs.write( fd, writeBuffer, bufferOffset, bufferLength, filePosition,
        function wrote(err, written) {
            if (err) { return notifyError(err); }
            fs.close(fd, function() {
                callback(err);
            });
        }
        );
    });
}
openAndWriteToSystemLog(
new Buffer('writing this string'),
function done(err) {
    if (err) {
        console.log("error while opening and writing:", err.message);
        return;
    }
    console.log('All done with no errors');
}
);
