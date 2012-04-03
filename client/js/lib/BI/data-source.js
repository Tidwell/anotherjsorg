(function($,ko,BI,undefined) {
    BI.namespace('data_source');

    function populate(viewModel) {
        console.log('starting')
        $('[data-source]').each(function() {
            var el = $(this);
            BI.data.get({type: 'author_list',callback: function(data) {
                setTimeout(function(){
                    $(data).each(function(i,val) {
                        console.log(i,val)
                        el.append('<option value="'+val+'">'+val+'</option>');
                    });
                },2000);
            }})
        })
    }
    $(populate)

}(jQuery, ko, BI))