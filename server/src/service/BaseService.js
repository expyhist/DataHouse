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
        error: error.toString(),
      };
    }
  };

  baseGetById = async (id) => {
    try {
      if (!this.dao.isExists(id)) {
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
        error: error.toString(),
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
        error: error.toString(),
      };
    }
  };

  baseUpdateById = async (id, body) => {
    try {
      if (!this.dao.isExists(id)) {
        throw new Error('The id is not existent');
      }
      const resp = await this.dao.updateById(body);
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} updated`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  baseDeleteById = async (id) => {
    try {
      if (!this.dao.isExists(id)) {
        throw new Error('The id is not existent');
      }
      const resp = await this.dao.deleteById(id);
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} delete`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };
}

module.exports = BaseService;
