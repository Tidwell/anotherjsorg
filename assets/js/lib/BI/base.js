/**
    Define our global BI variable (and organization methods)
    This is a singleton defined using the Revealing Module Pattern 
    
    @module base
    @requires jquery
**/
/**
    Provides utility methods for adding features to the global object
    @class BI
    @static   
**/

(function($, window, undefined) {
    var exposed;

    /**
        Takes a dot-deliminated (string) and ensures it exists on global BI object
        http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/

        @method namespace
        @param {String} dot.deliminated.namespace 
        @return {Object} parent of namespace (allows direct assignment)
    **/
    function namespace(namespaceString) {
	    var parts = namespaceString.split('.'),
	        parent = exposed,
	        currentPart = '';    

	    for(var i = 0, length = parts.length; i < length; i++) {
	        currentPart = parts[i];
	        parent[currentPart] = parent[currentPart] || {};
	        parent = parent[currentPart];
    	}
	    return parent;
	}   

    
    exposed = {
        namespace: namespace
    }

    window.BI = window.BI || exposed;

})($, window);