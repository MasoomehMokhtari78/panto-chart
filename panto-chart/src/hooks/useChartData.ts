import React, { useEffect, useState } from "react";

export const useChartData = () => {
  const [charts, setCharts] = useState([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setCharts)
      .catch(console.error);
  }, []);
  return charts;
};
