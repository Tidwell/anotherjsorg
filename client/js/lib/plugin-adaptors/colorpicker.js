//Allows us to use jquery color picker with knockout data bindings (an adapter)
(function($,ko,undefined) {

	//add a new data-bind attribute to knockout for the plugin (allows data-bind="colorpicker: dataVal")
	ko.bindingHandlers.colorpicker = {
		//init is passed the element and a function that returns a set/get function
		//for the corresponding value in the view model
	    init: function(element,valueAccessor) {
	    	var observable = valueAccessor();
	    	//init the colorpicker jquery plugin
	    	$(element).ColorPicker({
	    		//when colorpicker submit:  hide picker, and update viewmodel
				onSubmit: function(hsb, hex, rgb, el) {
					$(el).ColorPickerHide();
					observable(hex);
				}
			})
			//make colorpicker update when typing in the form field
			.bind('keyup', function(){
				$(this).ColorPickerSetColor(this.value);
			});
	    },
	    //called whenever the viewmodel is updated
	    update: function(element, valueAccessor) {
	    	//get current value and pass it to the color picker
	        var currentValue = valueAccessor();
	        $(element).ColorPickerSetColor(currentValue);
	    }
	};
}(jQuery, ko))