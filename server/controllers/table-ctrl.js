const ApiUrl = require("../models/apitable-model");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const getApiTableDataById = async(req, res) => {

    const isApiUrlExists = ApiUrl.exists({ _id: req.params.id });

    if (isApiUrlExists) {

        try {
            const apiUrl = await ApiUrl.findById(req.params.id);
            
            if (!new RegExp("appCode").test(apiUrl)) {

                const resp = await axios.get(apiUrl.url);
                let result = resp.data;
                result.forEach(data => data["uuid"] = uuidv4());

                return res.status(200).json({
                    success: true,
                    data: result
                })
            }

            const baseUrl = apiUrl.url.match(/(.*)(?=\?)/g)[0];
            const resp = await axios.get(baseUrl, {params: req.body});
            
            if(resp.data.data.totalNum) {
                
                let result = resp.data.data.rows;
                result.forEach(data => data["uuid"] = uuidv4());

                return res.status(200).json({
                    success: true,
                    data: result
                })
            } else {
                return res.status(200).json({
                    success: false,
                    data: []
                })
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.toString()
            })
        }

    } else {
        return res.status(400).json({
            success: false,
            error: "The table do not existent"
        });
    }
}


module.exports = {
    getApiTableDataById
};


