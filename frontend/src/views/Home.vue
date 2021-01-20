<template>
  <div class="container">
    <Input v-on:dados-bd="dadosTabela" />
    <Tabela v-bind:info="info" v-bind:idDoc="idDoc" />
  </div>
</template>

<script>
import Tabela from "../components/Tabela";
import Input from "../components/Input";
export default {
  name: "home",
  components: { Tabela, Input },
  data() {
    return {
      info: "",
      idDoc: "",
    };
  },

  methods: {
    dadosTabela(eventDados) {
      this.info = eventDados.data.data;
      this.idDoc = eventDados.data.idDoc;
    },
  },
};
</script>

