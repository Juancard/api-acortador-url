var http = require('http');
var fs = require("fs");
var path = require("path");
var url = require("url");
var server = http.createServer(function(req,res){
  if (req.url == "/"){
    fs.readFile("./client/index.html",function(err,data){
      if (err) {enviar404(res);}
      res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
      res.end(data);
    })
  } else {
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match[1] == "/new/"){
      var urlJson = JSON.stringify({"original_url": match[2]});
      res.writeHead(200, {"content-type": "text/json"});
      res.end(urlJson);
    }
  }
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

function enviar404(resp) {
  resp.writeHead(404, {'Content-Type': 'text/plain'});
  resp.write('Error 404: resource not found.');
  resp.end();
}