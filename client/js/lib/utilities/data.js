(function($,ko,BI,undefined) {
	BI.namespace('data')

	function get(opts) {
	  var   callback = opts.callback,
	  		id = opts.id,
	  		type = opts.type;

	  //make ajax call (todo) - sending back dummy content for now
	  if (id) {
		  callback(dummyEvent,blankEvent)
	  } else {
	  	callback({},blankEvent)
	  }
	}


	function save(type,data) {
		//make a copy of the data just in case
		data = $.extend(true,{},data);
		//remove the ko property
		delete data.__ko_mapping__;
		//convert to json
		data = ko.toJSON(data);

		//make ajax call (todo) - just console.log the result
		data = eval('('+data+')');
		console.log('saved '+type,data);
	}

	BI.data = {
		get: get,
		save: save
	}
}(jQuery, ko, BI))


//DUMMY CONTENT
var blankEvent = {
	title: '',
	url: '',
	tagline: '',
	taglineColor: '',
	type: 'event',
	id: undefined,
	speakers: [
		{ name: '', company: '', title: '', header: '', email: '', address: ''}
	],
	rightRail: [
		{ header: '', logos: [{ img: '', url: '' }] }
	]
},
dummyEvent = {
	title: 'A short Title',
	url: '',
	tagline: '',
	taglineColor: 'cccccc',
	type: 'event',
	id: 123,
	speakers: [
		{ name: 'Bob', title: '', company: 'AT&T', header: '', email: '',address: 123 },
		{ name: 'John', title: 'CFO', company: 'AT&T', header: '', email: '',address: 123 },
		{ name: 'Bob', title: '', company: '', header: 'A Other Bob', email: '',address: 123 }
	]
}
