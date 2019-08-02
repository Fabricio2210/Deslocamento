<template>
    <div class="container">
        <notifications class="py-1" group="sucesso" classes="alert alert-success bg-success text-white animated slideInDown faster"  position="top center"/>
        <notifications class="py-1" group="erro" classes="alert bg-danger text-white animated slideInDown faster " role="alert" position="top center"/> 
       <transition leave-active-class="animated fadeOut" mode="out-in">
           <div class="form-group" v-if="isArquivoEnviado">
            <div class="input-group"> 
                <label>File</label>
                <input class="btn btn-secondary custom-file-label py-1" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </div>
            <br>
            <button class="btn btn-primary btn-lg btn-block" v-on:click="submitFile()" type="submit">Enviar Arquivo</button>
        </div>
       </transition>
        
        <a class="btn btn-primary btn-lg btn-block" href="seubackendaqui/upload.xlsx" role="button">Planilha Modelo</a>
   
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Input",
    data(){
        return{
            locals:"",
            isArquivoEnviado: true
        }
    },
    methods:{
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
         submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            
            axios.post('seu backend aqui',
            formData,{
            }).then((res)=>{
                this.$notify({
                    group: 'sucesso',
                    text: `<h6 class="text-center">Arquivo enviado com sucesso!</h6>`,
                    type:"success"
                });
        
                 this.locals = res.data
                
                
                 this.$emit('dados-bd',this.locals);
                 this.isArquivoEnviado = false;
               
            })
            .catch((error)=>{
                if(error.response){
                  this.$notify({
                    group: 'erro',
                    text: `<h6 class="text-center">${error.response.data.erro[0].text}</h6>`,
                    type:"error"
                });  
                   
                }
               
                
            })
           
          
        },
    },

    
}
</script>

<style>

</style>
