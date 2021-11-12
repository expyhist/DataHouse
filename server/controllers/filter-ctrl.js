const Filter = require("../models/filter-model");
const ApiTable = require("../models/apitable-model");

const createFilter = async (req, res) => {

    const body = req.body;
    const contentType = req.headers["content-type"];
    
    if (!contentType.includes("application/json")) {
        return res.status(406).json({
            success: false,
            error: "Your content-type must be correct"
        });
    }

    const r = await ApiTable.findById(body.apiTableId);

    if (r.connection?.filters) {
        return res.status(400).json({
            success: false,
            error: "Filter already exist"
        });
    }

    const filterLength = Object.entries(body)
        .map(([key, value]) => {
            if (key === "apiTableId") {
                return 0
            } else {
                return value.length
            }
        })
        .reduce((acc, cur) => acc + cur);

    if (!filterLength > 0) {
        return res.status(400).json({
            success: false,
            error: "You must provide a filter"
        });
    }
    
    if (body.hasOwnProperty("apiTableId") && filterLength > 0) {
        
        try {
            const resp = await Filter.create(body);
            const apiTableData = await ApiTable.findById(body.apiTableId);
            await apiTableData.connection.set("filters", resp._id);
            await apiTableData.save();
            return res.status(201).json({
                success: true,
                id: resp._id,
                message: "filter created"
            });
        } catch (error) {
            return res.status(422).json({
                success: false,
                error: error.toString()
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            error: "You must provide a correct json"
        });
    }
}

const updateFilterById = async (req, res) => {

    const isFilterExists = await Filter.exists({ _id: req.params.id });

    if (isFilterExists) {
        try {
            const resp = await Filter.findByIdAndUpdate(req.params.id, req.body);
            return res.status(201).json({
                success: true,
                id: resp._id,
                message: "filter updated"
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.toString()
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            error: "The filter do not existent"
        });
    }
}

const deleteFilterById = async (req, res) => {
    
    const isFilterExists = await Filter.exists({ _id: req.params.id });

    if (isFilterExists) {
        try {
            const resp = await Filter.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                success: true,
                id: resp._id,
                message: "filter deleted"
            })
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.toString()
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            error: "The filter do not existent"
        });
    }
}

const getFilterById = async (req, res) => {

    const isFilterExists = await Filter.exists({ _id: req.params.id });

    if (isFilterExists) {
        try {
            const resp = await Filter.findById(req.params.id);
            return res.status(200).json({
                success: true,
                data: resp
            })
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.toString()
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            error: "The filter do not existent"
        });
    }
}

const getAllFilters = async (req, res) => {

    try {
        const resp = await Filter.find({});
        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.toString()
        });
    }
}


module.exports = {
    createFilter,
    updateFilterById,
    deleteFilterById,
    getFilterById,
    getAllFilters
};