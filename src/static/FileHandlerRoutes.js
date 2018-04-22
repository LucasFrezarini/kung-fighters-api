import FileHandler from "./FileHandler";

const routes = [
  {
    method: 'GET',
    path: '/product/images/{filename}',
    handler: {
      file: function(req) {
        return `/app/upload/${req.params.filename}`
      }
    }
  }
]

export default routes;