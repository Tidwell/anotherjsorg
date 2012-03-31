var static = require('node-static');

var file = new(static.Server)('../client', { cache: 0 });

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(8080);