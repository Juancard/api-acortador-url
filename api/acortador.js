var arregloUrl = {};
var valorAcorte = 0;
module.exports = function(req,res){
    var match = req.url.match(/(^\/new\/)(.+)/);
    if (match[1] == "/new/"){
        var urlDada = match[2];
        var nuevaUrl = "https://" + req.headers.host + "/" + ++valorAcorte;
        arregloUrl[valorAcorte] = nuevaUrl;
        var urlJson = JSON.stringify({"url_original": urlDada, "url_corta":nuevaUrl});
        res.writeHead(200, {"content-type": "text/json"});
        res.end(urlJson);
    }
}
