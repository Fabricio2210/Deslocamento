const mongoose = require("mongoose");
const multerMiddleware = require("../services/uploadRouteServices/middlewares/multer/multerMiddleware");
const saveData = require("../services/uploadRouteServices/middlewares/mongoXlsx/mongoXlsx");
const router = require("express").Router();
require("../Modelos/ExcelModeloRawData");
const ExcelModelo = mongoose.model("ExcelRawData");

//Rota para pegar a planilha com os deslocamentos

router.post("/", (req, res) => {
  multerMiddleware(req, res, (err) => {
    let model = new ExcelModelo();
    let erro = [];
    if (req.file == undefined) {
      erro.push({ text: "Somente arquivos xlsx" });
    }
    if (erro.length > 0) {
      res.status(500).json({
        erro,
      });
    } else {
      saveData(req, res, model);
    }
  });
});

module.exports = router;
