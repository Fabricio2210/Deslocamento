const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

const rotas = require('./rotas/rotas');

app.use(rotas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});