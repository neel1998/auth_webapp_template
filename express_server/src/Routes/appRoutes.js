const appRoutes = require("express").Router()

appRoutes.get("/", (req, res) => {
  res.send("Hello world")
});

module.exports = appRoutes
