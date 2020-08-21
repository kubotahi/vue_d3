<template>
  <div class="container">

    <div class="col_2">
      <div class="graph_1">
        <svg class="svg_g1" width="100%" height="100%" viewBox="250 250 500 500"></svg>
      </div>
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

    let width = 1000;
    let height = 1000;

    function polygon(d) { 
      return "M" + d.join("L") + "Z"; 
    }

    var c10 = d3.schemePaired;
    //console.log(c10)

    //var vertices = d3.range(10).map(function(d) {
    var vertices = d3.range(50).map(function() {
      //console.log(d)
      return [Math.random() * width, Math.random() * height];
    });

    //console.log(vertices)

    var voronoi = d3.voronoi().extent([[0, 0], [width, height]]);
    //console.log(voronoi)

    let svg = d3.select('.svg_g1')

    // SVGのリセット
    svg.selectAll("*").remove()

    //let g = svg.append('g')
    let g = svg.append('g')
    //console.log(g)

    //var path = svg.append("g").selectAll("path");
    //console.log(path)

    var path = g.selectAll("path");

    path.data( voronoi.polygons(vertices)  )
      .enter()
      .append("path")
      .attr("stroke","white") 
      .attr("fill", function(d,i) {return c10[i % 10]} )
      .attr("d", polygon);

    //svg.selectAll("circle")
    g.selectAll("circle")
      .data(vertices)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) { return d[0]; } )
      .attr("cy", function(d) { return d[1]; } );


    // add zoom capabilities
    let zoomHandler = d3.zoom()
      .on('zoom', zoomActions)

    zoomHandler(svg)

    // Zoom functions
    function zoomActions () {
      g.attr('transform', d3.event.transform)
    }


  }

}

</script>
