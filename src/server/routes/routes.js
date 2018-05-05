import productRoutes      from "../../product/ProductRoutes";
import FileHandlerRoutes  from "../../static/FileHandlerRoutes";
import AuthRoutes         from "../../auth/AuthRoutes";
import UserRoutes         from "../../user/UserRoutes";
import ClientRoutes       from "../../client/ClientRoutes";

function loadRoutes() {
  let routes = [];

  routes = routes.concat(productRoutes)
    .concat(FileHandlerRoutes)
    .concat(AuthRoutes)
    .concat(UserRoutes)
    .concat(ClientRoutes);

  return routes;
}


export default loadRoutes();