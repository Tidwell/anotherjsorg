/*
	Controller for the Events data type
	
	Dependancy: jquery, knockout, base, data, ko, querystring, 
*/
(function($,ko,BI,undefined) {
	var dataModel;

	// Define operations the UI can impliment.  At runtime, 'this' will be our
	// active knockout View Model (so we are directly modifying the data that is
	// synced with the DOM)
    var operations = {
    	addSpeaker: function() {
    		//make a copy from the data model
    		var copy = $.extend({},dataModel.speakers[0]);
    		//add knockout datatypes and append to speakers
    	    this.speakers.push(BI.ko.wrap(copy));
    	},
        addSection: function() {
        	//one line, doing same as above
        	this.rightRail.push(BI.ko.wrap($.extend({},dataModel.rightRail[0])));
        },
        addLogo: function(sectionData) {
        	//one line, doing same as above
        	this.logos.push(BI.ko.wrap($.extend({},dataModel.rightRail[0].logos[0])))
        },
        save: function() {
			//we delegate to the data module, passing the entire viewModel
        	BI.data.save('event', this);
        }
    };

    //Use BI.data to get the data for the page, and the blank template for the events
    //We use Bi.utilities.qs to grab the event id from the querystring
    BI.data.get({
		type: 'event',
		id: BI.utilities.qs.get('id'), 
		callback: function(data,blankObj) {
			//store the blank data model so we can use it later in the operations.
			dataModel = blankObj;
			
			//construct a view model with the data that was returned using BI.ko
			var viewModel = BI.ko.constructViewModel({
				data: data,
				dataTemplate: blankObj
			});

			//extend the viewModel with the operations we defined earlier
			$.extend(true,viewModel,operations);
			
			//initialize the knockout DOM bindings
			ko.applyBindings(viewModel);
		}
	});
 
}(jQuery, ko, BI))