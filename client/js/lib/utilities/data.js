//
(function($,ko,BI,undefined) {
	var exposed;

	BI.namespace('data')

	function get(type,id,callback) {
	  callback({
	  	id: id,
	  	speakers: [
	  		{ name: 'Bob',company: 'AT&T' },
	  		{ name: 'John',title: 'CFO', company: 'AT&T' },
	  		{ name: 'Bob',header: 'A Other Bob' }
	  	]
	  })
	}

	function save(type,data) {
		console.log('saved '+type,data,ko.toJSON(data),'id '+data.id);
	}

	exposed = {
		get: get,
		save: save
	}

	BI.data = exposed;
}(jQuery, ko, BI))