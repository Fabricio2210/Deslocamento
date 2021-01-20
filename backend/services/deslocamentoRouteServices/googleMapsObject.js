/**
   * Gera o objeto para a API do google
   * @param {String} primeiro primeira parada do deslocamento
   * @param {String} estado nome do estado por extenso
   * @param {String} ultimo última parada do deslocamento
   *  @param {Array} wayArray lista das paradas entre a primeira e última parada
   * 
   */
const googleMapsObjects = (primeiro,estado,ultimo,wayArray) => {
  let googleObj = {
    origin: `${primeiro},${estado}`,
    destination: `${ultimo},${estado}`,
    waypoints: wayArray,
    mode: "driving",
  };
  return googleObj
};

module.exports = googleMapsObjects;
