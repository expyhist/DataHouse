const parseTimeToLocale = require('../utils/parseTimeToLocale');

class BaseService {
  constructor(instance) {
    this.instance = instance;
  }

  getInstance = () => this.instance;

  baseGetAll = async (req, res) => {
    try {
      const resp = await this.instance.getAll();
      return res.status(200).json({
        success: true,
        data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  baseGetById = async (req, res) => {
    try {
      const resp = await this.instance.getById(req.params.id);
      return res.status(200).json({
        success: true,
        data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  baseCreate = async (req, res) => {
    try {
      const resp = await this.instance.add(req.body);
      return res.status(201).json({
        success: true,
        id: resp._id,
        title: resp.title,
        message: `${this.instance.getModalName()} created`,
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  baseUpdateById = async (req, res) => {
    try {
      const resp = await this.instance.updateById(req.params.id, req.body);
      return res.status(201).json({
        success: true,
        id: resp._id,
        message: `${this.instance.getModalName()} updated`,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  baseDeleteById = async (req, res) => {
    try {
      const resp = await this.instance.deleteById(req.params.id);
      return res.status(200).json({
        success: true,
        id: resp._id,
        message: `${this.instance.model.modelName.replace('s', '')} updated`,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };
}

module.exports = BaseService;
