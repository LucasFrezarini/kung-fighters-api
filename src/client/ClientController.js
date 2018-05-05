import hapi from "hapi";
import boom from "boom";
import ClientService from "./ClientService";

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
        boom.internal("Erro ao criar o cliente!");
      });
  }
}

export default new ClientController();