const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./bd/connectDB");
const app = express();
connectDB();
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rotaGeraPlanilha = require("./rotas/rotaGeraPlanilha");
const rotaUploadFile = require("./rotas/uploadFile");
const rotaDeslocamento = require("./rotas/rotaDeslocamento");

app.use(rotaGeraPlanilha);
app.use(rotaUploadFile);
app.use(rotaDeslocamento);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});
