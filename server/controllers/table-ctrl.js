const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { produce } = require('immer');

const ApiUrl = require('../models/apitable-model');

const getDataWithUUID = (data) => {
  const result = produce(data, (draft) => {
    draft.map((obj) => {
      const newObj = obj;
      const uuid = Object.prototype.hasOwnProperty.call(obj, 'uuid') ? obj.uuid : uuidv4();
      newObj.uuid = uuid;
      return newObj;
    });
  });
  return result;
};

const getApiTableDataById = async (req, res) => {
  try {
    const apiUrl = await ApiUrl.findById(req.params.id);

    if (!/appCode/.test(apiUrl)) {
      const resp = await axios.get(apiUrl.url);
      const result = getDataWithUUID(resp.data);
      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    const baseUrl = apiUrl.url.match(/(.*)(?=\?)/g)[0];
    const resp = await axios.get(baseUrl, { params: req.body });

    if (resp.data.data.totalNum) {
      const result = getDataWithUUID(resp.data.data.rows);
      return res.status(200).json({
        success: true,
        data: result,
      });
    }
    return res.status(200).json({
      success: false,
      data: [],
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

module.exports = {
  getApiTableDataById,
};
