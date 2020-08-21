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

    let width = 600;
    let height = 600;

    var c10 = d3.schemePaired;
    //console.log(c10)

    var vertices = d3.range(10).map(function() {
      //console.log(d)
      return [Math.random() * width, Math.random() * height];
    });

    //console.log(vertices)

    var voronoi = d3.voronoi().extent([[0, 0], [width, height]]);
    //console.log(voronoi)

    let svg = d3.select('.svg_g1')

    // SVGのリセット
    svg.selectAll("*").remove()

    var path = svg.append("g").selectAll("path");
    //console.log(path)

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

  }

}

</script>
<style>
.pos {
  margin: auto;
  width: 400px;
}
</style>
