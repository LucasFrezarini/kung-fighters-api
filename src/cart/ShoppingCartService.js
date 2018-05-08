import Client from "../database/mongo/models/Client";

class ShoppingCartService {
  async addProductToCart(id, product, quantity) {
    return Client.findByIdAndUpdate(id, {
      $push: { 
        "shoppingCart.items": {
          product: product,
          quantity: quantity
        } 
      }
    });
  }

  async getCartByClientId(id) {
    return Client.findById(id, {"shoppingCart.items": 1})
  }
}

export default new ShoppingCartService();