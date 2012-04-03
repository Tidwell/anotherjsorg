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

	  	//create a copy and merge the data into the blank object (just in case its missing something)
	  	compositeObj = $.extend(true,$.extend(true,{},blankObj),data);
	  	//apply custom knockout bindings
	  	vm = wrap(compositeObj);

		return vm;
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
		wrap: wrap
	};
}(jQuery, ko, BI))