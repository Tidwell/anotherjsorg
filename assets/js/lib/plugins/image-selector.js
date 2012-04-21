(function($,BI,undefined){
	var $browser;
	//used to keep track of which input the editor is currently effecting
	var updateEl;

	/*TEMPLATES*/
	var buttonTemplate = '\
	<div class="image-selector">\
  		<button rel="upload">Upload</button>\
  		<button rel="select">Select</button>\
  		<button rel="clear">Clear</button>\
  	</div>';

  	var browserTemplate = '\
  	<div id="image-browser">\
  		<p>Search: <input type="text" /><span class="pagination"></span><a class="close">X</a></p>\
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
	}

	//shows the image browser and adjusts its offset from the top of the screen
	//relative to the element that called it
  	var launchImageBrowser = function(opt) {
  		$('#image-browser').show();
  		$('#image-browser').css('top',opt.top);
  		getImageList();
  	};

  	//makes an ajax request to get a list of images
  	var getImageList = function() {
  		$browser.find('.results').html('Loading...');
  		$.ajax({
			type: 'GET',
			url: '/cms/ajax/imagesearch',
			data: {q: '',start: 0},
			dataType: 'json',
			success: function(json) {
				var results = json.results;
				//append the results
				var resultEl = $browser.find('.results');
				resultEl.html('');
				$(json.results).each(function(i,data) {
					resultEl.append(resultTemplate(data));
				})
			}
		});
  	}

	//this is the element triggering the action
	var trigger = function() {
		updateEl = $(this).parent().prev();
		var el = $(this);
		switch(el.attr('rel')) {
			case 'select':
				launchImageBrowser({
					top: el.offset().top+el.height()+9
				});
				break;
		}
		return false; //preventDefault and stopProp
	}

	//called on page load
	var init = function() {
		//adds the template to the page
		$('body').append(browserTemplate);
		$browser = $('#image-browser');

		//bind the close event
		$browser.on('click','.close',function() {
			$browser.hide();
			return false; //stopProp and preventDefault
		})
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
	  $(buttonTemplate).insertAfter($el)
	  	//bind click event
	  	.on('click','button',trigger);

	  	$browser.on('click','.result',function() {
			if (updateEl.data('imageselector') == $el.data('imageselector')) {
				var val = $(this).attr('rel');
				$browser.hide();
				updateEl.val(val);
				options.onUpdate(val)
			}	
			return false; //stopProp and preventDefault
		})
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