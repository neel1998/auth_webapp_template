let jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwtsecrettoken'


let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
  	if (token.includes(" ")) {
  		token = token.split(" ")[1]
  	}
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(404).json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = checkToken
