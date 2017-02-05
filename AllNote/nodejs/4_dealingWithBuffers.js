//create a Buffer with default utf-8 encoding
var buf = new Buffer ('hello duniya'); 
console.log(buf.toString());

//create a Buffer with default base64 encoding
var buf2 = new Buffer('bye duniya', 'base64');
console.log(buf2.toString('base64'));
//supported utf8, base64, ascii

//create 100 size Buffer
var buf3 = new Buffer(1024);
buf3[23] = 34;
console.log(buf3[23]);
console.log(buf3.length);

//slicing a Buffer
var subBuf2 = buf2.slice(4,9);
console.log(subBuf2);
console.log(subBuf2.toString('base64')); //decoding to other format

//copying Buffer
var targetStart = 0;
var sourceStart = 5;
var sourceEnd = 8;

var copyBuf2 = new Buffer(4);
buf2.copy(copyBuf2, targetStart, sourceStart, sourceEnd);
console.log(copyBuf2.toString('base64'));
