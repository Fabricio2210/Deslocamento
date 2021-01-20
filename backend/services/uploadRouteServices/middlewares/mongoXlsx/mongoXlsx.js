const mongoose = require("mongoose");
const mongoXlsx = require("mongo-xlsx");
require("../../../../Modelos/ExcelModeloRawData");
const ExcelModelo = mongoose.model("ExcelRawData");

/**
 * Converte as informações da planilha para ser salva no mongoDb
 * @param {Request} req requisição do frontend
 * @param {Response} res resposta do servidor
 * @param {Model} model modelo a ser salvo no banco de dados
 *
 */

const saveData = (req, res, model) => {
  let xlsx = `./uploads/${req.file.filename}`;
  mongoXlsx.xlsx2MongoData(xlsx, model, function (err, data) {
    let modelo = new ExcelModelo({
      data: data,
      idDoc: req.file.filename.split(".")[0],
    });
    modelo.save().then((data) => {
      res.status(201).json({
        data: data,
        idDoc: data.idDoc,
        dataDesl: data.desl
      });
    });
  });
};

module.exports = saveData;
