import hapi         from "hapi";
import Auth         from "./Auth";
import UserService  from "../user/UserService";
import Boom         from "boom";

class AuthController {

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async getToken(req, res) {
    const username = req.payload.username;
    const password = req.payload.password;

    try {
      const login = await UserService.login(username, password);    

      if(!login.success) return res.response({msg: "Credenciais inválidas!"}).code(401);

      const token = await Auth.generateToken(login.data);

      return res.response({msg: "Autorizado", token: token});
    } catch (err) {
      console.error(err);
      return Boom.internal("Erro interno de servidor!");
    }
  }

}

export default new AuthController();