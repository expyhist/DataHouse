const express = require("express");
const router = express.Router();

const ApiTable = require("../controllers/apitable-ctrl");

router.post("/apitable", ApiTable.createApiTable);
router.put("/apitable/:id", ApiTable.updateApiTableById);
router.delete("/apitable/:id", ApiTable.deleteApiTableById);
router.get("/apitable/:id", ApiTable.getApiTableById);
router.get("/apitables", ApiTable.getAllApiTables);

const Table = require("../controllers/table-ctrl");

router.post("/apitabledata/:id", Table.getApiTableDataById);

const Menu = require("../controllers/menu-ctrl");

router.post("/menu", Menu.createMenu);
router.put("/menu/:id", Menu.updateMenuById);
router.delete("/menu/:id", Menu.deleteMenuById);
router.post("/menu/:id", Menu.getMenuById);
router.get("/menus/:type", Menu.getAllMenus);

const Filter = require("../controllers/filter-ctrl");

router.post("/filter", Filter.createFilter);
router.put("/filter/:id", Filter.updateFilterById);
router.delete("/filter/:id", Filter.deleteFilterById);
router.get("/filter/:id", Filter.getFilterById);
router.get("/filters", Filter.getAllFilters);

const Demand = require("../controllers/demand-ctrl");

router.post("/demand", Demand.createDemand);
router.put("/demand/:id", Demand.updateDemandById);
router.delete("/demand/:id", Demand.deleteDemandById);
router.get("/demand/:id", Demand.getDemandById);
router.get("/demands", Demand.getAllDemands);

module.exports = router;