var http = require('http');
var fs = require("fs")

var server = http.createServer(function(req,res){
  if (req.url == "/"){
    fs.readFile("./client/index.html",function(err,data){
      console.log("leyendo");
      if (err) {enviar404(res);}
      res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
      res.end(data);
      console.log("ya lei");
    })
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