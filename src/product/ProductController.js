import hapi from "hapi";
import crypto from "crypto";
import path from "path";
import ProductService from "./ProductService";
import _ from "lodash";
import Boom from "boom";
import fs from "fs";
import { dirname } from "path";

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
 
    return ProductService.findBy(filters)
      .then(products => res.response(products).type('application/json'))
      .catch(err => Boom.internal("Erro interno de servidor"));
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

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  uploadImage(req, res) {
    const data = req.payload;

    console.log(data);

    if(data.image) {
      const extension = data.image.hapi.filename.split('.').slice(1).join(".");

      const name = crypto.createHash('md5')
        .update(data.image.hapi.filename)
        .digest("hex");

      const path = `/app/upload/${name}.${extension}`;

      if(!fs.existsSync("/app/upload/")) {
        fs.mkdirSync("/app/upload/");
      }

      const file = fs.createWriteStream(path);

      file.on('error', err => console.error(err));

      data.image.pipe(file);

      return new Promise((resolve, reject) => {
        data.image.on('end', err => {

          if(err) return reject(err);

          const ret = {
            filename: data.image.hapi.filename,
            headers: data.image.hapi.headers
          }

          return resolve(ret);
        })
      })
    }
  }

}

export default new ProductController();