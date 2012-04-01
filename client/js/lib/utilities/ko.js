//Custom helper functions for easy creation of view models using
//Data sets
(function($,ko,BI,undefined) {
	BI.namespace('ko')

	/*
	Constructs a new view model, creating knockout.js data types 

	opt.data - the populated version of the data model
	opt.dataTemplate - empty version of the data model

	returns a knockout extended version of the data with blank values for
	any unset properties that exist on dataTemplate

	*/
	function constructViewModel(opt) {
	  	var vm = {},
	  		data = opt.data,
	  		blankObj = opt.dataTemplate

	  	//generate knockout data types and add properties to a view model based on
	  	//the object passed
	  	function extendObj(data) {			
			for (prop in data) {
				if (data.hasOwnProperty(prop) && !vm[prop]) {
					//if we have an array
					if (data[prop] instanceof Array) {
		  				vm[prop] = ko.observableArray([])
		  				//create an array of new instances using the blank template
		  				var mappedProp = $.map(data[prop], function(item) { 
		  					return $.extend($.extend({},blankObj[prop][0]),item);
		  				});
		  				//add the new array to the view model
			  			vm[prop](mappedProp);
		  			} else { //a string or number
						vm[prop] = ko.observable(data[prop]);
					}
				}
			}
		}

		extendObj(data);
		extendObj(blankObj);
		return vm;
	}

	//expose methods to the BI namespace
	BI.ko = {
		constructViewModel: constructViewModel
	};
}(jQuery, ko, BI))