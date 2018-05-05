import hapi from "hapi";
import boom from "boom";
import ClientService from "./ClientService";
import Auth from "../auth/Auth";

class ClientController {

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  newClient(req, res) {
    const client = req.payload.client;

    return ClientService.createNewClient(client).then(client => res.response({msg: `Cliente ${client.name} cadastrado com sucesso!`}).code(201))
      .catch(err => {
        console.error(err);
        return boom.internal("Erro ao criar o cliente!");
      });
  }

  /** 
   * @param { hapi.Request } req 
   * @param { hapi.ResponseToolkit } res 
   */
  async login(req, res) {

    try{
      const login = await ClientService.login(req.payload.email, req.payload.password);

      if(!login.success) return res.response({msg: "Email e/ou senha inválidos!"}).code(401);

      const token = await Auth.generateToken(login.data);

      return res.response({msg: "Login realizado com sucesso!", token: token}).code(200);
    } catch (error) {
      console.error(error);
      return boom.internal("Erro ao realizar o login do cliente!");
    }

  }
}

export default new ClientController();