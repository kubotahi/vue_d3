<template>
  <div class="container">

    <svg class="svg_g1" width="100%" height="100%"></svg>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {}
  },
  mounted () {

    let width = 500;
    let height = 500;

    let svg = d3.select('.svg_g1')
    //let g = svg.append('g')
    let g = svg.append('g')
    console.log(g)

    var data = {
      "name": "A",
      "children": [
        { "name": "B", "value": 25 },
        {
          "name": "C",
          "children": [
            { "name": "D", "value": 10 },
            { "name": "E", "value": 15 },
            { "name": "F", "value": 10 }
          ]
        },
        { "name": "G", "value": 15 },
        {
          "name": "H",
          "children": [
            { "name": "I", "value": 20 },
            { "name": "J", "value": 10 }
          ]
        },
        { "name": "K", "value": 10 }
      ]
    }


    // 2. 描画用のデータ変換
    let root = d3.hierarchy(data);
    root.sum(function(d) { return d.value; });
  
    var pack = d3.pack()
      .size([width, height])
      .padding(0);
  
    pack(root);
  
    // 3. svg要素の配置
    var node = d3.select("svg").selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y) + ")"; });
    
    var color = ["orange", "Khaki", "Ivory"];
    node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("stroke", "black")
      .attr("fill", function(d) { return color[d.depth]; });
  
    node.append("text")
      .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
      .attr("font-size", "150%")
      .text(function(d) { return d.children ? "" : d.data.name; });


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
