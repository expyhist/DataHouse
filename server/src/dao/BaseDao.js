const prodConncetion = require('../mongodb');

class BaseDao {
  constructor(documentName, schema, connection) {
    this.documentName = documentName;
    this.schema = schema;
    this.connection = connection || prodConncetion;
    this.model = this.connection.model(this.documentName, this.schema);
  }

  getModel() {
    return this.model;
  }

  isExists = (id) => this.model.exists({ _id: id });

  getModalName = (isPlural = false) => (isPlural ? this.model.modelName : this.model.modelName.replace('s', ''));

  getAll = () => this.model.find({}).lean();

  getById = (id) => this.model.findById(id).lean();

  getOne = (obj) => this.model.findOne(obj).lean();

  get = (obj) => this.model.find(obj).lean();

  add = (body) => this.model.create(body);

  updateById = (id, body) => this.model.findByIdAndUpdate(id, body, { new: true });

  deleteById = (id) => this.model.findByIdAndDelete(id);

  deleteMany = (idArray) => this.model.deleteMany(idArray);
}

module.exports = BaseDao;
