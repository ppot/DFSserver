var express = require('express');
var redis = require('redis');

var router = express.Router();

/* redis */
// var host = process.env.REDIS_PORT_6379_TCP_ADDR || '172.16.238.8';
// var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
// var client = redis.createClient(port, host);

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/app');
  } else {
    res.render('index', { title: 'DFS avocado' });
  }
  // client.incr('counter', function(err, result) {
  //   if (err) {
  //     return next(err);
  //   }
  // 
  //   res.render('index', { title: 'Express', counter: result });
  // });
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  if(req.session.user) {
    req.session.destroy();
  }
  res.redirect('/');
});

router.get('/app', function(req, res, next) {
  // if(!req.session.user){
  //   res.redirect('/');
  // } else {
    res.render('app', { title: 'DFS avocado - app' });
  // }
});


module.exports = router;
