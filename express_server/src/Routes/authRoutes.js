const authRoutes = require("express").Router()
const AuthDatabase = require("../Database/authDatabase")
let jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwtsecrettoken'

authRoutes.post('/login', (req, res) => {
  var authDatabase = new AuthDatabase();
  authDatabase.login(req.body).then((val) => {
    let token = jwt.sign( {id : val.id},
          JWT_SECRET,
          { expiresIn: '24h' 
          }
        );
		res.status(200).json(
			{"msg" : "Login successful",
			"data": {
				"username" : val.username,
				"id" : val.id,
				"name" : val.name,
				"email" : val.email,
			},
			"token": token
		});
  }).catch((err) => {
    res.status(400).send(err)
  })
})

authRoutes.post('/register', (req, res) => {
  var authDatabase = new AuthDatabase();
  authDatabase.register(req.body).then(() => {
    res.status(200).send("Register successful")
  }).catch((code, err) => {
    if (code === 0) {
      res.status(402).send(err)
    } else {
      res.status(400).send(err)
    }
  })
})


module.exports = authRoutes
