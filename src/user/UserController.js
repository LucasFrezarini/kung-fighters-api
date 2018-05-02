import hapi         from "hapi";
import UserService  from "./UserService";
import Boom         from "boom";

class UserController {

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  createUser(req, res) {
    const user = req.payload.user;

    return UserService.createUser(user.username, user.password, user.role)
      .then(user => res.response({msg: "Usuário cadastrado com sucesso!"}).code(201))
      .catch(err => {
        console.log(err);
        Boom.internal("Erro interno de servidor!");
      })
  }
}

export default new UserController();