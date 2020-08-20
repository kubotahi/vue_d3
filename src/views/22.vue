<template>
  <div class="container">

    <svg class="svg_g1" width="100%" height="100%"></svg>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
    }
  },
  mounted () {
    this.draw_Graph()
  },
  methods: {
    draw_Graph() {
      let width = 400;
      let height = 400;

      let svg = d3.select('.svg_g1')
      //let g = svg.append('g')

      //ズーム対象とするレイヤーを生成	
      var zg  = svg.append("g")

      // create dummy data -> just one element per circle
      var data = [
        { "name": "A" },
        { "name": "B" },
        { "name": "C" },
        { "name": "D" },
        { "name": "E" },
        { "name": "F" },
        { "name": "G" },
        { "name": "H" },
        { "name": "A1" },
        { "name": "A2" },
        { "name": "A3" },
        ]

      // Initialize the circle: all located at the center of the svg area
      //var node = svg.append("g")
      var node = zg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("r", 25)
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", "#69b3a2")
          .style("fill-opacity", 0.3)
          .attr("stroke", "#69a2b2")
          .style("stroke-width", 4)

      // Features of the forces applied to the nodes:
      var simulation = d3.forceSimulation()
          .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
          .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
          .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
          .nodes(data)
          .on("tick", function(d){
            console.log(d)
            node
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
          })


      //ズーム時の処理を設定
      let zoomed = function() {
        zg.attr("transform", d3.event.transform);
      }
      svg.call(d3.zoom()
        .scaleExtent([1 / 2, 12])
        .on("zoom", zoomed));	

    }
  }
}

</script>
<style>
</style>
