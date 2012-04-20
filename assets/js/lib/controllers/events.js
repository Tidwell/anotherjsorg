/*
	Controller for the Events data type
	
	Dependancy: jquery, jquery.validate, jquery.colorpicker, knockout, base, data, ko, querystring, plugins/colorpicker
*/
(function($,ko,BI,undefined) {
	var dataModel, 
        vm,
        data;

	// Define operations the UI can impliment.  At runtime, 'this' will be our
	// active knockout View Model (so we are directly modifying the data that is
	// synced with the DOM)
    var operations = {
    	addSpeaker: function() {
    		//make a copy from the data model
    		var copy = $.extend(true,{},dataModel.speakers[0]);
    		//add knockout datatypes and append to speakers
    	    this.speakers.push(BI.mvvm.wrap(copy));
    	},
        deleteSpeaker: function(currentspeaker, ev) {
            vm.speakers.remove(this);
        },
        addSection: function() {
        	//one line, doing same as above
        	this.rightRail.push(BI.mvvm.wrap($.extend(true,{},dataModel.rightRail[0])));
        },
        deleteSection: function(currentlogo, ev) {
            vm.rightRail.remove(this);
        },
        
        addLogo: function(sectionData) {
        	//one line, doing same as above
        	this.logos.push(BI.mvvm.wrap($.extend(true,{},dataModel.rightRail[0].logos[0])))
        },
        deleteLogo: function(currentlogo, ev) {
            $ev = $(ev.srcElement)
            var index = $ev.parents('.sponsor').index();
            vm.rightRail()[index].logos.remove(this);
        },
        save: function() {
			//we delegate to the data module, passing the entire viewModel
        	BI.data.save('event', this);
        }
    };

    
	//store the blank data model so we can use it later in the operations.
	dataModel = BI.pageData.get('emptyEvent');
	data = BI.pageData.get('event')

    console.log('model',dataModel);
    console.log('data',BI.pageData.get('event'))
	//construct a view model with the data that we put into the page in the
    //template and the blank JSON version of the model
	var viewModel = BI.mvvm.constructViewModel({
		data: data,
		dataTemplate: dataModel
	});

	//extend the viewModel with the operations we defined earlier
	$.extend(true,viewModel,operations);

    vm = viewModel;
    VM = viewModel;

    console.log(viewModel)
	//initialize the DOM bindings
	BI.mvvm.applyBindings(viewModel);

	//initialize the jquery validate plugin to validate the form
	$("form").validate({
		//wrap in an anonymous function so that save has the proper 'this'
		//context as jquery validate will override 'this'
		submitHandler: function() {
			viewModel.save()
		} 
	});
 
}(jQuery, ko, BI))
