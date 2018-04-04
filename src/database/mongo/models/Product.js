import Model from "./Model";
import mongoose from "mongoose";

class Product extends Model {

  getModelName() {
    return "product";
  }

  getSchema() {
    return mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      model: String,
      description: String,
      photos: [{
        title: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }],
      deleted: {
        type: Boolean,
        default: false
      }
    })
  }

  getCollectionName() {
    return "products";
  }
}

export default new Product().createModel();

