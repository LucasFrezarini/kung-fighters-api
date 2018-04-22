class FileHandler {
  getProductPhoto(req) {
    return req.params.filename
  }
}

export default new FileHandler;