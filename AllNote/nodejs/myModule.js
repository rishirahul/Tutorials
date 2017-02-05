// object definition
function myModule(yourName) {
    this.name = yourName;
    this.sayHello = function() {
        console.log('myModule says hello to :' + this.name); 
    }
    this.sayBye = function () {
        console.log('myModule says bye to :' + this.name); 
    }
}

//other function in same module
function hello() {
    console.log('hello \n');
}

module.exports = myModule;
module.exports.hello = hello;
