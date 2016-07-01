var conf = require("../conf.js");
var errorHandler = require("./errorHandler.js");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

auth = {
  authenticate: function(params,req,res) {
    var hw = encrypt(params.password);
    if(params.username === conf.user && hw === conf.password) {
      req.session.user = params.username;
      res.contentType('application/json').status(200).send({ redirect: '/app' });
    } else{
      errorHandler.auth(req, res);
    }
  }
}

module.exports = auth;