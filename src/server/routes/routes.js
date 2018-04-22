import productRoutes from "../../product/ProductRoutes";
import FileHandlerRoutes from "../../static/FileHandlerRoutes";

function loadRoutes() {
  let routes = [];

  routes = routes.concat(productRoutes);
  routes = routes.concat(FileHandlerRoutes);

  return routes;
}


export default loadRoutes();