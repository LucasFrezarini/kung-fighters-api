import MongoDB from "../MongoDB";

/* Classe abstrata para definir um model para o mongoose */
class Model {
  
  _connection;

  constructor() {
    this._connection = MongoDB.connection;
  }

  createModel() {
    if(!this._connection.models[this.getModelName()]) {
      this._connection.model(this.getModelName(), this.getSchema(), this.getCollectionName());
    }

    return this._connection.model(this.getModelName());
  }

  getModelName() {
    throw new Error('Method not implemented');
  }

  getSchema() {
    throw new Error('Method not implemented');
  }

  getCollectionName() {
    throw new Error('Method not implemented');
  }

}

export default Model;