import Hapi   from "hapi";
import routes from "./routes/routes";

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
              console.error('ValidationError:', err.message); 
              throw Boom.badRequest(`Invalid request payload input`);
            } else {
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
