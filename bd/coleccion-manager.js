function ColeccionManager(coleccion) {
  this.coleccion = coleccion;
}

ColeccionManager.prototype.insertarDocumento = function insertarDocumento(objetoJson,callback) {
    this.coleccion.insert(objetoJson,callback);
};
ColeccionManager.prototype.buscarUnicoDocumento = function buscarUnicoDocumento(objetoJson,callback){
    this.coleccion.findOne(objetoJson,callback);
}

module.exports = ColeccionManager;