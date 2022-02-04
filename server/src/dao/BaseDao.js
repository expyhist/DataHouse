const mongoose = require('mongoose');

class BaseDao {
  constructor(documentName, schema) {
    this.model = mongoose.model(documentName, schema);
  }

  getModel() {
    return this.model;
  }

  getModalName = (isPlural = false) => (isPlural ? this.model.modelName.replace('s', '') : this.model.modelName);

  getAll = () => this.model.find({}).lean();

  getById = (id) => this.model.findById(id).lean();

  getOne = (obj) => this.model.findOne(obj).lean();

  get = (obj) => this.model.find(obj).lean();

  add = (body) => this.model.create(body);

  updateById = (id, body) => this.model.findByIdAndUpdate(id, body);

  deleteById = (id) => this.model.findByIdAndDelete(id);
}

module.exports = BaseDao;
