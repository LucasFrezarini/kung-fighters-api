import bcrypt from "bcrypt";

import Client from "../database/mongo/models/Client";

class ClientService {

  async createNewClient(data) {
    const password = await this._getHashedPassword(data.password);

    const client = {
      name : data.name,
      email: data.email,
      password: password,
      cpf: data.cpf,
      birth: data.birth
    }

    return Client.create(client)
  }

  async updateClient(id, data) {
    try {
      if(data.password) {
        data.password = await this._getHashedPassword(data.password);
      }

      return Client.findByIdAndUpdate(id, data);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao atualizar o cliente: " . error);
    }
  }

  async login(email, password) {
    try {
      const client = await Client.findOne({email: email});
      
      if(!client) return {success: false, reason: "O cliente não existe no banco"};
      
      const validPassword = await bcrypt.compare(password, client.password)

      if(validPassword) {
        return {success: true, data: {id: client._id, name: client.name, scope: "client"}};
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

  async _getHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

}

export default new ClientService();