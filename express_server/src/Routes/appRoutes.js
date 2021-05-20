const appRoutes = require("express").Router()

appRoutes.get("/checkToken", (req, res) => {
	res.status(200).send("Token verified");
})

appRoutes.get("/", (req, res) => {
  res.send("Hello world")
});

module.exports = appRoutes
