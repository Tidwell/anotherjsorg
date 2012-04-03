// Helper to get querystring params
// If more flexable URI manipulation required, replace with: 
// https://github.com/medialize/URI.js
(function($,ko,BI,undefined) {
	var exposed;

	BI.namespace('location')

	function getParameterByName(name) {
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if(results == null)
	    return "";
	  else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	exposed = {
		get: getParameterByName
	}

	BI.location.qs = exposed;
}(jQuery, ko, BI))