/**
    Provides lazy-loaded templating and wrapper for jQuery tmpl

    @module template
**/

/**
    Provides lazy-loaded templating
    
    @class template
    @namespace BI 
    @static
**/
(function($,ko,BI,undefined) {
    BI.namespace('template');
    var exposed,
        tplContainer,
        tpls = {};
    
    /** 
        Takes a url and makes an ajax request for that URL (relative to the BI docroot)
        When loaded, will call all callbacks stacked up for
        that template then store the template for future reference

        @method load
        
        @param {String} url
        @return void
        @private
    **/
    function load(url) {
        $.ajax({
          url: BI.location.cmsPath.get('rootAssets')+'js/lib/'+url+'.tpl',
          success: function(data) {
            var cbs = tpls[url];
            var template = data;
            //call each callback
            for (var i=0; i<cbs.length; i++) {
                cbs[i].callback($.tmpl(template,cbs[i].data));
            }
            //set the template to the data
            tpls[url] = data;
          }
        });
    }
    
    /**
        A function that takes a relative path to a template from the BI root and
        loads it over ajax (if necessary) then runs through jquery tmpl,
        finally calls the callback passing it the rendered template

        @method template
        @param {Object} options
            @param {String} options.tpl The template file relative to ./assets/js/lib/BI/ (no .tpl)
            @param {Function} options.callback Callback function passed the processed template
            @param {Object} [options.data] Data to be passed through the templating engine
        @return void
    **/
    BI.template = function(obj) {
        obj.data = obj.data || {};
        //console.log(typeof tpls[obj.tpl])
        //if we've got it, simply call their callback and we're done
        if (typeof tpls[obj.tpl] === 'string') {
            obj.callback($.tmpl(tpls[obj.tpl],obj.data));
            return;
        } 

        //otherwise, if we aren't already loading it, we turn the tpl
        //into an array to hold callbacks and call the load
        if (!tpls[obj.tpl]){
            tpls[obj.tpl] = [];
            load(obj.tpl);
        }

        //push the callback onto the array
        tpls[obj.tpl].push(obj);
    };
}(jQuery, ko, BI))