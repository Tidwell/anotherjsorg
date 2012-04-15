//Allows us to use tinymce with knockout data bindings (an adapter)
(function($,ko,undefined) {
	var regular_config = {
		mode 			: "specific_textareas",
		editor_selector	: "tinymce",
		theme 			: "advanced",
		convert_urls 	: false ,
		content_css 	: "/assets/css/tinymce.css",
		plugins 		: "table,save,advhr,advlink,advimage,emotions,iespell,insertdatetime,preview,searchreplace,print,contextmenu,paste",
		// Toolbars
		theme_advanced_buttons2_add			: "separator,forecolor,backcolor,separator,pagebreak",
		theme_advanced_buttons2_add_before	: "cut,copy,paste,separator,search,replace,separator",
		theme_advanced_buttons3_add_before 	: "tablecontrols,separator,pastetext,pasteword,selectall,separator",
		theme_advanced_toolbar_location 	: "top",
		theme_advanced_toolbar_align 		: "left",
		theme_advanced_path_location 		: "bottom",
		theme_advanced_buttons1_add 		: "separator,bramus_cssextras_classes,bramus_cssextras_ids",
		// Valid elements
		extended_valid_elements : 
			"embed[*],a[name|href|target|title|onclick|class],iframe[width|height|frameborder|src]," + 
			"img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name|style]," + 
			"hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style|id|name],script[*]",
		external_image_list_url : "/cms/ajax/image_list",
		// Date formats
		plugin_insertdate_dateFormat : "%Y-%m-%d",
		plugin_insertdate_timeFormat : "%H:%M:%S",
	},
	basic_config = {
		mode			: "specific_textareas",
		theme			: "advanced",
		height			: "250px",
		editor_selector : "tinymce_basic",

		// toolbar
		theme_advanced_buttons1 : "bold,italic,underline,link,unlink,bullist,blockquote",
		theme_advanced_buttons2 : "",
		theme_advanced_buttons3 : "",
		
		// theme options
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align 	: "left",
	};

	var ko_sync = function(ed,va) {
		if(!ed.isDirty()){
			// return false;
		}
		var html = ed.getContent({format : 'raw'});
		if (ko.isWriteableObservable(va)) {
			va(html);
		}
		ed.isNotDirty = true;
	}

	var pagination_button_setup = function(ed) {
		// Add a custom button
		ed.addButton("pagebreak", {
			title   : "Add Pagebreak",
			image   : "/assets/img/pagebreak.gif",
			onclick : function() {
				ed.focus();
				if (ed.selection.getNode().nodeName == "STRONG") {
					alert("Can't add pagebreak here");
				}
				else if (ed.selection.getNode().nodeName != "#document") {
					ed.selection.setContent('<hr class="pagebreak" />');
					ed.focus();
				}
			}
		});
	}

	setup_methods = function(ed) {
		pagination_button_setup(ed);
	}

	/*
		KnocjoutJS TinyMCE Binding
		
		Copyright 2011 .DeV!L
	*/
	ko.bindingHandlers.tinymce = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var editor = $(element).tinymce();
			var options = allBindingsAccessor().tinymceOptions || {};
			var va = valueAccessor();
			var mce_config = regular_config;
			//add all the setup methods
			mce_config.setup = setup_methods;
			mce_config.onchange_callback = function(ed) {
				ko_sync(ed,va)
			};
			mce_config = $.extend(mce_config, options);

			if (editor) {
				editor.remove();
				editor = null;
			};

			
			$(element).tinymce(mce_config);
		},

		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			$(element).html(value);
		}
	}

}(jQuery, ko))