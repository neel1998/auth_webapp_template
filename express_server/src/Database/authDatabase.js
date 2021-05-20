const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const sha256 = require('sha256')

var mainPath = path.resolve('/home/neel/auth_webapp_template/express_server/src/Database')

class AuthDatabase {
  constructor() {
    var authDatabase = new sqlite3.Database(mainPath + '/authDatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    	if (err) {
    		console.log(err.message);
    	} else {
    		authDatabase.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL, username VARCHAR(80) NOT NULL, psswd VARCHAR(80) NOT NULL, name VARCHAR(80) NOT NULL, email VARCHAR(250) NOT NULL, PRIMARY KEY (id))');
    	}
    });
  }

  login(body) {
    return new Promise( (res,rej) => {
      var database = new sqlite3.Database(mainPath + '/authDatabase.db', (err) => {
      	if (err) {
          rej(err.message)
      	} else {
          database.get("select * from users where username = ?", [body.username], (err, row) => {
      			if (err) {
      				rej(err.message);
      			} else {
      				if (row == undefined) {
      				 rej("Invalid Credentials");
      				} else {
      					if (sha256(body.psswd) == row.psswd) {
      						res(row);
      					} else {
      						rej("Invalid Credentials");
      					}
      				}
      			}
      		});
      	}
      });
    })
  }

  register(body) {
    return new Promise((res, rej) => {
      var database = new sqlite3.Database(mainPath + '/authDatabase.db', (err) => {
        if (err) {
      		rej(1,err.message);
      	} else {
          database.get("select * from users where username = ?", [body.username], (err, row) => {
        		if (err) {
              rej(1,err.message)
        		} else {
        			if (row == undefined) {
        				var vals = [body.username, sha256(body.psswd), body.name, body.email]
        				database.run("INSERT INTO users (username, psswd, name, email) VALUES (?,?,?,?)", vals, (err, result) => {
        					if (err) {
                    rej(1,err.message)
        					} else {
                    res()
        					}
        				});
        			} else {
        				rej(0,"Username Already taken")
        			}
        		}
        	});
      	}
      });
    })
  }
}

module.exports = AuthDatabase;
