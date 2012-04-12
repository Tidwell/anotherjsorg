/*
Custom helper functions for doing basic tasks with data sets and knockout

dependancies: jquery, knockout, knockout.mapping, base
*/
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
	  	var vm,
	  		data = opt.data,
	  		blankObj = opt.dataTemplate,
	  		compositeObj;

		var compositeObj = templateExtend(data,blankObj)

	  	//apply custom knockout bindings
	  	vm = wrap(compositeObj);

		return vm;
	}

	//merges data into object based on a blank object (with templating support for arrays)
	//this allows us to assure that when objects are nested in arrays, they will still have all
	//the properties in the blank
  	function templateExtend(obj,blank) {
	  	//iterate over the blank
	  	for (property in blank) {
	  		if (blank.hasOwnProperty(property)) {
	  			//if the object already has the property, we'll run it through the array template extend
	  			//this is the only portion of this loop that is not identical to the behavior of $.extend(true,[...])
	  			if (obj[property]) {
	  				obj[property] = arrayItemTemplateExtend(obj[property],blank[property]);
	  				continue;
	  			}
	  			//if the new obj doesn't have the property, add it
	  			if (typeof obj[property] == 'undefined') {
	  				obj[property] = blank[property]
	  			} else {
	  				//otherwise its already got the property, so lets keep extending
	  				templateExtend(obj[property],blank[property])
	  			}
	  		}
	  	}
	  	return obj;
	}

	//takes an arbitrary object and a blank "template" object
	//if the item is an array, will call extend for each item in the array
	//thus ensuring that each item in the array has the same fields as the blank
	function arrayItemTemplateExtend(item,blank) {
		if (item instanceof Array) {
			$(item).each(function(i,val){
				templateExtend(val,blank[0])
			})
		}
		return item;
	}

	

	//recursively removes the __ko_mapping__
	//property from objects, also recurses over values
	//inside of arrays and calls recursiveRemove
	function recursiveRemoveKoMap(d) {
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


	function sanitize(data) {
		data = ko.toJSON(data);
		data = eval('('+data+')');
		data = recursiveRemoveKoMap(data);
		return data;
	}

	/*
	A wrapper for ko.mapping.fromJS
	*/
	function wrap(data) {
		return ko.mapping.fromJS(data);		
	}

	//expose methods to the BI namespace
	BI.ko = {
		constructViewModel: constructViewModel,
		wrap: wrap,
		templateExtend: templateExtend,
		sanitize: sanitize
	};
}(jQuery, ko, BI))