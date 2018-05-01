import Joi from "joi";
import Controller from "./AuthController";

const routes = [
  {
    method: 'POST',
    path: '/auth',
    handler: Controller.getToken,
    options: {
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      tags: ['api', 'public', 'product'],
      description: "Rota para se autenticar",
      auth: false
    }
  }
]

export default routes;