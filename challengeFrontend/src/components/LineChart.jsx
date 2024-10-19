import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import Data from '../data.json'
export const Linechart = () => {
  const ref = useRef()

  useEffect(() => {
    // Limpiar el contenido previo del SVG
    d3.select(ref.current).selectAll('*').remove()

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 10, bottom: 20, left: 40 }
    const width = 300 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    // Append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top * 1})`)

    // Create a tooltip div element (initially hidden)
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('padding', '8px')
      .style('border', '1px solid #d3d3d3')
      .style('border-radius', '4px')
      .style('visibility', 'hidden')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('opacity', 0)

    // Parse the Data (Use your provided data.json)
    const data = Data
    // Process the data into usable format (group by date)
    const rewardsByDay = data.ethereum.blocks.reduce((acc, block) => {
      const date = new Date(block.date.date).toISOString() // Formato YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date] += block.reward
      return acc
    }, {})
    let rewardCount = 0
    // Convert the object to an array for D3
    const processedData = Object.entries(rewardsByDay).map(([date, reward]) => {
      rewardCount += reward
      return {
        date: new Date(date),
        reward: rewardCount
      }
    })

    // X axis (dates)
    const x = d3
      .scaleTime()
      .domain(d3.extent(processedData, (d) => d.date))
      .range([0, width])
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x))

    // Y axis (reward values)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.reward)])
      .range([height, 0])
    svg.append('g').call(d3.axisLeft(y))

    // Line generator
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.reward))

    // Add the line to the chart
    svg
      .append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', '#5f0f40')
      .attr('stroke-width', 1)
      .attr('d', line)

    // Add the dots for each point
    svg
      .selectAll('dot')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.reward))
      .attr('r', 2)
      .attr('fill', '#5f0f40')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#d62828')
          .attr('r', 4)

        tooltip
          .style('visibility', 'visible')
          .transition()
          .duration(200)
          .style('opacity', 1)
          .text(`Date: ${d.date.toISOString().split('T')[0]} - Reward: ${d.reward.toFixed(2)}`)
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#5f0f40')
          .attr('r', 2)

        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0)
          .on('end', () => tooltip.style('visibility', 'hidden'))
      })
  }, [])

  return <Box sx={{ width: '350' }} ref={ref}></Box>
}
