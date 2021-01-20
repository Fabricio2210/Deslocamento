const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawSchema = new Schema({
  //As informaçõs da planilha
  data: {
    type: Array,
    require: true
  },
  //Nome do arquivo
  idDoc:{
    type: String,
    require: true
  },
  //Deslocamento calculados
  desl:{
    type: Array
  }
});

mongoose.model('ExcelRawData', RawSchema);
