<template>
  <div class="container">

    <div class="col_2">
      <div class="graph_1">
        <svg class="svg_g1" width="100%" height="100%" viewBox="0 0 1000 1000"></svg>
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

    let svg = d3.select('.svg_g1')

    // SVGのリセット
    svg.selectAll("*").remove()

    //ズーム対象とするレイヤーを生成	
    var zg  = svg.append("g")

    var data = {
      "name": "c1",
      "children": [
        { "name": "B", "value": 25 },
        {
          "children": [
            { "name": "Bbbb", "value": 5 },
          ]
        },
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
        { "name": "g", "value": 12 },
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
    
    var color = [
      "#050d2d",
      "#314e63",
      "#769fa3",
      ]

    node.append("circle")
      .attr("r", function(d) { return d.r; })
      //.attr("stroke", "black")
      .attr("fill", function(d) { return color[d.depth]; })
  
    node.append("text")
      //.style("text-anchor", function(d) { return d.children ? "end" : "middle" })
      .style("text-anchor", "middle")
      //.attr("font-size", "150%")
      .attr("font-size", "120")
      .attr("fill", "#ffffff")
      .text(function(d) { return d.children ? "" : d.data.name; })


    //ズーム時の処理を設定
    let zoomed = function() {
      zg.attr("transform", d3.event.transform);
    }
    svg.call(d3.zoom()
      .scaleExtent([1/10, 12])
      .on("zoom", zoomed));	

  }

}

</script>
