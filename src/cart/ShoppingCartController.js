import hapi from "hapi";
import boom from "boom";

import ShoppingCartService  from "./ShoppingCartService";
import ProductService       from "../product/ProductService";

class ShoppingCartController {

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async add(req, res) {
    const items     = req.payload.items;
    const clientId  = req.auth.credentials.id;

    try {
      items.forEach(async item => {
        try {
          const product = await ProductService.findById(item.productId);
          await ShoppingCartService.addProductToCart(clientId, product, item.quantity);
        } catch (error) {
          console.error(error);
          return boom.internal("Erro ao adicionar o item no carrinho de compras");
        } 
      });

      return res.response({msg: "Itens adicionados com sucesso!"}).code(201);
    } catch (error) {
      console.error(error);
      return boom.internal("Erro ao adicionar os itens no carrinho de compras!");
    }
  }

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async getCart(req, res) {
    const id = req.auth.credentials.id;

    try {
      const cart = await ShoppingCartService.getCartByClientId(id);

      if(!cart.shoppingCart || !cart.shoppingCart.items || cart.shoppingCart.items.length <= 0) {
        return res.response({
          cart:   [],
          totalItems: 0,
          total: 0
        });
      }

      const items = cart.shoppingCart.items;

      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

      return res.response({
        cart:   cart.shoppingCart,
        totalItems: items.length,
        total: total
      });
    } catch (error) {
      console.error(error);
      return boom.internal("Erro ao listar os produtos do carrinho de compras!")
    }
  }

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async removeItem(req, res) {
    const clientId  = req.auth.credentials.id; 
    const itemId    = req.params.id;

    try {
      await ShoppingCartService.removeItem(clientId, itemId);
      return res.response({msg: "Item removido com sucesso!"});
    } catch (error) {
      console.error(error);
      return boom.internal("Erro ao remover o produto no carrinho de compras")
    }
  }

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async updateItem(req, res) {
    const clientId  = req.auth.credentials.id; 
    const itemId    = req.params.id;
    const quantity  = req.payload.quantity;

    try {
      const client = await ShoppingCartService.updateItem(clientId, itemId, quantity);
      return res.response({msg: "Item atualizado com sucesso!"});
    } catch (error) {
      console.error(error);
      return boom.internal("Erro ao remover o produto no carrinho de compras")
    }
  }
}

export default new ShoppingCartController();