<template>
  <div class="container">
      <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage">
      </loading>
        <div class="form-group py-2">
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
             <button key="um" class="btn btn-secondary btn-lg btn-block list-complete-item" v-if="idDoc && !isDeslocamento" v-on:click="enviaDeslocamento()" >Gerar Deslocamentos</button>
          <button key="dois" class="btn btn-warning btn-lg btn-block list-complete-item" v-if="isDeslocamento && isbtnYelo" v-on:click="teste()">Calcular Deslocamentos</button>
          <button key= "tres" class="btn btn-warning btn-lg btn-block list-complete-item" v-if="isReset" v-on:click="resetar()">Novo Arquivo</button>
          </transition>
          <transition enter-active-class="animated fadeIn delay-1s" leave-active-class="animated fadeOut" mode="out-in">
           <a key="quatro" :href="`seu backend aqui/uploads/${idDoc}.xlsx`" role="button" class="btn btn-success btn-lg btn-block list-complete-item"  v-if="isReset">Baixar Arquivo</a>
          </transition>
      </div>
    <br>
    <div class="row" v-if="isDeslocamento">
      <h5 class="px-2">Documento: {{idDoc}}</h5>
    <div id="deslocamento" class="col-sm-10">
      <li class="list-group-item active text-center"><a class="btn btn-primary" v-on:click="selectText('deslocamento')">Deslocamento <v-icon name="copy"/></a></li> 
     <li class="list-group-item" v-for="data in info" v-bind:key="data.id" >{{data.DESLOCAMENTO}}</li>
    </div>
    <div id="km" class="col-sm-2">
      <li class="list-group-item active"><a class="btn btn-primary" v-on:click="selectText('km')"> KM <v-icon name="copy"/></a></li>
     <li class="list-group-item" v-for="(desloc,index) in deslocamento"  v-bind:key="`desloc-${index}`">{{desloc}} </li>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueFlashMessage from 'vue-flash-message';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { setTimeout } from 'timers';
export default {
    name: 'Tabela',
    props:["info","idDoc","infoDesl"],
    components: {
            Loading
        },
    data(){
      return {
        dataDesloc :"",
        dataId : "",
        isDeslocamento: false,
        isbtnYelo: true,
        deslocamento:"",
        isLoading: false,
        fullPage: true,
        isReset: false,
      }
    },

    methods:{
      teste(){
       axios.get(`seu backend aqui/deslocamento`,{
         params:{
           idDoc:this.idDoc
         }
       }).then((res)=>{
         this.deslocamento = res.data.dataDeslocamento;
          
        this.$notify({
                    group: 'sucesso',
                    text: '<h6 class="text-center">Deslocamentos calculados com sucesso!</h6>',
                    type:"success"
                });
       })
       .catch((erro)=>{
          if(erro.response){
              this.$notify({
                    group: 'erro',
                    text: `<h6 class="text-center">Erro conexão com o servidor</h6>`,
                    type:"error"
                }); 
           }
       })
        this.isbtnYelo = false;
        this.isReset = true;
      },
      enviaDeslocamento(){
        const delay = 1000;
        const len = this.info.length
        this.isLoading = true;
        axios.post('seu backend aqui/deslocamento',{
            dataDesloc :this.info,
            dataId :this.idDoc
        }
        

         ).then(()=>{
           this.dataDesloc =this.dataDesloc;
           this.dataId =this.dataId
         }).catch((erro)=>{
           if(erro.response){
              this.$notify({
                    group: 'erro',
                    text: `<h6 class="text-center">Erro na conexão com o servidor</h6>`,
                    type:"error"
                });
           }
           
         })
          setTimeout(()=>{
               this.isLoading = false;
            },delay * len)
          this.isDeslocamento = true;
           this.$notify({
                    group: 'sucesso',
                    text: `<h6 class="text-center">Gerando dados...</h6>`,
                    type:"success"
                });
         
      },

      resetar(){
         window.location.reload()
      },
      selectText(containerid) {
    if (document.selection) { // IE
        let range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        let range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}
      
  
    }
}
</script>

<style>
.point:hover {
  cursor:pointer;
}

</style>
