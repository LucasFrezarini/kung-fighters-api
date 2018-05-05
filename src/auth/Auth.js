import UserService  from "../user/UserService";
import jsonWebToken from "jsonwebtoken";

class Auth {
  async validate(decoded, request) {
    try {
      const exists = await UserService.exists(decoded.id);

      return {isValid: exists};
    } catch (error) {
      console.error(error);
      throw new Error("Ocorreu um erro ao verificar a autenticação");
    }
  }

  async generateToken(data) {
    return await jsonWebToken.sign(data, process.env.SECRET_KEY, { algorithm: 'HS256'});
  }
}

export default new Auth();