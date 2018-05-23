import Joi from "joi";

import ClientController from "./ClientController";

const routes = [
  {
    method: 'POST',
    path: '/public/client',
    handler: ClientController.newClient,
    options: {
      validate: {
        payload: {
          client: {
            name: Joi.string().min(3).required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
          }
        }
      },
      tags: ['api', 'public', 'client'],
      description: "Cadastra um novo cliente",
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/public/client/login',
    handler: ClientController.login,
    options: {
      validate: {
        payload: {
          email: Joi.string().min(3).required(),
          password: Joi.string().required()
        }
      },
      tags: ['api', 'public', 'client'],
      description: "Realiza o login de um cliente no sistema",
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/client',
    handler: ClientController.getClientInfos,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown()
      },
      tags: ['api', 'client'],
      description: "Retorna os dados do cliente logado",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  },
  {
    method: 'PUT',
    path: '/client',
    handler: ClientController.update,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        payload: {
          client: {
            name: Joi.string().min(3).required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
          }
        }
      },
      tags: ['api', 'client'],
      description: "Altera o cadastro de um cliente no sistema",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  },
  {
    method: 'PATCH',
    path: '/client',
    handler: ClientController.update,
    options: {
      validate: {
        headers: Joi.object({
          Authorization: Joi.string()
        }).unknown(),
        payload: {
          client: {
            name: Joi.string().min(3).optional(),
            email: Joi.string().optional(),
            password: Joi.string().optional(),
          }
        }
      },
      tags: ['api', 'client'],
      description: "Altera o cadastro de um cliente no sistema. Somente os campos que se deseja alterar devem ser passados",
      auth: {
        strategy: "jwt",
        scope: ["client"]
      }
    }
  }
];

export default routes;