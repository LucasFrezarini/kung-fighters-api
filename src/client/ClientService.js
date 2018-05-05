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

}

export default new ClientService();