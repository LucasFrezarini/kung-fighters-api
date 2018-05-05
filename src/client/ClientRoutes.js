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
            cpf: Joi.string().required(),
            birth: Joi.date().required(),
            password: Joi.string().required(),
          }
        }
      },
      tags: ['api', 'public', 'client'],
      description: "Cadastra um novo cliente",
      auth: false
    }
  }
];

export default routes;