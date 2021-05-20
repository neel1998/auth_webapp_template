const express = require("express")
const appRoutes = require("./Routes/appRoutes")
const authRoutes = require("./Routes/authRoutes")
const middleware = require("./middleware")
const cors = require("cors")
const AuthDatabase = require("./Database/authDatabase")


const app = express()
const authDatabase = new AuthDatabase()

app.use(express.json())
app.use(cors())

//public routes
app.use(authRoutes)
//private routes which will require authentication
app.use(middleware, appRoutes)

app.listen(3000)
