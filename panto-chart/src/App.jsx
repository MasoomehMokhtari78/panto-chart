
import { useEffect, useState } from "react";
import { useChartData } from "./hooks/useChartData";
import { LineChart } from "./components/LineChart";

export default function App() {
  const [data, setData] = useState(null);
  const chartData = useChartData();
  useEffect(() => {
    setData(chartData[0]?.data ?? null);
  }, [chartData]);

  return <LineChart data={data}/>
}
