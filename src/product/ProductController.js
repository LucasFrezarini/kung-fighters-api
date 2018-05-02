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
  async getPublicProductList(req, res) {
    let filters = {
      name:     req.query.name ? new RegExp(req.query.name, "i") : null,
      model:    req.query.model? new RegExp(req.query.model, "i") : null,
      'category.name': req.query.category ? new RegExp(req.query.category, "i") : null,
      'category.subcategory': req.query.subcategory? new RegExp(req.query.subcategory, "i") : null,
      featured: req.query.featured,
      createdAt: {
        $gte: req.query.minDate ? req.query.minDate : new Date(1986, 1, 1),
        $lte: req.query.maxDate ? req.query.maxDate : new Date(2599, 1, 1)
      },
      $or: [
        {deleted: undefined},
        {deleted: false}
      ]
    }

    const registersPerPage = req.query.registersPerPage;
    const page             = req.query.page;

    let fieldsSort = {};
    let sort = req.query.order;

    if(sort == "create_date") {
      fieldsSort.createdAt = -1;
    }

    /* Retira os filtros vazios */
    filters = _.pickBy(filters, _.identity);

    const skip  = registersPerPage * (page - 1);

    try {
      const products = await ProductService.findBy(filters, {}, {skip: skip, limit: registersPerPage, sort: fieldsSort});
      const totalProducts = await ProductService.getTotalProducts(filters);
      const totalPages = Math.ceil(totalProducts / registersPerPage);
  
      return res.response({
        page: page,
        registersPerPage: registersPerPage,
        totalPages: totalPages,
        totalProducts: totalProducts,
        products: products
      }).type('application/json')
    } catch (error) {
      console.error(error);
      throw Boom.internal("Erro interno de servidor!");
    }
  }

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  newProduct(req, res) {

    const product = req.payload.product;

    return ProductService.create(product)
      .then(product => res.response({msg: "Produto criado com sucesso!", product: product}).code(201))
      .catch(err => {
        console.error(err);
        res.response({msg: "Ocorreu um erro ao cadastrar o produto!"}).code(500);
      });
  }

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  getPublicProductInfo(req, res) {
    const id = req.params.id;

    return ProductService.findById(id)
      .then(product => res.response(product))
      .catch(err => {
        console.error(err);
        throw Boom.internal("Erro interno de servidor!");
      })

  }

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  updateProduct(req, res) {
    const id      = req.params.id;
    const product = req.payload.product; 

    return ProductService.update(id, product)
      .then(product => res.response({msg: "Produto alterado com sucesso!"}).code(200))
      .catch(err => {
        console.error(err);
        throw Boom.internal("Erro interno de servidor!");
      })
  }

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  deleteProduct(req, res) {
    const id      = req.params.id;

    return ProductService.delete(id)
      .then(product => res.response({msg: "Produto removido com sucesso!"}).code(200))
      .catch(err => {
        console.error(err);
        throw Boom.internal("Erro interno de servidor!");
      })
  }  

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  uploadImage(req, res) {
    const data = req.payload;

    if(data.image) {
      const extension = data.image.hapi.filename.split('.').slice(1).join(".");

      const name = crypto.createHash('md5')
        .update(data.image.hapi.filename + Date.now())
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
            path: `/product/images/${name}.${extension}`,
            headers: data.image.hapi.headers
          }

          return resolve(ret);
        })
      })
    }
  }

}

export default new ProductController();