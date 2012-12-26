/*\
title: $:/core/modules/commands/newsavetiddler.js
type: application/javascript
module-type: command

Command to save a tiddler to a file

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
	name: "newsavetiddler",
	synchronous: false
};

var Command = function(params,commander,callback) {
	this.params = params;
	this.commander = commander;
	this.callback = callback;
};

Command.prototype.execute = function() {
	if(this.params.length < 2) {
		return "Missing filename";
	}

if(!this.commander.wiki.vocabulary) {
	this.commander.wiki.new_initParsers();
}



	var self = this,
		fs = require("fs"),
		path = require("path"),
		title = this.params[0],
		filename = this.params[1],
		type = this.params[2] || "text/html";
	fs.writeFile(filename,this.commander.wiki.new_renderTiddler(type,title),"utf8",function(err) {
		self.callback(err);
	});
	return null;
};

exports.Command = Command;

})();