import UserService    from "../user/UserService";
import ClientService  from "../client/ClientService";
import jsonWebToken   from "jsonwebtoken";

class Auth {
  async validate(decoded, request) {
    try {
      if(decoded.scope == "client") {
        return await this._validateClientToken(decoded, request);
      } else {
        return await this._validateUserToken(decoded, request);
      } 
    } catch (error) {
      console.error(error);
      throw new Error("Ocorreu um erro ao verificar a autenticação");
    }
  }

  async generateToken(data) {
    return await jsonWebToken.sign(data, process.env.SECRET_KEY, { algorithm: 'HS256'});
  }

  async _validateUserToken(decoded, request) {
    try {
      const exists = await UserService.exists(decoded.id);

      return {isValid: exists};
    } catch (error) {
      console.error(error);
      throw new Error("Ocorreu um erro ao verificar a autenticação");
    }
  }

  async _validateClientToken(decoded, request) {
    try {
      const exists = await ClientService.exists(decoded.id);

      return {isValid: exists};
    } catch (error) {
      console.error(error);
      throw new Error("Ocorreu um erro ao verificar a autenticação");
    }
  }
}

export default new Auth();