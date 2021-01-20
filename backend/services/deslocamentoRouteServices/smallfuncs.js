/**
   * Pequenas funções para o parseamento das informações dos deslocamentos
   * @param {JSON} valores JSON com os valores dos deslocamentos
   * 
   */
const smallfuncs = (valores) => {
  //Verifica se houve algum resultado parcial
  let sePartialMatch = valores.geocoded_waypoints.find((element) => {
    return element.partial_match == true;
  });
  const errata = valores.geocoded_waypoints[1].partial_match;
  let totalDistance = 0;
  let leg = valores.routes[0].legs;
  for (let i = 0; i < leg.length; ++i) {
    //Transformando de metros para quilômetros
    totalDistance += leg[i].distance.value / 1000;
  }
  //Salvando os deslocamentos calculados no banco de dados
  let deslocamentoCalculado = Math.trunc(totalDistance);
  return {sePartialMatch,errata,deslocamentoCalculado}
};

module.exports = smallfuncs