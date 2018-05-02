import hapi         from "hapi";
import jsonWebToken from "jsonwebtoken";
import UserService  from "../user/UserService";

class AuthController {

  /**
   * 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async getToken(req, res) {
    const username = req.payload.username;
    const password = req.payload.password;

    const login = await UserService.login(username, password);    

    if(!login.success) return res.response({msg: "Credenciais inválidas!"}).code(401);

    const token = await jsonWebToken.sign(login.data, "ChaveSecreta", { algorithm: 'HS256'});

    return res.response({msg: "Autorizado", token: token});
  }

}

export default new AuthController();