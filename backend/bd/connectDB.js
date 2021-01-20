const mongoose = require('mongoose');
const key = require('./key');

const connectDB = async () =>{
    try{
        await mongoose.connect(key.mongoURI,{
            useNewUrlParser:true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        });
        console.log('Conectado no Banco de dados')
    } catch(err){
        console.log(err.message)
    }
};

module.exports = connectDB