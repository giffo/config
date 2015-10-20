##giffo-config


My node.js config method, a small module that reads the file and presents a nice object.


After dealing with the annoyance of xml config files in my java days I wanted the old style of window's style key=value, json-based config files just doesn't do it for me.




a config file might look like this:
	
	# a nice comment
	// another comment, ever statement on it's own line.
	session.expire = 45
	session.redis.password = "a string password"
	session.redis.host = "392.329329.32.323";
	superduper = "awesome"
	test.array = hello, this, is a ,test, of, an , array
	test.boolean = true

usage:
	
	var config = require("giffo-config")("default.conf");
	
	config("session.redis.password"); // returns "a string password"
	config("session"); // returns the session object
	config("session.expire"); // ?todo?returns the number 45 and not a string


or get the object entirely in a single fetch:

	var configObj = require("giffo-config")("config-test-file.conf")(); 

	console.log(configObj.session.store);


or a more traditional presentable/verbose method (not writing require("giffo-config")) if using more than a single config file etc.

	var Config = require("giffo-config");
	
	var appConfig = new Config("app.conf");
	var serverConfig = new Config("server.conf");

	var favColor = appConfig("favcolor");
	var serverTimeouts = serverConfig("timeout");

*this module a read only, there is no mechanism to save changes to the config file to disk.* 


number, boolean and array data-types are converted from the string to their relevant type. putting quotes around a value does not convert.

example:
	server.port = "4532"

results in 4532 in the string datatype

	server.port = 4223
results in a number datatype

---


this would cause an error, password attempted to access it as an object when it was initially assigned as a string.

	password = "hello"
	password.saltlen = 24
	password.keylen = 40
	password.iterations = 4000
