import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useLineChart } from "../hooks/useLineChart";

const colors = ['blue', 'green', 'red'];

export const LineChart = ({
  title,
  data,
  width = 600,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) => {
  const svgRef = useRef();

  const chart = useLineChart(data, width, height, marginTop, marginRight, marginBottom, marginLeft);

  useEffect(() => {
    if (!chart) return;

    const { series, x, y, lineGenerator } = chart;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Value"));

    series.forEach((lineData, i) => {
      svg.append("path")
        .datum(lineData)
        .attr("class", "data-line")
        .attr("fill", "none")
        .attr("stroke", colors[i % colors.length])
        .attr("stroke-width", 1.5)
        .attr("d", lineGenerator);
    });

  }, [chart, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  if (!data) return <p>Loading...</p>;

  return <div><p>{title}</p><svg ref={svgRef} width={width} height={height} /></div>
};
