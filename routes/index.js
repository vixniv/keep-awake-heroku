const route = require("express").Router();
const AppRoutes = require("./appRoutes");

route.use("/app", AppRoutes);

module.exports = route;
