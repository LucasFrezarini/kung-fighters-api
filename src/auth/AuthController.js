import jsonWebToken from "jsonwebtoken";

class AuthController {

  async getToken(req, res) {
    const obj = {teste: "sou"};
    return await jsonWebToken.sign(obj, "ChaveSecreta", { algorithm: 'HS256'})
  }

}

export default new AuthController();