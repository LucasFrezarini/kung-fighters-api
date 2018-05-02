import User   from "../database/mongo/models/User";
import bcrypt from "bcrypt";

class UserService {

  async createUser(username, password, role) {

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = {
        username: username,
        password: hashedPassword,
        role: role
      }

      return User.create(user);
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao cadastrar usuário: " . err);
    }
  }


}

export default new UserService();