/*
    Define our global variable (and only entry point
    Provides utility methods for adding features to itself

    This is a singleton defined using the Revealing Module Pattern

    Dependancy: jquery
*/

(function($, window, undefined) {
    var exposed;

    //takes a key (string) and an object to add to the
    //BI global as a module
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