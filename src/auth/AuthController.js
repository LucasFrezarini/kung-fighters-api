import jsonWebToken from "jsonwebtoken";

class AuthController {

  async getToken() {
    const obj = {teste: "sou"};
    return await jsonWebToken.sign(obj, "ChaveSecreta", { algorithm: 'HS256'})
  }

}

export default new AuthController();