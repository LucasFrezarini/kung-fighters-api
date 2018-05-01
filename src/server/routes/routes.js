import productRoutes      from "../../product/ProductRoutes";
import FileHandlerRoutes  from "../../static/FileHandlerRoutes";
import AuthRoutes         from "../../auth/AuthRoutes";

function loadRoutes() {
  let routes = [];

  routes = routes.concat(productRoutes);
  routes = routes.concat(FileHandlerRoutes);
  routes = routes.concat(AuthRoutes);

  return routes;
}


export default loadRoutes();