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
        	this.rails.push(BI.mvvm.wrap($.extend(true,{},dataModel.rails[0])));
        },
        deleteSection: function(currentlogo, ev) {
            vm.rails.remove(this);
        },
        
        addLogo: function(sectionData) {
        	//one line, doing same as above
        	this.data.push(BI.mvvm.wrap($.extend(true,{},dataModel.rails[0].data[0])))
        },
        deleteLogo: function(currentlogo, ev) {
            $ev = $(ev.srcElement)
            var index = $ev.parents('.sponsor').index();
            vm.rails()[index].data.remove(this);
        },
        save: function() {
        	//TODO make ajax to save
            console.log(BI.mvvm.unwrap(this));
            return false;
        }
    };

    
	//store the blank data model so we can use it later in the operations.
	dataModel = BI.pageData.get('emptyEvent');
	data = BI.pageData.get('event')

    if (console) {
        console.log('model',dataModel);
        console.log('data',BI.pageData.get('event'))
    }
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

	//initialize the DOM bindings
	BI.mvvm.applyBindings(viewModel);
 
}(jQuery, ko, BI))
