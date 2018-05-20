import Joi from "joi";
import ProductController from "./ProductController";

const routes = [
  {
    method: 'GET',
    path: '/public/product',
    handler: ProductController.getPublicProductList,
    options: {
      validate: {
        query: {
          name: Joi.string().optional(),
          category: Joi.string().optional(),
          featured: Joi.boolean().optional(),
          price: Joi.object().keys({
            min: Joi.number().optional(),
            max: Joi.number().optional()
          }).optional(),
          model: Joi.optional(),
          minDate: Joi.date().optional(),
          maxDate: Joi.date().optional(),
          order: Joi.string().valid('create_date', 'price').optional(),
          page: Joi.number().default(1).optional(),
          registersPerPage: Joi.number().default(25).optional()
        }
      },
      tags: ['api', 'public', 'product'],
      description: "Retorna uma lista pública páginada dos produtos cadastrados no sistema",
      notes: "Traz uma lista de produtos cadastrados no sistema, com diversas opções de filtros",
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/public/product/{id}',
    handler: ProductController.getPublicProductInfo,
    options: {
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      tags: ['api', 'public', 'product'],
      description: "Retorna os detalhes de um produto específico",
      auth: false
    }
  },
  {
    method: 'PUT',
    path: '/product/{id}',
    handler: ProductController.updateProduct,
    options: {
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        payload: {
          product: {
            name: Joi.string().min(3).required(),
            category: Joi.string().required(),
            price: Joi.number().required(),
            model: Joi.optional(),
            description: Joi.optional(),
            featured: Joi.boolean().optional(),
            photos: Joi.array().items([{
              title: Joi.string().required(),
              file: Joi.string().required()
            }])
          } 
        }
      },
      tags: ['api', 'product', 'management'],
      description: "Altera um produto cadastrado no sistema. Todos os dados devem ser repassados novamente",
      auth: {
        strategy: "jwt",
        scope: ['admin']
      }
    }
  },
  {
    method: 'PATCH',
    path: '/product/{id}',
    handler: ProductController.updateProduct,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        params: {
          id: Joi.string().required()
        },
        payload: {
          product: {
            name: Joi.string().min(3).optional(),
            category: Joi.string().optional(),
            price: Joi.number().optional(),
            model: Joi.optional(),
            description: Joi.optional(),
            featured: Joi.boolean().optional(),
            photos: Joi.array().items([{
              title: Joi.string().optional(),
              file: Joi.string().optional()
            }])
          } 
        }
      },
      tags: ['api', 'product', 'management'],
      description: "Altera um produto cadastrado no sistema. Somente os campos que se deseja alterar deve ser enviado",
      auth: {
        strategy: "jwt",
        scope: ['admin']
      }
    }
  },
  {
    method: 'POST',
    path: '/product',
    handler: ProductController.newProduct,
    options: {
      validate: {
          headers: Joi.object({
            Authorization: Joi.string()
          }).unknown(),
          payload: {
            product: {
              name: Joi.string().min(3).required(),
              category: Joi.string().required(),
              price: Joi.number().required(),
              model: Joi.optional(),
              description: Joi.optional(),
              featured: Joi.boolean().optional(),
              photos: Joi.array().items([{
                title: Joi.string().required(),
                file: Joi.string().required()
              }])
            } 
          }
      },
      tags: ['api', 'management'],
      description: "Cria um novo produto no sistema",
      auth: {
        strategy: "jwt",
        scope: ['admin']
      }
    }
  },
  {
    method: 'DELETE',
    path: '/product/{id}',
    handler: ProductController.deleteProduct,
    options: {
      validate: {
          headers: Joi.object({
            Authorization: Joi.string()
          }).unknown(),
          params: {
            id: Joi.string().required()
          }
      },
      tags: ['api', 'management'],
      description: "Exclui um produto do sistema",
      auth: {
        strategy: "jwt",
        scope: ['admin']
      }
    },
  },
  {
    method: 'POST',
    path: '/product/upload/image',
    handler: ProductController.uploadImage,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        payload: {
          image: Joi.required()
        }
      },
      payload: {
        output: 'stream',
        allow: 'multipart/form-data',
        parse: true
      },
      tags: ['api', 'management', 'upload'],
      description: "Realiza o upload de uma imagem do produto no servidor",
      auth: {
        strategy: "jwt",
        scope: ['admin']
      }
    },
  }
]

export default routes;