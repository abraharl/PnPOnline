/*TODO: implement encryption*/

var config = require('./config');
var mysql = require('mysql');
var crypto = require('crypto');

var connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database 
  });

function validateUsername(username,password,email,callback){
  var selectStatement = "SELECT * FROM users WHERE username = '"+username+"'";
	connection.query(selectStatement, function(err, rows) {
    if(err){ 
      callback(err);
    }
    else if(rows.length>0){
      callback("That username already exists.")
    }
    else{
      callback(true);
    }
});
}

function validateEmail(username,password,email,callback){
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(regex.test(email)){

    var selectStatement = "SELECT * FROM users WHERE email = '"+email+"'";

    connection.query(selectStatement, function(err,rows){
      if(err){
        callback(err);
      }
      else if(rows.length > 0){
        callback("That email address already exists.");
      }
      else{
        validateUsername(username,password,email,function(result){
          callback(result);
        });
      }
    });
  }
  else{callback("The email address is invalid.");}
}

/**
* validateUser - validates the new user information
* createUser - creates a new user
**/
module.exports = {
	validateUser: function(username,password,email,callback){
    var createdUserMsg = null;
		validateEmail(username, password, email, function(result){
        callback(result);
    });
	},
  createUser:function(username,password,email,callback){
    var lastId = "SELECT id FROM users WHERE id IS NOT null ORDER BY id DESC LIMIT 1"
    connection.query(lastId,function(err,rows){
      if(err){
        callback(err);
      }
      else{
        var id = parseInt(rows[0].id) + 1;
        var createUser = "INSERT INTO users VALUES ('"+id+"','"+username+"','"+password+"','"+email+"')";
        connection.query(createUser,function(err,rows){
          if(err){
            callback(err);
          }
          else{
            callback(true);
          }
        });
      }
    });
  }
} 