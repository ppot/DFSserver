var express = require('express');
var router = express.Router();
var fs = require('fs');
var auth = require('../utils/auth.js');

/* client auth validation. */
router.post('/auth', function(req,res, next) {
  var user = req.session.user;
  if(user) {
    res.redirect('app');
  } else {
    console.log(req.body);
    var params = {
      username:req.body.username,
      password:req.body.password
    };
    auth.authenticate(params,req,res);
  }
});

module.exports = router;