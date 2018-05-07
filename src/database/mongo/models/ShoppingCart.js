import mongoose from "mongoose";
import Product from "./Product";

/* Subdoc */
class ShoppingCart {

  getSchema() {
    return mongoose.Schema({
      items: [
        {
          product: this._getProductSchema(),
          quantity: {
            type: Number,
            required: true,
            default: 1
          }
        }
      ]
    }, {timestamps: true})
  }

  _getProductSchema() {
    return {
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
    }
  }
}

export default new ShoppingCart();