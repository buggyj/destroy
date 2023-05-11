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
Widget.prototype.desendDestroy = function() {
	this.blockRemoveChildDomNodes = true;//for blocking calls of removeChildDomNodes within a destroy method- 
										 //use removeLocalDomNodes instead
	this.desendDestroyInner();    
	this.blockRemoveChildDomNodes = false;
};


Widget.prototype.desendDestroyInner = function() {
/*
Depth first destroy
*/
	$tw.utils.each(this.children,function(childWidget) {
		childWidget.desendDestroyInner();
	});
	//acsending back up the tree
	this.destroy();
}
/*
Legacy entry into destroy procedure
*/
Widget.prototype.removeChildDomNodes = function() {
	if (this.blockRemoveChildDomNodes) throw("removeChildDomNodes() cannot be called from within a destroy() function");
	this.desendDestroy();
};
/*
Default destroy
*/
Widget.prototype.destroy = function() {
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
