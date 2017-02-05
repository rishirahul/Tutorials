// explains some concepts of creating and loading a module
// also some of object oriented js --- see myModule.js
var myModule = require('./myModule.js'); //path to file
var mm  = new myModule('otherModule');   // new object
myModule.hello()
var a = mm.name;
mm.sayHello();
mm.sayBye();
