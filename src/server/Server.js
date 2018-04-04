import Hapi   from "hapi";
import routes from "./routes";

class Server {
  
  _server;

  constructor() {
    this._createServer();
  }

  _createServer() {
    const hapiOptions = {
      port: process.env.SERVER_PORT,
      routes: {
        validate: {
          failAction: (request, h, err) => {
            if (process.env.NODE_ENV === 'production') {
              // In prod, log a limited error message and throw the default Bad Request error.
              console.error('ValidationError:', err.message); // Better to use an actual logger here.
              throw Boom.badRequest(`Invalid request payload input`);
            } else {
              // During development, log and respond with the full error.
              console.error(err);
              throw err;
            }
          }
        }
      }
    }

    this._server = Hapi.server(hapiOptions);

    this._loadRoutes();
  }

  _loadRoutes() {
    routes.forEach(route => this._server.route(route));
  }

  start() {
    return this._server.start();
  }

  get instance() {
    return this._server
  }
}

export default new Server();
