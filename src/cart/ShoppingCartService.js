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
}

export default new ShoppingCartService();