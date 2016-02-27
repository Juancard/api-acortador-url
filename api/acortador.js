var shortid = require("shortid");
var validUrl = require('valid-url');

var urlGuardadas = {"N1-icw_sx": "http://blog.codinghorror.com/"}; //Cargo una url como ejemplo

module.exports = function(req,res,coleccion){
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match && match[1] == "/new/"){
        var urlDada = match[2];
        if (!validUrl.isUri(urlDada)){
            return errorJson(res,"Url invalida");
        }
        var shortUrl = buscarUrl(urlDada);
        var otraShortUrl = buscarUrlDb(coleccion, urlDada);//callback!
        console.log(otraShortUrl);
        if (!shortUrl) {
            shortUrl = shortid.generate();
            urlGuardadas[shortUrl] = urlDada;
            guardarUrl(coleccion,shortUrl,urlDada);
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
            errorJson(res,"No hay Url acortada para el input dado");
        }
    }
}

function guardarUrl(coleccion,urlCorta,urlOriginal){
    var objetoUrl = {
        corta: urlCorta,
        original: urlOriginal
    }
    coleccion.insert(objetoUrl,function(err,data){
        if (err) {throw err;}
        console.log("Agregado: ",data);
    })
}

function buscarUrl(urlBuscada){
    for (var key in urlGuardadas) {
        if (urlGuardadas[key] == urlBuscada) {return key;}
    }
    return null;
}

function buscarUrlDb(coleccion, urlBuscada){
    coleccion.findOne({
        "original":urlBuscada
    },function(err,data){
        if (err) throw err;
        console.log("se encontro: ",data);
        return data.original;
    });
}

function errorJson(res, mensaje){
    res.writeHead(404, {'Content-Type': 'text/json'});
    var err = JSON.stringify({"error":mensaje});
    res.end(err);
}