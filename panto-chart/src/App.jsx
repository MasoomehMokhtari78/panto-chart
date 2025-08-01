
import { useEffect, useState } from "react";
import { useChartData } from "./hooks/useChartData";
import { LineChart } from "./components/LineChart";

export default function App() {
  const [data, setData] = useState([]);
  const chartData = useChartData() ?? []
  useEffect(() => {
    setData(chartData ?? null);
  }, [chartData]);

  return <>{data.map((chart, i) => (
    <LineChart key={i} title={chart.title} data={chart.data} />
  ))}</>
}
