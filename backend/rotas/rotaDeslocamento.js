const mongoose = require("mongoose");
const calcWay = require("../services/helpers/calcWay");
const googleMapsObjects = require("../services/deslocamentoRouteServices/googleMapsObject");
const dadosDeslocamento = require("../services/deslocamentoRouteServices/calcElemDeslocamento");
const ifValoresZeroResults = require("../services/deslocamentoRouteServices/ifValoresZeroResults");
const smallfuncs = require("../services/deslocamentoRouteServices/smallfuncs");
const updateDesl = require("../services/deslocamentoRouteServices/updateDesloc");
const googleMapsApi = require("../services/deslocamentoRouteServices/googleApi");
const router = require("express").Router();
require("../Modelos/ExcelModeloRawData");
const ExcelModelo = mongoose.model("ExcelRawData");

/* Rota para o cálculo dos deslocamentos
    Obs: O setTimeout é necessário para sincronizar as requisições da api do google, 
    que é equivalente a uma linha da planilha(um deslocamento) por segundo, então o tempo necessário para as requisições 
     é igual ao tamanho(length) da array dos deslocamentos*/

router.post("/deslocamento", (req) => {
  const id = req.body.dataId;
  const result = req.body.dataDesloc;
  const interval = 1000;
  result.forEach((element, index) => {
    setTimeout(() => {
      let dados = dadosDeslocamento(element);
      let wayArray = [];
      calcWay(dados.dataDesloc, dados.estado, wayArray);
      let googleObj = googleMapsObjects(
        dados.primeiro,
        dados.estado,
        dados.ultimo,
        wayArray,
      );
      googleMapsApi(googleObj, (erro, res) => {
        if (erro) {
          res.status(500).json({
            msg: "Erro na requisição",
          });
        } else {
          const valores = res.json;
          ifValoresZeroResults(valores, ExcelModelo, res);
          if (smallfuncs(valores).sePartialMatch !== undefined) {
            deslocamentoCalculado = "Erro";
          }
          updateDesl(ExcelModelo,id,smallfuncs(valores).deslocamentoCalculado,res);
        }
      });
    }, index * interval);
  });
});

module.exports = router;
