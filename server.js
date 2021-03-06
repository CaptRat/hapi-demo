var hapi = require('hapi');

var server = new hapi.Server();

server.connection({ port:3000 });

server.ext('onRequest', function(request, reply) {
    console.log('Request received: ' + request.path);
    reply.continue();
});

// server.route({
//     path: '/hello',
//     method: 'GET',
//     handler: function(request, reply) {
//         reply('Hello World');
//     }
// });

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: 'templates/index.html'
    }
});

server.route({
    path:'/assets/{path*}',
    method:'GET',
    handler: {
        directory: {
            path: './public',
            listing: false,
        }
    }
})

server.route ({
    path: '/cards/new',
    method: 'GET',
    handler: function(request,reply) {
        reply.file('templates/new.html');
    }
});

server.route({
    path: '/cards/new',
    method: 'POST',
    handler: function (request, reply) {
        reply.redirect('/cards');
    }
})

server.route({
    path: '/cards',
    method: 'GET',
    handler: function(request, reply) {
        reply.file('templates/cards.html');
    }
})

server.start(function() {
      console.log('Listening on ' + server.info.uri);
  })