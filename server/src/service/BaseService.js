const parseTimeToLocale = require('../utils/parseTimeToLocale');

class BaseService {
  constructor(dao) {
    this.dao = dao;
  }

  getDaoInstance = () => this.dao;

  baseGetAll = async () => {
    try {
      const resp = await this.dao.getAll();
      return {
        success: true,
        data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
      };
    } catch (error) {
      return {
        success: false,
        msg: error.toString(),
      };
    }
  };

  baseGetById = async (id) => {
    try {
      const isExists = await this.dao.isExists(id);
      if (!isExists) {
        throw new Error('The id is not existent');
      }
      const resp = await this.dao.getById(id);
      return {
        success: true,
        data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
      };
    } catch (error) {
      return {
        success: false,
        msg: error.toString(),
      };
    }
  };

  baseCreate = async (body) => {
    try {
      const resp = await this.dao.add(body);
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} created`,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.toString(),
      };
    }
  };

  baseUpdateById = async (id, body) => {
    try {
      const isExists = await this.dao.isExists(id);
      if (!isExists) {
        throw new Error('The id is not existent');
      }
      const resp = await this.dao.updateById(id, body);
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} updated`,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.toString(),
      };
    }
  };

  baseDeleteById = async (id) => {
    try {
      const isExists = await this.dao.isExists(id);
      if (!isExists) {
        throw new Error('The id is not existent');
      }
      const resp = await this.dao.deleteById(id);
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} deleted`,
      };
    } catch (error) {
      return {
        success: false,
        msg: error.toString(),
      };
    }
  };
}

module.exports = BaseService;
