var https = require("https");
var shortid = require("shortid");
var arregloUrl = {};
var valorAcorte = 0;
module.exports = function(req,res){
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match && match[1] == "/new/"){
        var urlDada = match[2];
        var shortGenerado = shortid.generate();
        var nuevaUrl = "https://" + req.headers.host + "/" + shortGenerado/*++valorAcorte*/;
        arregloUrl[shortGenerado] = urlDada;
        //arregloUrl[valorAcorte] = urlDada;
        var urlJson = JSON.stringify({"url_original": urlDada, "url_corta":nuevaUrl});
        res.writeHead(200, {"content-type": "text/json"});
        res.end(urlJson);
    } else{
        var pathAcortado = req.url.slice(1);
        var urlPedida = arregloUrl[pathAcortado];
        if (urlPedida){
            res.writeHead(301,{"Location":urlPedida});
            res.end();
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Error 404: resource not found.');
            res.end();
        }
        
    }
}

var callbackSolicitud = function(response){
    var datos = '';
    response.on('data',function(data){
        datos += data;
    });
    response.on('end',function(data){
        datos += data;
        console.log(datos);
    });
}