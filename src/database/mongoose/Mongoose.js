import mongoose from "mongoose";

class Mongoose {
  
  _host;
  _database;
  _port;

  constructor() {
    this._host      = process.env.DB_HOST;
    this._port      = process.env.DB_PORT;
    this._database  = process.env.DB_DATABASE;
  }

  connect() {
    console.log(`mongodb://${this._host}:${this._port}/${this._database}`);
    return mongoose.connect(`mongodb://${this._host}:${this._port}/${this._database}`);
  }

  disconnect() {
    return mongoose.disconnect();
  }

  get connection() {
    return mongoose.connection;
  }

}

export default Mongoose;