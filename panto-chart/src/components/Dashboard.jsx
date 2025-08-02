import React, { useEffect, useState } from "react";
import { useChartData } from "../hooks/useChartData";
import { Layout } from "../ui/Layout";
import { LineChart } from "./LineChart";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const chartData = useChartData() ?? [];
  useEffect(() => {
    setData(chartData ?? null);
  }, [chartData]);

  return (
    <Layout>
      <div className="flex flex-wrap gap-4 justify-between">
        {data.map((chart, i) => (
          <LineChart key={i} title={chart.title} data={chart.data} />
        ))}
      </div>
    </Layout>
  );
};
