import FileHandler from "./FileHandler";
import Joi         from "joi";

const routes = [
  {
    method: 'GET',
    path: '/public/product/images/{filename}',
    handler: {
      file: function(req) {
        return `/app/upload/${req.params.filename}`
      }
    },
    options: {
      validate: {
        params: {
          filename: Joi.string().required()
        }
      },
      tags: ['api', 'static', 'public'],
      description: "Retorna uma imagem que foi feita upload do produto",
      auth: false
    }
  }
]

export default routes;