var http = require('http');
var fs = require("fs");
var api = require("./api/acortador");
var mongo = require('mongodb').MongoClient;

require('dotenv').config();

// En otra terminal correr: $ mongod --smallfiles
mongo.connect(process.env.MONGO_URI || process.env.MONGOLAB_URI,function(err,db){
    if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
  db.createCollection("sitios", { capped : true, size : 5242880, max : 5000 } );

  //creo server
  var server = http.createServer(function(req,res){
  if (req.url == "/"){
    fs.readFile("./client/index.html",function(err,data){
      if (err) {enviar404(res);}
      res.writeHead(200, {"content-type": "text/html; charset=UTF-8"});
      res.end(data);
    })
  } else {
    api(req,res,db.collection("sitios"));
  }
  });
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
  });
});



function enviar404(resp) {
  resp.writeHead(404, {'Content-Type': 'text/plain'});
  resp.write('Error 404: resource not found.');
  resp.end();
}