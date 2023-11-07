import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJs,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DisplayData = () => {
  const [pricesChart, setPricesChart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/allprices");
      console.log(data);
      setPricesChart({
        labels: data.map((item) => item.startDate.substring(0,16)),
        datasets: [
          {
            label: "Prices, c",
            data: data.map((item) => item.price),
            fill: true,
            borderColor: "Black",
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {pricesChart && pricesChart.datasets && (
        <Line
          data={pricesChart}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Sähköhinnat" },
            },
          }}
        />
      )}
    </div>
  );
};

export default DisplayData;
