<template>
  <div id="app">
    <router-link to="/"><div class="title">Vue.js + D3.js の デモ</div></router-link>
    <div id="nav">
      <router-link to="/01">01</router-link> | 
      <router-link to="/02">02</router-link> | 
      <router-link to="/03">03</router-link> | 
      <router-link to="/04">04</router-link> | 
      <router-link to="/05">05</router-link> | 
      <router-link to="/06">06</router-link> | 
      <router-link to="/07">07</router-link> | 
      <router-link to="/08">08</router-link> | 
      <router-link to="/09">09</router-link> | 
      <router-link to="/10">10</router-link> | 
      <router-link to="/11">11</router-link> | 
      <router-link to="/12">12</router-link> | 
      <router-link to="/13">13</router-link> | 
      <router-link to="/14">14</router-link> | 
      <router-link to="/15">15</router-link> | 
      <router-link to="/16">16</router-link> | 
      <router-link to="/17">17</router-link> | 
      <router-link to="/18">18</router-link> | 
      <router-link to="/19">19</router-link> | 
      <router-link to="/20">20</router-link> | 
      <router-link to="/21">21</router-link> | 
      <router-link to="/22">22</router-link> | 
      <router-link to="/23">23</router-link>
    </div>
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
  background-color: #333333;
  color: #ffffff;
  text-decoration: none;
  padding: 2px 40px;
  border-radius: 4px;  
}

#nav {
  padding: 30px;

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
    padding: 4px;
    text-decoration: none;
}

</style>
