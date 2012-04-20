/**
	Used to store and retrieve data
	about the current page (called often via php)

	@module pageData
**/

/**
	@class pageData
	@namespace BI 
	@static
**/
(function($,ko,BI,undefined) {
	var exposed;

	//hash to store key:val pairs
	var pageData = {};

	BI.namespace('pageData')

	/** 
		Sets some data
		
		@method set
		@param {String} key
		@param {String} value

		@return {void}
	**/

	function set(key,value) {
	  pageData[key] = value;
	}

	/** 
		Gets some data
		
		@method get
		@param {String} key
		@param {String} value

		@return {Any}
	**/

	function get(key) {
	  return pageData[key];
	}

	/** 
		Gets all
		
		@method getAll

		@return {Objet}
	**/

	function getAll(key) {
	  return pageData;
	}


	exposed = {
		set: set,
		get: get,
		getAll: getAll
	}

	BI.pageData = exposed;
}(jQuery, ko, BI))