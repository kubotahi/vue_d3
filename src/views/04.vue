<template>
  <div class="container">

    <svg width="100%" height="100%"></svg>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {}
  },
  mounted () {
    let marge = { top: 60, bottom: 60, left: 60, right: 60 }
    let svg = d3.select('svg')

    // SVGのリセット
    svg.selectAll("*").remove()

    //let width = svg.attr('width')
    //let height = svg.attr('height')
    let width = 1000
    let height = 600

    let g = svg.append('g')
      .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')

    // 准备数据
    // 节点集
    let nodes = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
      { name: 'I' }
    ]
    // 边集
    let edges = [
      { source: 0, target: 4, relation: '友達', value: 1.3 },
      { source: 4, target: 5, relation: '姉妹', value: 1 },
      { source: 4, target: 6, relation: '片思い', value: 1 },
      { source: 4, target: 7, relation: '友達', value: 1 },
      { source: 1, target: 6, relation: '恋人', value: 2 },
      { source: 2, target: 5, relation: '友達', value: 0.9 },
      { source: 3, target: 7, relation: '腐れ縁', value: 1 },
      { source: 5, target: 6, relation: '友達', value: 1.6 },
      { source: 6, target: 7, relation: '兄弟', value: 0.7 },
      { source: 6, target: 8, relation: '友達', value: 2 }
    ]
    // 设置一个颜色比例尺
    let colorScale = d3.scaleOrdinal()
      .domain(d3.range(nodes.length))
      .range(d3.schemeCategory10)
    // 新建一个力导向图
    let forceSimulation = d3.forceSimulation()
      .force('link', d3.forceLink())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
    // 生成节点数据
    forceSimulation.nodes(nodes)
      .on('tick', ticked)
    // 生成边数据
    forceSimulation.force('link')
      .links(edges)
      .distance(function (d) { // 每一边的长度
        return d.value * 100
      })
    // 设置图形中心位置
    forceSimulation.force('center')
      .x(width / 2)
      .y(height / 2)
    // // 顶点集，边集
    // console.log(nodes)
    // console.log(edges)
    // 绘制边
    let links = g.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', function (d, i) {
        return colorScale(i)
      })
      .attr('stroke-width', 1)
    // 边上的文字
    let linksText = g.append('g')
      .selectAll('text')
      .data(edges)
      .enter()
      .append('text')
      .text(function (d) {
        return d.relation
      })
    // 创建分组
    let gs = g.selectAll('.circleText')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        let cirX = d.x
        let cirY = d.y
        return 'translate(' + cirX + ',' + cirY + ')'
      })
      .call(d3.drag()
        .on('start', started)
        .on('drag', dragged)
        .on('end', ended)
      )
    // 绘制节点
    gs.append('circle')
      .attr('r', 10)
      .attr('fill', function (d, i) {
        return colorScale(i)
      })
    // 文字
    gs.append('text')
      .attr('x', -10)
      .attr('y', -20)
      .attr('dy', 10)
      .text(function (d) {
        return d.name
      })
    // ticked
    function ticked () {
      links
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
      linksText
        .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
        .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
      gs
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
    }
    // drag
    function started (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0.8).restart()
      }
      d.fx = d.x
      d.fy = d.y
    }
    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }
    function ended (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    }
  }
}
</script>
<style>
text {
  fill: #000000;
}
</style>
