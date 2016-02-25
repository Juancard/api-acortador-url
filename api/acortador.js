module.exports = function(res,url){
    var match = url.match(/(^\/new\/)(.+)/);
    if (match[1] == "/new/"){
      var urlJson = JSON.stringify({"original_url": match[2]});
      res.writeHead(200, {"content-type": "text/json"});
      res.end(urlJson);
    }
}
