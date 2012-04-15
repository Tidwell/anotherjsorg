(function($,ko,BI,undefined) {
	BI.namespace('data')

	//returns dummy content
	function get(opts) {
	  var   callback = opts.callback,
	  		id = opts.id,
	  		type = opts.type;
	  if (type == 'author_list') {
	  	callback(dummyAuthors);
	  }
	  //make ajax call (todo) - sending back dummy content for now
	  else if (id) {
		  callback(dummyEvent,blankEvent)
	  } else {
	  	callback({},blankEvent)
	  }
	}

	function save(type,data) {
		//make a copy of the data to prevent the transormations from mucking
		//with the viewmodel
		data = $.extend(true,{},data);
		//get a clean object without any knockout stuff
		data = BI.mvvm.unwrap(data);
		console.log('saved '+type,data);
	}

	BI.data = {
		get: get,
		save: save
	}
}(jQuery, ko, BI))


//DUMMY CONTENT
var blankEvent = {
	// setup and landing page
	title: '',
	url: '',
	tagline: '',
	taglineColor: '',
	register_button_color: '',
	nav_color_picker: '',
	logo: '',
	landing_content: '',
    register_button: 0,
	register_url: '',
	// agenda 
	agenda_content: '',
	type: 'event',
	id: undefined,
    speakers_header: '',
	speakers: [
		{ photo: '', name: '', company: '', title: '', header: '', featured: '', bio: ''}
	],
    venue_content: '',
    tickets_content: '',
    sponsor_content: '',
    contact_content: '',
    press_content: '',
	rightRail: [
		{ header: '', logos: [{ img: '', url: '' }] }
	],
	author: ''
},
dummyEvent = {
	// setup and landing page
	author: 'Sally',
	title: 'A short Title',
	url: '',
	tagline: 'this event rocks !',
	taglineColor: 'cccccc',
	register_button_color: 'd3d3d3',
	nav_color_picker: 'f32456',
	logo: 'blah-logo.jpg',
	landing_content: 'langind apge content blah blah blah blah blah blah',
    register_button: 1,
    register_url: 'http://eventbright.com/some-event-url',
    // agenda 
	agenda_content: 'agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda agenda',
	type: 'event',
	id: 123,
    speakers_header: 'featured speakers',
	speakers: [
		{ photo: 'atandt.jpg', name: 'Bob', title: 'most awesome officer', company: 'AT&T'},
		{ photo: 'john.jpg', name: 'John'},
		{ photo: 'bob.jpg', name: 'Bob', title: 'lead hacker', company: 'gawker', featured: 1, bio: 123 }
	],
    venue_content: 'venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content venue_content',
    tickets_content: 'tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content tickets_content',
    sponsor_content: 'sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content sponsor_content',
    contact_content: 'contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content contact_content',
    press_content: 'press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content press_content',
	rightRail: [
		{ header: 'section CAT', logos: [
                                        { img: 'panther.jpg'},
                                        { img: 'cheetah.jpg', url: 'http:://cheetah.com' },
                                        { img: 'lion.jpg', url: 'http:://lion.com' }
                                        ] },
		{ 						  logos: [
                                        { img: 'pointer.jpg', url: 'http:://pointer.com' },
                                        { img: 'wolfhound.jpg', url: 'http:://wolfhound.com' }
                                        ] }
	],
}
dummyAuthors = [
	'Bob',
	'Sally',
	'Toni',
	'Josh'
]
