//errorHandler module
errorHandler = {
  connectionError: function(err,req, res)  {
    res.set('Content-Type', 'text/json');
    res.status(500).send(JSON.stringify({
      status:500,
      message:"Error connecting to database",
      detailed_message: err.message
    }))
    return;
  },
  query: function(err, result,req, res)  {
    var status = err ? 500 : 404;
    res.set('Content-Type', 'text/json');
    res.status(status).send(JSON.stringify({
      status: status,
      message: err ? "Error getting query" : "Item dosen't exist",
      detailed_message: err ? err.message : ""
    }))
    return;
  },
  connectionRelease: function(fnctTitle, err)  {
    if (err) {
      console.error(err.message);
    } else {
      console.log(fnctTitle + ' : Connection released');
    }
  },
  auth: function(req, res)  {
    res.set('Content-Type', 'text/json');
    res.status(404).send(JSON.stringify({
      status: 404,
      message: "Username or password dosne't exist",
      detailed_message: ""
    }))
  },
}

module.exports = errorHandler;