//dependancy jquery, jquery.form
(function($,BI,undefined){
	var $browser,$uploader;
	//internal state, defaults
	var state = {
		start : 0,
		setLength: 18,
		count: 0
	}
	//used to keep track of which input the editor is currently effecting
	var updateEl,activeButtons,updateCB;

	/*TEMPLATES*/
	var buttonTemplate = '\
	<div class="image-selector">\
  		<button rel="upload">Upload</button>\
  		<button rel="select">Select</button>\
  		<button rel="clear">Clear</button>\
  		<img src=""/>\
  		<span></span>\
  	</div>';

  	var browserTemplate = '\
  	<div id="image-browser">\
  		<p class="hdr">Search: <input type="text" /><span class="pagination"></span><a class="close">X</a></p>\
  		<div class="results"></div>\
  	</div>';

  	var resultTemplate = function(data) {
  		var desc = data.description;
  		if (desc.length > 18) {
  			desc = desc.slice(0,18)+'...'
  		}
  		return '\
  		<div class="result" rel="'+data._id.$id+'">\
	  		<div class="delete-image">X</div>\
	  		<div class="result-insert" title="'+data.description+'">\
		  		<img src="'+data.uri+'" />\
		  	</div>\
		  	<div class="description">'+desc+'</div>\
		  	<div class="size">'+data.size+'</div>\
		</div>';
	};

	var paginationTemplate = function(obj) {
		var html = '';
		obj.start
		obj.count
		obj.results.length
		//prev link
		if (obj.start > 0) {
			html += '<a class="back">< Prev</a> '
		}
		//result set range
		html += obj.start+'-'+(obj.start+obj.results.length)+' of '+obj.count;
		//next link
		if (obj.count > obj.start+obj.results.length) {
			html += ' <a class="next">Next ></a>'	
		}
		return html;
	}

	var uploadTemplate = function() {
		var chartCatagories = [
			'Housing',
			'Stocks',
			'Currencies',
			'Oil',
			'Employment',
			'Tech',
			'Advertising',
			'Startups',
			'Retail',
			'Sports'
		];

		var html = '\
			<div id="image-uploader">\
				<p class="hdr">Image Uploader<a class="close">X</a></p>\
				<form action="/cms/ajax/upload" method="post" enctype="multipart/form-data">\
					<p><label>File</label><input type="file" name="file" /></p>\
					<p><label>Description</label><input type="text" name="description"/></p>\
					<p><label>Caption</label><input type="text" name="caption"/></p>\
					<p><label>Source</label><input type="text" name="source"/></p>\
					<p><label>Link</label><input type="text" name="link"/></p>\
					<p><label>Is Chart?</label><input type="checkbox" name="tags[]" class="tag-toggle" /></p>\
					<div class="tag-list"><label>Tags</label><ul>';
						$(chartCatagories).each(function() {
							html += '<li><input type="checkbox" name="tags[]" value="'+this+'"/>'+this+'</li>';
						})
			html += 	'</ul></div>\
					<input type="hidden" value="json" name="format" />\
					<p><button>Upload</button></p>\
				</form>\
			</div>';
		return html;
	}

	//shows the image browser and adjusts its offset from the top of the screen
	//relative to the element that called it
  	var launchImageBrowser = function(opt) {
  		$('#image-browser').show();
  		$('#image-browser').css('top',opt.top);
  		getImageList();
  	};

  	//shows the image uploader and adjusts its offset from the top of the screen
	//relative to the element that called it
  	var launchImageUploader = function(opt) {
  		$uploader.show();
  		$uploader.find('input[type="text"]').val('');
  		$uploader.find('input[type="file"]').val('');
  		$uploader.css('top',opt.top);
  	};

  	//makes an ajax request to get a list of images
  	//@arg {Number} {optional} initial offset, defaults to state.start (current start) or zero
  	//ajax returns 18 results
  	var getImageList = function(start,query) {
  		$browser.find('.results').html('Loading...');
  		$.ajax({
			type: 'GET',
			url:  '/cms/ajax/imagesearch',
			data: {q: query||'',start: start || state.start || 0},
			dataType: 'json',
			success: function(json) {
				//store internal state
				state.start = json.start;
				state.setLength = json.results.length;
				state.count = json.count;
				//generate the pagination
				$('#image-browser p .pagination').html(paginationTemplate(json));
				//append the results
				var resultEl = $browser.find('.results');
				resultEl.html('');
				$(json.results).each(function(i,data) {
					resultEl.append(resultTemplate(data));
				})
			}
		});
  	}

  	//called when the delete image button is clicked
  	var deleteImage = function(id) {
		if (confirm('Are you sure you want to permanently delete this image?')) {
			$.post('/cms/ajax/delete_image', {id: id})
			.success(function(json) {
				getImageList();
			});
		}
		return false; //preventDefault and stopPropagation
	}

	//called on page load, sets up the single instance of the image browser
	var init = function() {
		//adds the template to the page
		$('body').append(browserTemplate).append(uploadTemplate);
		//set the global refrence
		$browser = $('#image-browser');
		$uploader = $('#image-uploader');
		
		//bind the close events
		$browser.on('click','.close',function() {
			$browser.hide();
			return false; //stopProp and preventDefault
		})
		$uploader.on('click','.close',function() {
			$uploader.hide();
			return false; //stopProp and preventDefault
		})

		//bind pagination
		$browser.on('click','.pagination a',function() {
			var newStart;
			if ($(this).hasClass('next')) {
				newStart = (state.start+state.setLength) < state.count ? (state.start+state.setLength) : state.count-state.setLength;
			} else {
				newStart = state.start-state.setLength > 0 ? state.start-state.setLength : 0;
			}
			getImageList(newStart);
			return false; //stopProp and preventDefault
		})

		//bind delete-image button
		$browser.on('click','.delete-image',function() {
			deleteImage($(this).parent().attr('rel'));
		})

		//bind image-select click event
		$browser.on('click','.result img',function() {
			//grab the value from the element
			var val = $(this).parent().parent().attr('rel');
			$browser.hide();
			updateEl.val(val);
			//set the image preview
			activeButtons.find('img').attr('src',$(this).attr('src'))
			//set the title
			activeButtons.find('span').html($(this).parent().attr('title'))
			//call the users onUpdate method
			updateCB(val)
		});	

		//bind auto search
		$('#image-browser input').keypress(function(e) {
			if (e.which == 13) {
				return false;
			}
			getImageList(0,$('#image-browser input').val());
		});

		//bind uploader form
		$uploader.find('form').ajaxForm(function(result) { 
            if (result.error) {
            	alert(result.error);
            	return;
            }
            else if (result.id) {
				//set the image preview
				activeButtons.find('img').attr('src',result.src)
				//set the title
				activeButtons.find('span').html(result.filename)
				updateCB(result.id);
            	$uploader.hide();
            }
        });
        
        //setup form checking (prevent submit if no val)
        $uploader.find('button').attr('disabled','disabled');
        $uploader.find('input[type="file"]').change(validateFile)

        //setup the tag toggler
        $uploader.on('click','.tag-toggle',function() {
        	$uploader.find('div').toggle();
        })


	}

	var validateFile = function() {
		if ($(this).val()) {
			$uploader.find('button').removeAttr('disabled');
		}
	}

	//plugin "constructor"
	var ImageSelector = function(element, options) {
	  //Instance Vars
	  var $el = $(element);
	  //Extend the user-defined options with defaults
	  this.options = $.extend({}, {defaults: '', options: ''}, options);
	  //hide the element
	  $el.hide();
	  //replace with the selector widget
	  var newButtons = $(buttonTemplate).insertAfter($el)

	  //bind upload click event
	  newButtons.on('click','button[rel="upload"]',function() {
	  	$('#image-browser').hide();
	  	updateEl = $(this).parent().prev();
	  	activeButtons = newButtons;
	  	updateCB = options.onUpdate;
	  	launchImageUploader({
			//pass in the offset of the element so we can reposition the imagebrowser
			top: $(this).offset().top+$(this).height()+9
		});
		return false; //preventDefault and stopProp
	  });

	  //bind select click event
	  newButtons.on('click','button[rel="select"]',function() {
	  	$('#image-uploader').hide();
	  	updateEl = $(this).parent().prev();
	  	activeButtons = newButtons;
	  	updateCB = options.onUpdate;
	  	launchImageBrowser({
			//pass in the offset of the element so we can reposition the imagebrowser
			top: $(this).offset().top+$(this).height()+9
		});
		return false; //preventDefault and stopProp
	  });

	  //bind clear click event
	  newButtons.on('click','button[rel="clear"]',function() {
	  	updateEl = $(this).parent().prev();
	  	updateEl.val('');
		//set the image preview
		newButtons.find('img').replaceWith('<img />');
		//set the title
		newButtons.find('span').html('')
	  	options.onUpdate('');
		return false; //preventDefault and stopProp
	  });	  

	  //auto populate
	  newButtons.find('span').html($el.val())
	};

	//ImageSelector.prototype.publicMethod = function() {};

	//boilerplate
	$.fn.imageselector = function(option) {
	  return this.each(function () {
	    var $this = $(this),
	      data = $this.data('imageselector'),
	      options = typeof option == 'object' && option;
	    if (!data) {
	      $this.data('imageselector', (data = new ImageSelector(this, options)));
	    } else if (typeof option == 'string') {
	      data[option]();
	    }
	  });
	};

	//kickoff internal init
	init();
}(jQuery,BI));