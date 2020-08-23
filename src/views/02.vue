<template>
  <div class="container">

    <svg id="vizTreeII" width="100%" height="100%"/>

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {}
  },
  mounted () {

    let treeData = {
      'name': 'flare',
      'children': [
        {
          'name': 'animate',
          'children': [
            { 'name': 'Easing', 'value': 17010 },
            { 'name': 'FunctionSequence', 'value': 5842 },
            {
              'name': 'interpolate',
              'children': [
                { 'name': 'ArrayInterpolator', 'value': 1983 },
                { 'name': 'ColorInterpolator', 'value': 2047 },
                { 'name': 'DateInterpolator', 'value': 1375 },
                { 'name': 'Interpolator', 'value': 8746 },
                { 'name': 'MatrixInterpolator', 'value': 2202 },
                { 'name': 'NumberInterpolator', 'value': 1382 },
                { 'name': 'ObjectInterpolator', 'value': 1629 },
                { 'name': 'PointInterpolator', 'value': 1675 },
                { 'name': 'RectangleInterpolator', 'value': 2042 }
              ]
            },
            { 'name': 'ISchedulable', 'value': 1041 },
            { 'name': 'Parallel', 'value': 5176 },
            { 'name': 'Pause', 'value': 449 },
            { 'name': 'Scheduler', 'value': 5593 },
            { 'name': 'Sequence', 'value': 5534 },
            { 'name': 'Transition', 'value': 9201 },
            { 'name': 'Transitioner', 'value': 19975 },
            { 'name': 'TransitionEvent', 'value': 1116 },
            { 'name': 'Tween', 'value': 6006 }
          ]
        },
        {
          'name': 'display',
          'children': [
            { 'name': 'DirtySprite', 'value': 8833 },
            { 'name': 'LineSprite', 'value': 1732 },
            { 'name': 'RectSprite', 'value': 3623 },
            { 'name': 'TextSprite', 'value': 10066 }
          ]
        },
        {
          'name': 'flex',
          'children': [
            { 'name': 'FlareVis', 'value': 4116 }
          ]
        },
        {
          'name': 'physics',
          'children': [
            { 'name': 'DragForce', 'value': 1082 },
            { 'name': 'GravityForce', 'value': 1336 },
            { 'name': 'IForce', 'value': 319 },
            { 'name': 'NBodyForce', 'value': 10498 },
            { 'name': 'Particle', 'value': 2822 },
            { 'name': 'Simulation', 'value': 9983 },
            { 'name': 'Spring', 'value': 2213 },
            { 'name': 'SpringForce', 'value': 1681 }
          ]
        },
        {
          'name': 'scale',
          'children': [
            { 'name': 'IScaleMap', 'value': 2105 },
            { 'name': 'LinearScale', 'value': 1316 },
            { 'name': 'LogScale', 'value': 3151 },
            { 'name': 'OrdinalScale', 'value': 3770 },
            { 'name': 'QuantileScale', 'value': 2435 },
            { 'name': 'QuantitativeScale', 'value': 4839 },
            { 'name': 'RootScale', 'value': 1756 },
            { 'name': 'Scale', 'value': 4268 },
            { 'name': 'ScaleType', 'value': 1821 },
            { 'name': 'TimeScale', 'value': 5833 }
          ]
        }
      ]
    }

    let margin = { top: 120, right: 90, bottom: 30, left: 90 }
    //let width = 960 - margin.left - margin.right
    //let height = 600 - margin.top - margin.bottom
    let width = window.innerWidth
    let height = window.innerHeight - 300

    let svg = d3.select('#vizTreeII')

    // SVGのリセット
    svg.selectAll("*").remove()

    svg = d3.select('#vizTreeII').attr('viewBox', [-10, -10, width, height])
      .append('g')
      .attr('transform', 'translate(' +
        margin.left + ',' + margin.top + ')')

    let i = 0
    let duration = 750
    let root

    // declares a tree layout and assigns the size
    let treemap = d3.tree().size([height, width]).nodeSize([30, 60])
    // let treemap = d3.tree().nodeSize([width, height])

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function (d) { return d.children })
    root.x0 = height / 2
    root.y0 = 100

    // Collapse after the second level
    root.children.forEach(collapse)

    update(root)

    // Collapse the node and all it's children
    function collapse (d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update (source) {
      // Assigns the x and y position for the nodes
      let treeData = treemap(root)

      // Compute the new tree layout.
      let nodes = treeData.descendants()
      let links = treeData.descendants().slice(1)

      // Normalize for fixed-depth.
      nodes.forEach(function (d) { d.y = d.depth * 180 })

      // ****************** Nodes section ***************************

      // Update the nodes...
      let node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i) })

      // Enter any new modes at the parent's previous position.
      let nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function () {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })
        .on('click', click)

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          return d._children ? '#2aa151' : '#fff'
        })

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name })

      // UPDATE
      let nodeUpdate = nodeEnter.merge(node)

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? '#2aa151' : '#fff'
        })
        .style('stroke-width', function () {
          return '2px'
        })
        .attr('cursor', 'pointer')

      // Remove any exiting nodes
      let nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function () {
          return 'translate(' + source.y + ',' + source.x + ')'
        })
        .remove()

      // On exit #f7d708uce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6)

      // On exit #f7d708uce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6)

      // ****************** links section ***************************

      // Update the links...
      let link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id })

      // Enter any new links at the parent's previous position.
      let linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function () {
          let o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        })

      // UPDATE
      let linkUpdate = linkEnter.merge(link)

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent) })

      // Remove any exiting links
      link.exit().transition()
        .duration(duration)
        .attr('d', function () {
          let o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x
        d.y0 = d.y
      })

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal (s, d) {
        let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

        return path
      }

      // Toggle children on click.
      function click (d) {
        if (d.children) {
          d._children = d.children
          d.children = null
        } else {
          d.children = d._children
          d._children = null
        }
        update(d)
      }
    }
  }
}
</script>
<style>
#vizTreeII circle {
  fill: rgb(218, 20, 135);
  stroke: #54a8ff;
  stroke-width: 3px;
}
#vizTreeII .node text {
  font: 12px sans-serif;
  fill: #000000;
}
#vizTreeII .link {
  fill: none;
  stroke: rgb(5, 189, 158);
  stroke-width: 2px;
}
</style>
