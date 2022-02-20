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
      return res.status(404).json(error);
    }
  };

  baseGetById = async (req, res) => {
    try {
      const resp = await this.service.baseGetById(req.params.id);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  baseCreate = async (req, res) => {
    try {
      const resp = await this.service.baseCreate(req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  baseUpdateById = async (req, res) => {
    try {
      const resp = await this.service.baseUpdateById(req.params.id, req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  baseDeleteById = async (req, res) => {
    try {
      const resp = await this.service.baseDeleteById(req.params.id);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}

module.exports = BaseController;
