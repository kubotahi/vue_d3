<template>
  <div id="app">
    <div class="title">Vue.js + D3.js Examples</div>
    <div id="nav">
      <router-link to="/">Info</router-link> | 
      <router-link to="/01">01 Hello</router-link> | 
      <router-link to="/02">02 Tree Map</router-link> | 
      <router-link to="/03">03 Force Directed 1</router-link> | 
      <router-link to="/04">04 Force Directed 2</router-link> | 
      <router-link to="/05">05 Bar Chart 1</router-link> | 
      <router-link to="/06">06 Bar Chart 2</router-link> | 
      <router-link to="/07">07 Bar Chart 3</router-link> | 
      <router-link to="/08">08 Range</router-link> | 
      <router-link to="/09">09 Line</router-link> | 
      <router-link to="/10">10 Bar Chart 4</router-link> | 
      <router-link to="/11">11 Bar Chart 5</router-link> | 
      <router-link to="/12">12 Bar Chart 6</router-link> | 
      <router-link to="/13">13 Voronoi 1</router-link> | 
      <router-link to="/14">14 Voronoi 2</router-link> | 
      <router-link to="/15">15 Voronoi 3</router-link> | 
      <router-link to="/16">16 Voronoi 4</router-link> | 
      <router-link to="/17">17 Voronoi 5</router-link> | 
      <router-link to="/18">18 Voronoi 6</router-link> | 
      <router-link to="/19">19 Voronoi 7</router-link> | 
      <router-link to="/20">20 Circle Packing 1</router-link> | 
      <router-link to="/21">21 Circle Packing 2</router-link> | 
      <router-link to="/22">22 Circle Packing 3</router-link> | 
      <router-link to="/23">23 Circle Packing 4</router-link>
    </div>

    Source:
    <a href="https://github.com/kubotahi/vue_d3" target="_blank">https://github.com/kubotahi/vue_d3</a><br>

    <hr>

    <router-view/>


  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
    background-color: #333;
    color: #fff;
    text-decoration: none;
    padding: 2px 40px;
    border-radius: 4px;
    font-size: 32px;
    font-weight: bold;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav a.router-link-exact-active {
    color: #ffffff;
    background-color: #a8118d;
    border-radius: 4px;
    padding: 0px 4px;
    text-decoration: none;
}

.container {
    font-size: 16px;
    padding: 10px;
    height: 86vh;
}

.memo {
  text-align: left;
}

</style>
