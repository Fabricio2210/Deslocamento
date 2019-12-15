<template>
  <div id="app" class="container">
    <Navbar />
   <keep-alive include="home">
    <router-view/>
  </keep-alive> 
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components:{
    Navbar
  }
}
</script>
<style>
#app {
 
  
  text-align: center;
  
  margin-top: 60px;
   padding-bottom: 60px;
}
.titulo{
  font-family: 'Righteous', cursive;
  font-size: 150% !important;
  padding-left: 2% !important;
  padding-right: 2% !important;
}
.link{
  font-family: 'Righteous', cursive;
  font-size: 120% !important;
  padding-left: 5% !important;
  padding-right: 5% !important;
}

.barraTitulo{
  background-image: linear-gradient(to top bottom,#778899,#708090) !important;
}

</style>
