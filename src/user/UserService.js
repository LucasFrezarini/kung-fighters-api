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
        scope: role
      }

      return User.create(user);
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao cadastrar usuário: " . err);
    }
  }

  async exists(id) {
    const user = await User.findById(id);

    if(user) return true;

    return false;
  }

  async login(username, password) {
    try {
      const user = await User.findOne({username: username});
      
      if(!user) return {success: false, reason: "O usuário não existe no banco"};
      
      const validPassword = await bcrypt.compare(password, user.password)

      if(validPassword) {
        return {success: true, data: {id: user._id, username: user.username, scope: user.scope}};
      }
        

      return {success: false, reason: "Senha inválida"}
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao realizar o login do usuário!");
    }
  }


}

export default new UserService();