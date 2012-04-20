/**
	Custom helper functions for doing basic tasks with data sets and knockout
	Abstracted as MVVM should we ever need to replace knockout

	@module mvvm
	@requires jquery, knockout, knockout.mapping, base
**/

/**
	Custom helper functions for doing basic tasks with data sets and knockout
	@class mvvm
	@namespace BI
**/
(function($,ko,BI,undefined) {
	BI.namespace('mvvm')

	/**
		Constructs a new view model, wrapping an object with knockout.js data types 
		and filling in any missing properties that exist on the dataTemplate

		@method constructViewModel
		@param {Object} options
			@param {Object} [options.data] Populated object matching options.dataTemplate
			@param {Object} options.dataTemplate Empty template object with single examples for arrays

		@return {object} Merged, Knockout-extended version of data

	*/
	function constructViewModel(opt) {
	  	var vm,
	  		data = opt.data,
	  		blankObj = opt.dataTemplate,
	  		compositeObj;

		var compositeObj = templateExtend(data,blankObj)
	  	//apply custom knockout bindings
	  	vm = wrap(compositeObj);

		return vm;
	}

	/**
		Merges data into object based on a blank object (with templating support for arrays)
		this allows us to assure that when objects are nested in arrays, they will still have all
		the properties in the blank.

		@method templateExtend
		@param {Object} populated
		@param {Object} template

		@return {Object} fully merged object
	**/
  	function templateExtend(obj,blank) {
	  	//iterate over the blank
	  	for (property in blank) {
	  		if (blank.hasOwnProperty(property)) {
	  			//if the object already has the property, we'll run it through the array template extend
	  			//this is the only portion of this loop that is not identical to the behavior of $.extend(true,[...])
	  			if (obj[property]) {
	  				if (obj[property] instanceof Array) {
		  				obj[property] = arrayItemTemplateExtend(obj[property],blank[property]);
		  				//next property
						continue;
					}
	  			}
	  			//if the new obj doesn't have the property, add it
	  			if (typeof obj[property] === 'undefined' || obj[property] === null) {
	  				obj[property] = blank[property]
	  			} else {
	  				//otherwise its already got the property, so lets keep extending
	  				templateExtend(obj[property],blank[property])
	  			}
	  		}
	  	}
	  	return obj;
	}

	/**
		Takes an arbitrary variable and a blank "template" object
		if the item is an array, will call extend for each item in the array
		thus ensuring that each item in the array has the same fields as the blank

		@method arrayItemTemplateExtend
		@private
		@param {Any} any value
		@param {Object} blank object template

		@return cleaned item
	**/
	function arrayItemTemplateExtend(item,blank) {		
		$(item).each(function(i,val){
			templateExtend(val,blank[0])
		})
		return item;
	}

	

	/**
		Recursively removes the __ko_mapping__ property from objects, also recurses over values
		inside of arrays and removes properties from any objects

		@method recursiveRemoveKoMap
		@private
		@param {object} any object

		@return {object} cleaned object
	**/
	function recursiveRemoveKoMap(d) {
		if (!d) {return d}
		if (typeof d == 'object' && d.__ko_mapping__) {
			delete d.__ko_mapping__;
		}
		for (property in d) {
	  		if (d.hasOwnProperty(property)) {
	  			if (d[property] instanceof Array) {
	  				$(d[property]).each(function(i,val) {
	  					if (typeof val == 'object') {
		  					recursiveRemoveKoMap(val)
		  				}
	  				});
	  			}
	  			else if (typeof d[property]=='object') {
	  				recursiveRemoveKoMap(d[property]);
	  			}
	  		}
	  	}
	  	return d;
	}

	/**
		An unwrapper for knockout viewmodels to get plain javascript objects

		@method unwrap
		@param {Object} knockout-extended Object

		@return {Object} cleaned Object
	**/
	function unwrap(data) {
		//converts data form knockout observables to stringified-json
		data = ko.toJSON(data);
		//parse back to json
		data = JSON.parse(data);
		data = recursiveRemoveKoMap(data);
		return data;
	}

	/**
		A wrapper for ko.mapping.fromJS

		@method wrap
		@param {Object} Any object

		@return {Object} ko.mapping.fromJS(param)
	**/
	function wrap(data) {
		return ko.mapping.fromJS(data);		
	}

	/**
		A wrapper for ko.applyBindings

		@method applyBindings
		@param {Object} Any object

		@return {Object} ko.applyBindings(param)
	**/
	function applyBindings(viewModel) {
		return ko.applyBindings(viewModel);
	}

	//expose methods to the BI namespace
	BI.mvvm = {
		constructViewModel: constructViewModel,
		wrap: wrap,
		templateExtend: templateExtend,
		unwrap: unwrap,
		applyBindings: applyBindings
	};
}(jQuery, ko, BI))