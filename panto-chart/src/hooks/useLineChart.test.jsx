import { describe, test, expect } from "vitest";
import { useLineChart } from "./useLineChart";

describe("useLineChart", () => {
  const width = 600;
  const height = 400;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 10;
  const marginLeft = 10;

  const commonArgs = [width, height, marginTop, marginRight, marginBottom, marginLeft];

  test("returns null for null or empty data", () => {
    expect(useLineChart(null, ...commonArgs)).toBeNull();
    expect(useLineChart([], ...commonArgs)).toBeNull();
  });

  test("handles single-series data correctly", () => {
    const singleSeriesData = [
      [0, 10],
      [1, 20],
      [2, 30],
    ];

    const result = useLineChart(singleSeriesData, ...commonArgs);
    expect(result.series.length).toBe(1);
    expect(result.series[0]).toEqual(singleSeriesData);

    expect(result.x.domain()).toEqual([0, 2]);
    expect(result.y.domain()[0]).toBeLessThanOrEqual(10);
    expect(result.y.domain()[1]).toBeGreaterThanOrEqual(30);
  });

  test("handles multi-series data correctly", () => {
    const multiSeriesData = [
      [0, [10, 20]],
      [1, [15, 25]],
      [2, [20, 30]],
    ];

    const result = useLineChart(multiSeriesData, ...commonArgs);
    expect(result.series.length).toBe(2);
    expect(result.series[0]).toEqual([
      [0, 10],
      [1, 15],
      [2, 20],
    ]);
    expect(result.series[1]).toEqual([
      [0, 20],
      [1, 25],
      [2, 30],
    ]);
  });

  test("lineGenerator produces valid SVG path", () => {
    const data = [
      [0, 10],
      [1, 20],
      [2, 30],
    ];

    const result = useLineChart(data, ...commonArgs);
    const path = result.lineGenerator(data);

    expect(path.startsWith("M")).toBe(true);
    expect(path.includes("L")).toBe(true);
  });

  test("filters out null values in multi-series", () => {
    const data = [
      [0, [10, null]],
      [1, [20, 30]],
      [2, [null, 40]],
    ];

    const result = useLineChart(data, ...commonArgs);
    expect(result.series[0]).toEqual([[0, 10], [1, 20]]);
    expect(result.series[1]).toEqual([[1, 30], [2, 40]]);
  });

  test("handles negative y values", () => {
    const data = [
      [0, -30],
      [1, 0],
      [2, 30],
    ];

    const result = useLineChart(data, ...commonArgs);
    expect(result.y.domain()[0]).toBeLessThanOrEqual(-30);
    expect(result.y.domain()[1]).toBeGreaterThanOrEqual(30);
  });

});
