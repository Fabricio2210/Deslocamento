const mongoose = require ('mongoose');
const multer = require('multer');
const mongoXlsx = require('mongo-xlsx');
const path = require('path');
const keys = require('../bd/key');
const shortid = require('shortid');
const Excel = require('exceljs');
const googleMapsClient = require('@google/maps').createClient({
  // key: insira sua chave aqui
});
const router = require('express').Router();

//conexão com o banco de dados
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  require('../Modelos/ExcelModeloRawData');

const ExcelModelo =  mongoose.model('ExcelRawData');

//multer middleware
const storage = multer.diskStorage(
 
  {
    destination: './uploads',
    filename: function(req, file, cb) {
      cb(
        null,
        shortid.generate() + path.extname('./modelo.xlsx')
      );
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 6000000 },
    fileFilter: function(req, file, cb) {
      if (path.extname(file.originalname) !== '.xlsx') {
        return cb(null, false);
      }
      if (file == undefined) {
        return cb(null, false);
      }
  
      cb(null, true);
    }
  }).single('file');

  //teste se o serve está "up" 
  router.get('/',(req,res)=>{
    res.send('<h1>TESTE</h1>');
  })

  //Rota para pegar o arquivo excel com os deslocamentos
  router.post('/', (req, res) => {
    upload(req, res, err => {
      let model = new ExcelModelo();
      let erro = [];
      if (req.file == undefined) {
        erro.push({ text: 'Somente arquivos xlsx' });
      }
      if (erro.length > 0) {
        res.status(500).json({
        erro
        });
      } else{
        //Salvando as informaçõs da planilha no banco de dados
        let xlsx = `./uploads/${req.file.filename}`;
        mongoXlsx.xlsx2MongoData(xlsx, model, function(err, data) {
          let modelo = new ExcelModelo({
            data: data,
            idDoc: req.file.filename.split('.')[0]
          });
          //Enviando as informações para o frontend
          modelo.save().then((data) => {
            res.status(201).json({
               data:data,
               idDoc: data.idDoc,
               dataDesl:data.desl

            });

          });
         
        }); 
      };
      }
    );
   
  });
   /* Rota para o cálculo dos deslocamentos
    Obs: O setTimeout é necessário para sincronizar as requisições da api do google, 
    que é equivalente a uma linha da planilha(um deslocamento) por segundo, então o tempo necessário para as requisições 
     é igual ao tamanho(length) da array dos deslocamentos*/
  router.post('/deslocamento',(req,resp)=>{
    const id = req.body.dataId;
    const result = req.body.dataDesloc;
    const interval = 1000;
    result.forEach((element,index) => {
      setTimeout(()=>{
        //Ordenando os wayponts
        function calcWay(){
          if(dataDesloc.length == 0){
            waypt = null;
          }else{
            for( let i = 0; i< dataDesloc.length; i++){
              waypt = `${dataDesloc[i]} - State of ${estado}, Brazil`
              wayArray.push(waypt)
            };
          };
        };
        const estado = element.ESTADO;
        //Os locais do deslocamento são dividos por um "X" na planilha 
        const dataDesloc = element.DESLOCAMENTO.split("X");
        const primeiro = dataDesloc.shift();
        const ultimo = dataDesloc.pop();
        let wayArray = [];
        let waypt;
        calcWay();
        googleMapsClient.directions({
          origin:`${primeiro},${estado}`,
          destination:`${ultimo},${estado}`,
          waypoints: wayArray,
          mode:"driving"
        },(erro,res)=>{
          if(erro){
            res.status(500).json({
              msg: "Erro na requisição"
          })
          }else{
            const valores = res.json;
            //Verificar se não achou os locais do deslocamento
             if(valores.status === 'ZERO_RESULTS'){
              ExcelModelo.findOneAndUpdate({idDoc:id},{"$push":{desl:"Erro"}}).then(()=>{
              }).catch((erro)=>{
                res.status(500).json({
                  msg:"Erro na solicitação"
                });
              });
            };
             const errata = valores.geocoded_waypoints[1].partial_match;
            let totalDistance = 0;
            let leg = valores.routes[0].legs;
            for(let i=0; i<leg.length; ++i){
              //Transformando de metros para quilômetros
              totalDistance += (leg[i].distance.value)/1000

            };
            //Salvando os deslocamentos calculados no banco de dados
            let deslocamentoCalculado = Math.trunc(totalDistance)
            //Caso dê um resultado parcial retorna erro
            if(errata== true){
              deslocamentoCalculado = "Erro";
            };
            ExcelModelo.findOneAndUpdate({idDoc:id},{"$push":{desl:deslocamentoCalculado}}).then(()=>{
            }).catch((erro)=>{
              res.status(500).json({
                msg:"Erro na solicitação"
              })
            });
            
          };
         
        });
      }, index * interval);
    });
      
  });
 
  //Rota para a criação do arquivo excel com os deslocamentos calculados
  router.get('/deslocamento',(req,res)=>{
    ExcelModelo.findOne({idDoc:req.query.idDoc})
    .then((data)=>{
      res.status(201).json({
        dataDeslocamento: data.desl
      })
    });
    ExcelModelo.findOne({idDoc:req.query.idDoc})
      .then((data)=>{
          let workbookAtualizado = new Excel.Workbook();
          let sheetAtualizado = workbookAtualizado.addWorksheet('Deslocamento');
          sheetAtualizado.columns = [
            { header: 'DESLOCAMENTO', key: 'deslocamento', width: 32 },
            { header: 'KM', key: 'km', width: 5 },               
          ];
          for (let index = 0; index < data.data.length; index++) {
            const el = data.data[index];
            const el2 = data.desl[index];
            sheetAtualizado.addRow([
            el.DESLOCAMENTO,
            el2
            ]);
        };
        
        workbookAtualizado.xlsx
          .writeFile(`./public/uploads/${req.query.idDoc}.xlsx`)
            .then(()=> {});
            console.log(data.desl.toString());
        
      })
    
   
  });

  module.exports = router;
 
