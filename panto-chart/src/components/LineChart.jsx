import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const colors = ['blue', 'green', 'red']

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

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const isMultiSeries = Array.isArray(data[0][1]);

    const series = isMultiSeries
      ? data[0][1].map((_, seriesIdx) =>
          data
            .filter((d) => Array.isArray(d[1]) && typeof d[1][seriesIdx] === "number")
            .map((d) => [d[0], d[1][seriesIdx]])
        )
      : [data.filter((d) => typeof d[1] === "number")];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const allPoints = series.flat();

    const x = d3
      .scaleLinear()
      .domain(d3.extent(allPoints, (d) => d[0]))
      .range([marginLeft, width - marginRight]);

    const yMin = d3.min(allPoints, (d) => d[1]);
    const yMax = d3.max(allPoints, (d) => d[1]);
    const yPadding = (yMax - yMin) * 0.05;

    const y = d3
      .scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Value")
      );

    series.forEach((lineData, i) => {
      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 1.5)
        .attr("d", line);
    });
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  if (!data) return <p>Loading...</p>;

  return <div>
    <p>{title}</p>
    <svg ref={svgRef} width={width} height={height} />
  </div>
};
