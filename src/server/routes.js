import Joi from "joi";
import ProductController from "../product/ProductController";

const routes = [
  {
    method: 'GET',
    path: '/public/product',
    handler: ProductController.getPublicProductList
  },
  {
    method: 'POST',
    path: '/product',
    handler: ProductController.newProduct,
    options: {
      validate: {
          payload: {
            product: {
              name: Joi.string().min(3).required(),
              category: Joi.string().required(),
              price: Joi.number().required(),
              model: Joi.optional(),
              description: Joi.optional(),
              photos: Joi.array().items([{
                title: Joi.string().required(),
                url: Joi.string().required()
              }])
            } 
          }
      }
    }
  }
]

export default routes;