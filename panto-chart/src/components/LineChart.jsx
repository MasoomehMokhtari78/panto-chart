import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

export const LineChart = ({
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
        if (!data) return;
    
        const filteredData = data.filter(
          (d) =>
            Array.isArray(d) &&
            typeof d[0] === "number" &&
            !isNaN(d[0]) &&
            typeof d[1] === "number" &&
            !isNaN(d[1])
        );
    
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
    
        const x = d3.scaleLinear(
          d3.extent(filteredData, (d) => d[0]),
          [marginLeft, width - marginRight] 
        );
    
        const yMin = d3.min(filteredData, (d) => d[1]);
        const yMax = d3.max(filteredData, (d) => d[1]);
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
          .call(
            d3
              .axisBottom(x)
              .ticks(width / 80)
              .tickSizeOuter(0)
          );
    
        svg
          .append("g")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(d3.axisLeft(y).ticks(height / 40))
          .call((g) => g.select(".domain").remove())
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
              .text("↑ Value")
          );
    
        svg
          .append("path")
          .datum(filteredData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line);
      }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);
    
      if (!data) return <p>Loading...</p>;
    
      return <svg ref={svgRef} width={width} height={height} />;
}
