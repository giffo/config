/* Copyright (c) 2015 Giffo. All rights reserved.*/

var fs = require("fs");

//TODO: verify config file exists



var ConfigFile = module.exports = function(filename) {
	var name = filename + (filename.endsWith(".conf")?"":".conf"); // test for .conf?
	
	
	
	
	
	// TODO:
	// check for filename,
	// check for .conf files in directory in process.cwd(); ?? should be done externally?
	// resolve to cwd() etc if not absolute
	
	var obj = {};
	
		
	// omg blocking, i expect configs are loaded at startup, not going to spent anytime thinking about async atm
	// TODO: this whole area needs error checking, if the file exists etc
	var lines = fs.readFileSync(name, "utf8").toString().split("\n");
	
	
	try {
		load();
	} catch(e) {
		console.log("error loading configs >\n"+e);
	}
	
	function load(){
		var s = null;
		for(var i=0,len = lines.length;i<len;i++) {
			lines[i] = lines[i].trim();
			// check for comments
			// this doesn't even need to be done as any illegal name "//key" or "#key" will just fail silently
			// however i feel compelled to actually write this code to not process the comment lines
			if(lines[i].indexOf("//") == 0 || lines[i].indexOf("#") == 0) {
				continue;
			}
						
			
			if(lines[i].indexOf("=") > 0) { // equals sign should not be first character in string
				s = lines[i].split("=");
				setObjectSpace(s[0], s[1]);
			}
			
			
		}
		
		//console.log(obj);
	}
	
	// called from the load() function
	// converts to a js object
	function setObjectSpace(keyString, value) {
		var ks = null;
		
		/*
		if(~keyString.indexOf(".")) {
			obj[keyString] = value;
		} else {
		
		}*/
		
		ks = keyString.split(".");
		var c = ""; // child
		var p = obj; // parent
		
		
		for(var i=0, len=ks.length; i<len; i++) {
			c = ks[i].trim();
			if(i<len-1) {
				p[c] = p[c] || {};
			} else {
				p[c] = value.trim();
				
				// putting quotes around a "value" misses out conversion, i.e. ip address etc, or a number you want as a string
				if(p[c].startsWith("\"") && p[c].endsWith("\"")) {
					// remove quotes
					p[c] = p[c].substring(1,p[c].length-1);
				} else {
					// the following statements convert number, booleans and arrays to their respective datatypes
					if(isNumber(p[c])) {
						p[c] = toNumber(p[c]);
					} else if(isBoolean(p[c])){
						p[c] = toBoolean(p[c]);
					} else if(isArray(p[c])) {
						p[c] = toArray(p[c]);
					}	
					
				}
				
				
				
			}
			
			
			
			p = p[c]; // just a normal simple string
			
			
		}
	}
	
	// used to access the object
	function getObjectSpace(keyString) {
		if(typeof keyString === 'undefined') {
			return obj;
		}
		var ks = keyString.split(".");
		var c = ""; // child
		var p = obj; // parent
		
		
		for(var i=0, len=ks.length; i<len; i++) {
			c = ks[i].trim();
			if(p.hasOwnProperty(c)) {
				p = p[c];	

				
			}
		
		}
		return p;
		
	}
	
	function isArray(a) {
		return (a.indexOf(",") > 0);
	}
	
	function isBoolean(b) {
		return (b.toLowerCase() === "true" || b.toLowerCase() === "false")
	}
	
	// taken from giffo-utils
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);		
	}
	
	function toArray(line) {
		var arr = line.split(",");
		return arr.map(function(element){ // remove spaces before and after
			return element.trim();
		});
	}
	
	function toBoolean(line){
		return (line.toLowerCase() == "true")?true:false;
	}
	
	function toNumber(line) {
		return parseInt(line, 10);
	}
	
	
	// access/get method
	return function(key) {
		return getObjectSpace(key);
	};
};
