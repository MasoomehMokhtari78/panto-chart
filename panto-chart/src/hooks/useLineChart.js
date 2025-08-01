import * as d3 from "d3";

export function useLineChart(
  data,
  width,
  height,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft
) {
  if (!data || !Array.isArray(data)) return null;

  const isMultiSeries = Array.isArray(data[0][1]);

  const series = isMultiSeries
    ? data[0][1].map((_, seriesIdx) =>
        data
          .filter(
            (d) => Array.isArray(d[1]) && typeof d[1][seriesIdx] === "number"
          )
          .map((d) => [d[0], d[1][seriesIdx]])
      )
    : [data.filter((d) => typeof d[1] === "number")];

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

  const lineGenerator = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

  return { series, x, y, lineGenerator };
}
