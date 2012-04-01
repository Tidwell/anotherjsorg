//Controller for the Events data type
//define operations the UI can impliment
//get the event data and generate a knockout view model
//initialize knockout
(function($,ko,BI,undefined) {
	var dataModel;

	// Operations we can perform on the data set from the UI
    var operations = {
    	addSpeaker: function() {
    		//create a copy of the speaker template and add a new one to our data
    	    this.speakers.push($.extend({},dataModel.speakers[0]));
    	},
		save: function() {
        	BI.data.save('event', this);
        }
    };

    //grab the event id from the querystring
    BI.data.get({
		type: 'event',
		id: BI.utilities.qs.get('id'), 
		callback: function(data,blankObj) {
			//store the data so we can use it later if we need it
			dataModel = blankObj;
			
			//construct a view model with the data that was returned
			var viewModel = BI.ko.constructViewModel({
				data: data,
				dataTemplate: blankObj
			});

			//add operations we defined to the viewModel
			$.extend(viewModel,operations);
			
			//init knockout
			ko.applyBindings(viewModel);
		}
	});
 
}(jQuery, ko, BI))