import Client from "../database/mongo/models/Client";

class ShoppingCartService {
  async addProductToCart(id, product, quantity) {
    const exists = Client.findById(id).shoppingCart.items;
    return Client.findByIdAndUpdate(id, {
      $addToSet: { 
        "shoppingCart.items": {
          product: product,
          quantity: quantity
        } 
      }
    }).exec();
  }

  async getCartByClientId(id) {
    return Client.findById(id, {"shoppingCart.items": 1})
  }

  async removeItem(clientId, itemId) {
    return Client.findByIdAndUpdate(clientId, {
      $pull: {
        "shoppingCart.items": {
          _id: itemId
        }
      }
    });
  }

  async updateItem(clientId, itemId, quantity) {
    console.log(clientId);
    console.log(itemId);

    return Client.update({"_id": clientId, "shoppingCart.items._id": itemId}, {
      $set: {
        'shoppingCart.items.$.quantity': quantity 
      }
    });
  }
}

export default new ShoppingCartService();