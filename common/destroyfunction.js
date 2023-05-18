/*\
title: $:/bj/modules/widgets/destroyfunction.js
type: application/javascript
module-type: widget

extend core for destroying events

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
var Widget = require("$:/core/modules/widgets/widget.js").widget;
 
/*
Entry into destroy procedure
*/
Widget.prototype.destroyChildren = function() {
	$tw.utils.each(this.children,function(childWidget) {
		childWidget.destroy();
	});
};
/*
Legacy entry into destroy procedure
*/
Widget.prototype.removeChildDomNodes = function() {
	this.destroy();
};
/*
Default destroy
*/
Widget.prototype.destroy = function() {
	// call children to remove their resources
	this.destroyChildren();
	// remove our resources
	this.children = [];
	this.removeLocalDomNodes();	
};

/*
Remove any DOM nodes created by this widget 
*/
Widget.prototype.removeLocalDomNodes = function() {
	// If this widget has directly created DOM nodes, delete them and exit.
	if(this.domNodes.length > 0) {
		$tw.utils.each(this.domNodes,function(domNode) {
			domNode.parentNode.removeChild(domNode);
		});
		this.domNodes = [];
	}
};


})();
