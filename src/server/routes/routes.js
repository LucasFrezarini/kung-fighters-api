import productRoutes      from "../../product/ProductRoutes";
import FileHandlerRoutes  from "../../static/FileHandlerRoutes";
import AuthRoutes         from "../../auth/AuthRoutes";
import UserRoutes         from "../../user/UserRoutes";

function loadRoutes() {
  let routes = [];

  routes = routes.concat(productRoutes);
  routes = routes.concat(FileHandlerRoutes);
  routes = routes.concat(AuthRoutes);
  routes = routes.concat(UserRoutes);

  return routes;
}


export default loadRoutes();