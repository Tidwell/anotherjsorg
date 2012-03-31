//
(function($,ko,BI,undefined) {
	// Class to represent a speaker
	function Speaker(opt) {
	    var self = this;
	    self.header = opt.header || ''
	    self.name = opt.name || '';
	    self.title = opt.title || '';
	    self.company = opt.company || '';
	}

	// Viewmodel and init
	function EventsViewModel() {
	    var self = this;
	    self.title = 'default title';
	    self.url = '';
	    self.tagline = '';
	    self.speakers = ko.observableArray([]);

	    //load data
	    BI.data.get('event', BI.utilities.qs.get('id'), function(data) {

	    	

	    	
			//initialize each speaker
			var mappedSpeakers = $.map(data.speakers, function(speaker) { return new Speaker(speaker) });
        	self.speakers(mappedSpeakers);

        	//extend with the rest of the data properties
        	for (property in data) {
        		if (data.hasOwnProperty(property) && !self[property]) {
        			self[property] = data[property];
        		}
        	}
	    });


	    // Operations
	    self.addSpeaker = function() {
	        self.speakers.push(new Speaker({}));
	    }

	    self.save = function() {
	        BI.data.save('event', self);
	    }; 
	}
	
	ko.applyBindings(new EventsViewModel());
}(jQuery, ko, BI))