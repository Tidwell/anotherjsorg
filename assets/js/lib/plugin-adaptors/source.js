//Allows us to use jquery color picker with knockout data bindings (an adapter)
(function($,ko,undefined) {

	//add a new data-bind attribute to knockout for the plugin (allows data-bind="colorpicker: dataVal")
	ko.bindingHandlers.source = {
		//init is passed the element and a function that returns a set/get function
		//for the corresponding value in the view model
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
	    	var opt = allBindingsAccessor();
	    	var currentVal = opt.value();

            setTimeout(function(){
                $(dummyAuthors).each(function(i,val) {
                    $(element).append('<option value="'+val+'">'+val+'</option>');
                });
                $(element).find('option[value="'+opt.value()+'"]').attr('selected','selected');
                viewModel['dsource'] = ko.mapping.fromJS(dummyAuthors);
            },2000);

            
	    },
	    //called whenever the viewmodel is updated
	    update: function(element, valueAccessor) {
	    	
	    }
	};
}(jQuery, ko))