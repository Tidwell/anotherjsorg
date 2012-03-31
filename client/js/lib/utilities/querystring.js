//
(function($,ko,BI,undefined) {
	var exposed;

	BI.namespace('utilities.qs')

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

	BI.utilities.qs = exposed;
}(jQuery, ko, BI))