/**
	Used to store and retrieve data about the server path to the library
	(for including scripts, css, relative links, etc)

	@module cmsPath
**/

/**
	Used to store and retrieve data about the server path to the library
	(for including scripts, css, relative links, etc).

	Common paths set:
		'rootAssets'

	@class cmsPath
	@namespace BI.location
**/
(function($,ko,BI,undefined) {
	var exposed;

	var paths = {
		rootAssets: '/assets/'
	};

	BI.namespace('location')

	/** 
		Sets a path
		
		@method set
		@param {String} key
		@param {String} value

		@return {void}
	**/

	function set(key,value) {
	  paths[key] = value;
	}

	/** 
		Gets a path
		
		@method get
		@param {String} key
		@param {String} value

		@return {void}
	**/

	function get(key) {
	  return paths[key];
	}

	exposed = {
		set: set,
		get: get
	}

	BI.location.cmsPath = exposed;
}(jQuery, ko, BI))