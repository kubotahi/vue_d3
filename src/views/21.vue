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

    let width = 400;
    let height = 400;

    let svg = d3.select('.svg_g1')

    //ズーム対象とするレイヤーを生成	
    var zg  = svg.append("g")

    var data = {
      "name": "A",
      "children": [
        { "name": "B", "value": 25 },
        {
          "name": "C",
          "children": [
            { "name": "D", "value": 10 },
            { "name": "E", "value": 15 },
            { "name": "F", "value": 10 },
            { "name": "F", "value": 4 },
          ]
        },
        { "name": "G", "value": 15 },
        { "name": "g", "value": 12 },
        {
          "name": "H",
          "children": [
            { "name": "I", "value": 20 },
            { "name": "J", "value": 9 },
            { "name": "J", "value": 4 },
            { "name": "J", "value": 5 },
          ]
        },
        { "name": "K", "value": 10 }
      ]
    }


    // 2. 描画用のデータ変換
    let view = d3.hierarchy(data)
    view.sum(function(d) { return d.value; })
  
    var pack = d3.pack()
      .size([width, height])
      .padding(0)
  
    pack(view)
  
    // 3. svg要素の配置
    //var node = d3.select("svg")
    var node = zg
      .selectAll(".node")
      .data(view.descendants())
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y) + ")"; })
    
    var color = ["orange", "Khaki", "Ivory"]

    node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("stroke", "black")
      .attr("fill", function(d) { return color[d.depth]; })
  
    node.append("text")
      .style("text-anchor", function(d) { return d.children ? "end" : "middle" })
      .attr("font-size", "150%")
      .text(function(d) { return d.children ? "" : d.data.name; })


    //ズーム時の処理を設定
    let zoomed = function() {
      zg.attr("transform", d3.event.transform);
    }
    svg.call(d3.zoom()
      .scaleExtent([1 / 2, 12])
      .on("zoom", zoomed));	

  }

}

</script>
