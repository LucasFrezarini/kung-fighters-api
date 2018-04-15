import hapi from "hapi";
import ProductService from "./ProductService";
import _ from "lodash";

class ProductController {

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  getPublicProductList(req, res) {
    let filters = {
      name:     req.query.name ? new RegExp(req.query.name, "i") : null,
      model:    req.query.model? new RegExp(req.query.model, "i") : null,
      'category.name': req.query.category ? new RegExp(req.query.category, "i") : null,
      'category.subcategory': req.query.subcategory? new RegExp(req.query.subcategory, "i") : null,
      featured: req.query.featured,
      $or: [
        {deleted: undefined},
        {deleted: false}
      ]
    }

    /* Retira os filtros vazios */
    filters = _.pickBy(filters, _.identity);
 
    return ProductService.findBy(filters).then(products => res.response(products).type('application/json'));
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