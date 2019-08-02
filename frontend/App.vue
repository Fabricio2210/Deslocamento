<template>
  <div id="app">
    <div> 
    <b-navbar class="barraTitulo" toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" class="titulo animated slideInLeft">Deslocamento <v-icon name="map-marked-alt" scale="2" class="animated fadeIn delay-1s"/></b-navbar-brand>
     
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <router-link class="link" to="/" tag="b-nav-item">Home</router-link>
         <router-link class="link" to="/faq" tag="b-nav-item">Faq</router-link>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
</div>
 <b-navbar toggleable="lg" type="dark" variant="dark" fixed="bottom">
    <b-navbar-brand class="titulo animated fadeIn delay-2s" ><v-icon name="laptop-code" scale="2"/> fabricio215@hotmail.com</b-navbar-brand>
 </b-navbar>
    <br>
  <keep-alive include="home">
    <router-view/>
  </keep-alive> 
  </div>
</template>

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

</style>
