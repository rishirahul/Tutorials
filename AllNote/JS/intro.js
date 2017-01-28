var numVar = 5;
console.log ("type of numVar: " + typeof numVar);

var expnumVar = 5e10;
console.log ("type of expnumvar: " + typeof expnumvar);

var strVar = "string \n" + 's';
console.log ("type of strVar: " + typeof strVar);

var boolVar = true;
console.log ("type of boolVar: " + typeof boolVar);

var objVar = {a:7, b:2};
console.log ("type of objVar: " + typeof objVar);

var funVar = function() {console.log("hello"); };
console.log ("type of funVar: " + typeof funVar);

var undefVar = undefined;
console.log ("type of undefVar: " + typeof undefVar);

var testOprVar = numVar + 2 * 5 / 3 - (5 % 3); 
console.log ("value of testOprVar: " + testOprVar);

var infinityVar = Infinity;
console.log ("type of infinityVar: " + typeof infinityVar + " value: " + infinityVar);

var infinityNegVar = -Infinity;
console.log ("type of infinitynegvar: " + typeof infinitynegvar + " value: " + infinityNegVar);

var nanVar = 5 / 0;
console.log ("type of nanVar: " + typeof nanVar + "value: " + nanVar );

// type coercion: avoid such operation as type of result is complicated
// decided by some complex rule
console.log (8 * null ))

//short-circuit evaluation1
console.log (1 || boolVar)
