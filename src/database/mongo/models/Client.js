import Model from "./Model";
import mongoose from "mongoose";

class Client extends Model {

  getModelName() {
    return "client";
  }

  getSchema() {
    return mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      cpf: {
        type: String,
        required: true
      },
      birth: {
        type: Date,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    }, {timestamps: true})
  }

  getCollectionName() {
    return "clients";
  }
}

export default new Client().createModel();