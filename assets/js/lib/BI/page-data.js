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

		@return {void}
	**/

	function get(key) {
	  return pageData[key];
	}

	exposed = {
		set: set,
		get: get
	}

	BI.pageData = exposed;
}(jQuery, ko, BI))