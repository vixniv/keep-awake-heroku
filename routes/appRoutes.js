const route = require("express").Router();
const { appControllers } = require("../controllers");

route.get("/", appControllers.getApp);
route.post("/", appControllers.addApp);
route.delete("/", appControllers.deleteApp);

module.exports = route;
