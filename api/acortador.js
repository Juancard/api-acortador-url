var https = require("https");
var shortid = require("shortid");
var urlGuardadas = {};
module.exports = function(req,res){
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match && match[1] == "/new/"){
        var urlDada = match[2];
        var shortUrl = buscarUrl(urlDada);
        if (!shortUrl) {
            shortUrl = shortid.generate();
            urlGuardadas[shortUrl] = urlDada;
        }
        var nuevaUrl = "https://" + req.headers.host + "/" + shortUrl;
        var urlJson = JSON.stringify({"url_original": urlDada, "url_corta":nuevaUrl});
        res.writeHead(200, {"content-type": "text/json"});
        res.end(urlJson);
    } else{
        var pathAcortado = req.url.slice(1);
        var urlPedida = urlGuardadas[pathAcortado];
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

function buscarUrl(urlBuscada){
    for (var key in urlGuardadas) {
        if (urlGuardadas[key] == urlBuscada) return key;
    }
    return null;
}