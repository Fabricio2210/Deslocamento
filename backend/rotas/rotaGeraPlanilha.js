const mongoose = require("mongoose");
const Excel = require("exceljs");
const router = require("express").Router();
require("../Modelos/ExcelModeloRawData");
const ExcelModelo = mongoose.model("ExcelRawData");

//Rota para a criação do arquivo excel com os deslocamentos calculados
router.get("/deslocamento", (req, res) => {
  ExcelModelo.findOne({ idDoc: req.query.idDoc }).then((data) => {
    res.status(201).json({
      dataDeslocamento: data.desl,
    });
  });
  ExcelModelo.findOne({ idDoc: req.query.idDoc }).then((data) => {
    let workbookAtualizado = new Excel.Workbook();
    let sheetAtualizado = workbookAtualizado.addWorksheet("Deslocamento");
    sheetAtualizado.columns = [
      { header: "DESLOCAMENTO", key: "deslocamento", width: 32 },
      { header: "KM", key: "km", width: 5 },
    ];
    for (let index = 0; index < data.data.length; index++) {
      const el = data.data[index];
      const el2 = data.desl[index];
      sheetAtualizado.addRow([el.DESLOCAMENTO, el2]);
    }

    workbookAtualizado.xlsx
      .writeFile(`./public/uploads/${req.query.idDoc}.xlsx`)
      .then(() => {});
  });
});

module.exports = router;
