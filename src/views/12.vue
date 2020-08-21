<template>
  <div class="container">

    <div class="pos">
      <svg class="svg_g1" width="100%" height="400"></svg>
    </div>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {}
  },
  mounted () {
    // let marge = { top: 60, bottom: 60, left: 60, right: 60 }
    //let dataset = [250, 210, 170, 130, 90]
    let dataset = [20, 250, 210, 88, 170, 130, 90, 140, 47, 121]
    //let svg = d3.select('svg')
    let svg = d3.select('.svg_g1')

    // SVGのリセット
    svg.selectAll("*").remove()

    let g = svg.append('g')
    // .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')

    let rectWidth = 20
    //let rectHeight = 20

    // rect
    g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
        return 20 + i * rectWidth
      })
      .attr('y', 300)
      .attr('width', rectWidth - 2)
      .attr('height', 0)
      .attr('fill', '#42b983')

      .transition()
      .delay(100)
      .duration(1000)
      .attr('y', function (d) {
        return 300 - d
      })
      .attr('height', function (d) {
        return d
      })

    // text
    g.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      //.attr('x', 125)
      .attr('x', function (d, i) {
        return 28 + i * rectWidth
      })
      .attr('y', function (d) {
        return 300 - d - 10
      })
      .text(function (d) {
        return d
      })
      .attr('fill', '#ffffff')
      .attr('font-size', '14')
      .attr('text-anchor', 'middle')
      .attr('fill-opacity', 0)

      .transition()
      .delay(1000)
      .duration(500)
      .attr('fill-opacity', 1)

  }

}

</script>
<style>
.pos {
  margin: auto;
  width: 400px;
}
</style>
