var config = require("../config.js")("config-test-file.conf");






//console.log(config("session.redis.password"));

//console.log(config("session"));

//console.log(config());

var LOOPS = 100000;
var a = 0;
console.time("a");
for(var i=0;i<LOOPS;i++) {
	a = config("session.store");
}
console.log("time taken for access session.store "+LOOPS+" times is:");
console.timeEnd("a");

console.log(a);


function isNumber(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}


/*
var utils = require("giffo-utils");
utils.builtins();
console.log(Array.is(config("test.array")));
*/

console.log("testing type conversion works");
console.log("number:" + typeof(config("test.number")));
console.log("boolean:" + typeof(config("test.boolean")));
console.log("array:" + (config("test.array") instanceof Array));


console.log(config("site.motto"));


//console.dir(config("test.array"))
//console.log(a.redis);
//console.log(a.redis.port);

console.log(config().server);





// get the object 
var configObj = require("../config.js")("config-test-file.conf")();

console.log(configObj.session.store);




// todo:
// write a test getting multiple config files



