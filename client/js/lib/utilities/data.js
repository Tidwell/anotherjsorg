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
		//make ajax call (todo) - just console.log the result
		data = ko.toJSON(data);
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
		{ name: '', company: '', title: '', header: '' }
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
		{ name: 'Bob', company: 'AT&T' },
		{ name: 'John', title: 'CFO', company: 'AT&T' },
		{ name: 'Bob', header: 'A Other Bob' }
	]
}
