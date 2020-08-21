<template>
  <div class="container">

    <p></p>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  mounted () {
    let p = d3.select('body').selectAll('p')
    p.text('Hello Vue.js + D3.js')
  }
}

</script>
<style>
</style>
