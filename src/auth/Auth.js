class Auth {
  async validate(decoded, request) {
    console.log(decoded);
    return {isValid: true};
  }
}

export default new Auth();