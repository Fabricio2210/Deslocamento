/**
   * Verifica se o campo ZERO_RESULTS existe na resposta da API do google
   * @param {JSON} valores JSON com os valores dos deslocamentos
   * @param {Document} modelo modelo do documento a ser salvo no banco de dados
   * @param {Response} res resposta da requisição
   * 
   */

const ifValoresZeroResults = (valores, modelo, res) => {
  if (valores.status === "ZERO_RESULTS") {
    modelo
      .findOneAndUpdate({ idDoc: id }, { $push: { desl: "Erro" } })
      .then(() => {})
      .catch((erro) => {
        res.status(500).json({
          msg: "Erro na solicitação",
        });
      });
  }
};

module.exports = ifValoresZeroResults;
