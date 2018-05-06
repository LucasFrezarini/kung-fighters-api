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
        name: {
          type: String,
          required: true
        },
        subcategory: String
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
        file: {
          type: String,
          required: true
        },
        mainPhoto: {
          type: Boolean,
          default: false
        }
      }],
      deleted: {
        type: Boolean,
        default: false
      },
      featured: {
        type: Boolean,
        default: false
      }
    }, {timestamps: true})
  }

  getCollectionName() {
    return "products";
  }
}

export default new Product().createModel();

