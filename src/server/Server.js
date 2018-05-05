import Hapi     from "hapi";
import inert    from "inert";
import vision   from "vision";
import routes   from "./routes/routes";
import swagger  from "hapi-swagger"; 
import jwt      from "hapi-auth-jwt2";
import auth     from "../auth/Auth";

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
        },
        cors: true
      }
    }

    const swaggerOptions = {
      info: {
        title: "Kung Fighters API documentation",
        version: '0.1'
      },
      host: `localhost:${process.env.SERVER_PORT}`
    }

    this._server = Hapi.server(hapiOptions);
    this._server.register([
      inert,
      vision,
      jwt,
      {
        plugin: swagger,
        options: swaggerOptions
      }
    ]).then(() => {
      this._server.auth.strategy('jwt', 'jwt', {
        key: process.env.SECRET_KEY,
        validate: auth.validate.bind(auth),
        verifyOptions: { algorithms: [ 'HS256' ] }
      });

      this._server.auth.default('jwt');

      this._loadRoutes();
    }).catch(err => console.error(err));
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
