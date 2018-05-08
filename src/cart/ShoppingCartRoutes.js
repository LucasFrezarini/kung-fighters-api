import Joi                    from "joi";
import ShoppingCartController from "./ShoppingCartController";

const routes = [
  {
    method: 'POST',
    path: '/client/cart',
    handler: ShoppingCartController.add,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        payload: {
          items: Joi.array().items({
            productId: Joi.string().required(),
            quantity: Joi.number().default(1).required()
          })
        }
      },
      tags: ['api', 'client'],
      description: "Adiciona um ou mais produtos no carrinho de compras",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  },
  {
    method: 'GET',
    path: '/client/cart',
    handler: ShoppingCartController.getCart,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown()
      },
      tags: ['api', 'client'],
      description: "Lista os itens do carrinho de compras do cliente logado",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  },
  {
    method: 'DELETE',
    path: '/client/cart/{id}',
    handler: ShoppingCartController.removeItem,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),

        params: {
          id: Joi.string().required()
        }
      },
      tags: ['api', 'client'],
      description: "Remove um item do carrinho de compras",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  },
  {
    method: 'PATCH',
    path: '/client/cart/{id}',
    handler: ShoppingCartController.updateItem,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        params: {
          id: Joi.string().required()
        },
        payload: {
          quantity: Joi.number().required()
        }
      },
      tags: ['api', 'client'],
      description: "Atualiza a quantidade de um item no carrinho de compras",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  }
];

export default routes;