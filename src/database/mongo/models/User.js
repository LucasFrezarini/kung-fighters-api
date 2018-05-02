import Model from "./Model";
import mongoose from "mongoose";

class User extends Model {

  getModelName() {
    return "user";
  }

  getSchema() {
    return mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      },
      deleted: {
        type: Boolean,
        default: false,
      }
    }, {timestamps: true})
  }

  getCollectionName() {
    return "users";
  }
}

export default new User().createModel();