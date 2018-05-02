import Joi from "joi";
import Controller from "./UserController";

const routes = [
  {
    method: 'POST',
    path: '/user',
    handler: Controller.createUser,
    options: {
      validate: {
        payload: {
          user: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().required()  
          }
        }
      },
      tags: ['api', 'management', 'user'],
      description: "Cadastra um novo usuário",
      auth: false
    }
  },
];

export default routes;