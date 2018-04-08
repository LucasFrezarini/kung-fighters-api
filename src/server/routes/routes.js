import productRoutes from "../../product/ProductRoutes";

function loadRoutes() {
  let routes = [];

  routes = routes.concat(productRoutes);

  return routes;
}


export default loadRoutes();