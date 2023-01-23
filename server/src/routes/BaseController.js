class BaseController {
  constructor(service) {
    this.service = service;
  }

  getServiceInstance = () => this.service;

  baseGetAll = async (req, res) => {
    try {
      const resp = await this.service.baseGetAll();
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(400).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  baseGetById = async (req, res) => {
    try {
      const resp = await this.service.baseGetById(req.params.id);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  baseCreate = async (req, res) => {
    try {
      const resp = await this.service.baseCreate(req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  baseUpdateById = async (req, res) => {
    try {
      const resp = await this.service.baseUpdateById(req.params.id, req.body);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  baseDeleteById = async (req, res) => {
    try {
      const resp = await this.service.baseDeleteById(req.params.id);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };
}

module.exports = BaseController;
