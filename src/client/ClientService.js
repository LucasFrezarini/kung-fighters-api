import bcrypt from "bcrypt";

import Client from "../database/mongo/models/Client";

class ClientService {

  async createNewClient(data) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    const client = {
      name : data.name,
      email: data.email,
      password: password,
      cpf: data.cpf,
      birth: data.birth
    }

    return Client.create(client)
  }

  async login(email, password) {
    try {
      const client = await Client.findOne({email: email});
      
      if(!client) return {success: false, reason: "O cliente não existe no banco"};
      
      const validPassword = await bcrypt.compare(password, client.password)

      if(validPassword) {
        return {success: true, data: {id: client._id, name: client.name, role: "client"}};
      }
        

      return {success: false, reason: "Senha inválida"}
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao realizar o login do cliente!");
    }
  }

  async exists(id) {
    try {
      const client = await Client.findById(id);

      if(client) return true;

      return false;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao verificar se o cliente existe!");
    }
  }

}

export default new ClientService();