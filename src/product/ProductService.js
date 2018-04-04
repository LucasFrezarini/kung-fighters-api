import Product from "../database/mongo/models/Product";

class ProductService {

  create(data) {
    return Product.create(data);
  }

  update(id, data) {
    return Product.findByIdAndUpdate(id, data);
  }

  delete(id) {
    return Product.findByIdAndRemove(id);
  }

  findAll() {
    return Product.find({});
  }

  findById(id) {}

  findBy(criteria) {
    return Product.find(criteria);
  }

}

export default new ProductService();