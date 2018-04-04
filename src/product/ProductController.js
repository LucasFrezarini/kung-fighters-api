import hapi from "hapi";
import ProductService from "./ProductService";

class ProductController {

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  getPublicProductList(req, res) {
    return ProductService.findBy({
      $or: [
        {deleted: undefined},
        {deleted: false}
      ]
    }).then(products => res.response(products).type('application/json'));
  }

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  newProduct(req, res) {

    const product = req.payload.product;

    return ProductService.create(product)
      .then(product => res.response({msg: "Produto criado com sucesso!", product: product}).state(201))
      .catch(err => {
        console.error(err);
        res.response({msg: "Ocorreu um erro ao cadastrar o produto!"}).state(500);
      });
  }

}

export default new ProductController();