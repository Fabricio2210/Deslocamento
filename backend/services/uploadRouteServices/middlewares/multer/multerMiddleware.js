const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + path.extname("./modelo.xlsx"));
  },
});
/**
 * Biblioteca para parsear os dados da planilha enviado ao servidor
 * @param {Request} req requisição do frontend
 * @param {Multer.file} file  dados da planilha
 */
const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== ".xlsx") {
      return cb(null, false);
    }
    if (file == undefined) {
      return cb(null, false);
    }

    cb(null, true);
  },
}).single("file");

module.exports = upload;
