import Hapi   from "hapi";
import routes from "./routes";

class Server {
  
  _server;

  constructor() {
    this._createServer();
  }

  _createServer() {
    this._server = Hapi.server({
      port: process.env.SERVER_PORT
    });

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
