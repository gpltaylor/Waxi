var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var port = process.env.port || 1337;

// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// Listen
server.listen(port);