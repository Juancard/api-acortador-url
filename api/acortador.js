var shortid = require("shortid");
var validUrl = require('valid-url');

module.exports = function(req,res,coleccionManager){
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match && match[1] == "/new/"){
        var urlDada = match[2];
        if (!validUrl.isUri(urlDada)){
            return errorJson(res,"Url invalida");
        }
        urlDada = removerBarraFinal(urlDada);
        buscarUrlPorOriginal(coleccionManager, urlDada, function(shortUrl){
            if (!shortUrl) {
                shortUrl = shortid.generate();
                guardarUrl(coleccionManager,shortUrl,urlDada);
            }
            var nuevaUrl = req.headers['x-forwarded-proto'] + "://" + req.headers.host + "/" + shortUrl;
            console.log("url generada: ",nuevaUrl);
            var urlJson = JSON.stringify({"url_original": urlDada, "url_corta":nuevaUrl});
            res.writeHead(200, {"content-type": "application/json; charset=UTF-8"});
            res.end(urlJson);
        });
    } else{
        var pathAcortado = req.url.slice(1);
        buscarUrlPorCorta(coleccionManager,pathAcortado,function(urlPedida){
            if (urlPedida){
                res.writeHead(301,{"Location":urlPedida});
                res.end();
            }else{
                errorJson(res,"No hay Url acortada para el input dado");
            } 
        });
    }
}

function guardarUrl(coleccionManager,urlCorta,urlOriginal){
    var objetoUrl = {
        corta: urlCorta,
        original: urlOriginal
    }
    coleccionManager.insertarDocumento(objetoUrl,function(err,data){
        if (err) {throw err;}
        console.log("Agregado: ",data);
    });
}
function buscarUrlPorOriginal(coleccionManager,urlOriginal, callback){
    var objetoBusqueda = {
        "original":urlOriginal
    }
    coleccionManager.buscarUnicoDocumento(objetoBusqueda,function(err,data){
        if (err) throw err;
        var corta = obtenerPropiedadDocumento(data,"corta");
        callback(corta);
    });
}
function buscarUrlPorCorta(coleccionManager,urlCorta, callback){
    var objetoBusqueda = {
        "corta":urlCorta
    }
    coleccionManager.buscarUnicoDocumento(objetoBusqueda,function(err,data){
        if (err) throw err;
        var original = obtenerPropiedadDocumento(data,"original");
        callback(original);
    });
}

function obtenerPropiedadDocumento(documento,propiedad){
    var valor = null;
    if (documento){
        valor = documento[propiedad];
        console.log("se encontro:",valor);
    }
    return valor;
}

function errorJson(res, mensaje){
    res.writeHead(404, {'Content-Type': "application/json; charset=UTF-8"});
    var err = JSON.stringify({"error":mensaje});
    res.end(err);
}

function removerBarraFinal(urlDada){
    var ultimoCaracter = urlDada.substr(urlDada.length-1);
    while (ultimoCaracter == "/"){
        urlDada = urlDada.substr(0,urlDada.length-1);
        ultimoCaracter = urlDada.substr(urlDada.length-1);
    }
    console.log("luego de removido: ",urlDada);
    return urlDada;
}
