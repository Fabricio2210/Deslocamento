/**
   * Parseamento dos dados enviados da planilha de deslocamento
   * @param {Object} element objeto com os dados do deslocamento pegos da planilha
   */

const dados = (element) => {
  const estado = element.ESTADO;
  //Os locais do deslocamento são dividos por um "X" na planilha
  const dataDesloc = element.DESLOCAMENTO.split("X");
  const primeiro = dataDesloc.shift();
  const ultimo = dataDesloc.pop();
  return {estado,dataDesloc,primeiro,ultimo}
};

module.exports = dados