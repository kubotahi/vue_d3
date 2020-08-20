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

    let width = 600;
    let height = 600;

    var c10 = d3.schemePaired;
    console.log(c10)

    var vertices = d3.range(10).map(function(d) {
      console.log(d)
      return [Math.random() * width, Math.random() * height];
    });

    console.log(vertices)


    var voronoi = d3.voronoi().extent([[0, 0], [width, height]]);
    console.log(voronoi)

    let svg = d3.select('.svg_g1')

    // SVGのリセット
    svg.selectAll("*").remove()

    var path = svg.append("g").selectAll("path");
    console.log(path)

    path.data( voronoi.polygons(vertices)  ).enter().append("path")
        .attr("stroke","white") 
        .attr("fill", function(d,i) {return c10[i % 10]} )
      .attr("d", polygon);

    function polygon(d) { 
      return "M" + d.join("L") + "Z"; 
    }

    svg.selectAll("circle").data(vertices).enter().append("circle").attr("r", 3)
      .attr("cx", function(d) { return d[0]; } )
      .attr("cy", function(d) { return d[1]; } );

    /*

    path.data( voronoi.polygons(vertices)  ).enter().append("path")
        .attr("stroke","white") 
        .attr("fill", function(d,i) {return c10[i % 10]} )
      .attr("d", polygon);

    function polygon(d) { 
      return "M" + d.join("L") + "Z"; 
    }
      
    svg.selectAll("circle").data(vertices).enter().append("circle").attr("r", 3)
      .attr("cx", function(d) { return d[0]; } )
      .attr("cy", function(d) { return d[1]; } );
    */

    /*
    // let marge = { top: 60, bottom: 60, left: 60, right: 60 }
    //let dataset = [250, 210, 170, 130, 90]
    let dataset = [20, 250, 210, 88, 170, 130, 90, 140, 47, 121]
    //let svg = d3.select('svg')
    let svg = d3.select('.svg_g1')
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

    */

  }

}

</script>
