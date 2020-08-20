<template>
  <div class="container">

    <div class="col_2">
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

    let rectHeight = 20

    // rect
    g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 20)
      .attr('y', function (d, i) {
        return 20 + i * rectHeight
      })
      .attr('width', function (d) {
        return d
      })
      //.attr('height', rectHeight - 5)
      //.attr('height', rectHeight)
      .attr('height', rectHeight - 2)
      .attr('fill', '#42b983')

    // text
    g.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      //.attr('x', 125)
      .attr('x', function (d) {
        return d + 30
      })
      .attr('y', function (d, i) {
        return 20 + i * rectHeight + 14
      })
      .text(function (d) {
        return d
      })
      .attr('fill', '#ffffff')
      .attr('font-size', '14')
      //.attr('text-anchor', 'end')

  }

}

</script>
