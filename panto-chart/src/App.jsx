import { useEffect, useState } from "react";
import { useChartData } from "./hooks/useChartData";
import { LineChart } from "./components/LineChart";

const menuItems = ["Home", "Products", "About Us", "Contact Us"];
export default function App() {
  const [data, setData] = useState([]);
  const chartData = useChartData() ?? [];
  useEffect(() => {
    setData(chartData ?? null);
  }, [chartData]);

  return (
    <div>
      <header
        style={{
          padding: "1rem 2rem",
          backgroundColor: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="flex gap-2 items-start">
          <img src="/img/chart-bar.svg" className="w-[30px]" />
          <p> PANTO Chart</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          {menuItems.map((item) => (
            <p className="text-sm">{item}</p>
          ))}
        </div>
      </header>
      <div className="flex flex-col gap-6 p-4">
        <p className="text-4xl font-bold">Statics</p>
        <div className="flex flex-wrap gap-4 justify-between">
          {data.map((chart, i) => (
            <LineChart key={i} title={chart.title} data={chart.data} />
          ))}
        </div>
      </div>
    </div>
  );
}
