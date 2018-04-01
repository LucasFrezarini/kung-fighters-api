import Hapi from "hapi";

const server = Hapi.server({
    port: 3000
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.start().then(() => {
    console.log(`Server running at: ${server.info.uri}`);
});