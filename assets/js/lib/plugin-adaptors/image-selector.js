//Allows us to use jquery color picker with knockout data bindings (an adapter)
(function($,ko,undefined) {

	//add a new data-bind attribute to knockout for the plugin (allows data-bind="colorpicker: dataVal")
	ko.bindingHandlers.imageSelector = {
		//init is passed the element and a function that returns a set/get function
		//for the corresponding value in the view model
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
	    	var observable = valueAccessor();
	    	if (observable) {
		    	$(element).val(observable());
		    }
	    	$(element).imageselector({
	    		onUpdate: function(val) {
	    			var observable = valueAccessor();
	    			observable(val);
	    		}
	    	});
	    },
	    //called whenever the viewmodel is updated
	    update: function(element, valueAccessor) {
	    	var observable = valueAccessor();
	    	$(element).val(observable());
	    }
	};
}(jQuery, ko))