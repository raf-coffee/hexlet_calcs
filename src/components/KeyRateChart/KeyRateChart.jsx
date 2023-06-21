import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Decimation,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Decimation);

export function KeyRateChart() {
  const [theme] = useContext(ThemeContext);
  const colors = {
    green: "#75ab65",
    dark: "#adb5bd",
  };

  const options = {
    scales: {
      y: {
        position: "right",
        ticks: {
          callback(value) {
            return `${value}%`;
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "График изменения ключевой ставки с 2013 по 2023 год",
        color: colors[theme],
        font: {
          size: 14,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(data) {
            return `Ключевая ставка: ${data.parsed.y}%`;
          },
        },
        intersect: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const dataArray = {
    datasets: [
      {
        label: "",
        data: [
          { x: "03.02.2013", y: 5.5 },
          { x: "03.03.2014", y: 7 },
          { x: "28.04.2014", y: 8 },
          { x: "28.07.2014", y: 7.5 },
          { x: "05.11.2014", y: 9.5 },
          { x: "12.12.2014", y: 10.5 },
          { x: "16.12.2014", y: 17 },
          { x: "02.02.2015", y: 15 },
          { x: "16.03.2015", y: 14 },
          { x: "05.05.2015", y: 12.5 },
          { x: "16.06.2015", y: 11.5 },
          { x: "03.08.2015", y: 11 },
          { x: "14.06.2016", y: 10.5 },
          { x: "19.09.2016", y: 10 },
          { x: "27.03.2017", y: 9.75 },
          { x: "02.05.2017", y: 9.25 },
          { x: "19.06.2017", y: 9 },
          { x: "18.09.2017", y: 8.5 },
          { x: "30.10.2017", y: 8.25 },
          { x: "18.12.2017", y: 7.75 },
          { x: "12.02.2018", y: 7.5 },
          { x: "02.05.2018", y: 9.25 },
          { x: "26.03.2018", y: 7.25 },
          { x: "17.09.2018", y: 7.5 },
          { x: "17.12.2018", y: 7.75 },
          { x: "17.06.2019", y: 7.5 },
          { x: "29.07.2019", y: 7.25 },
          { x: "09.09.2019", y: 7 },
        ],
        backgroundColor: colors[theme],
        borderColor: colors[theme],
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={dataArray} />
    </div>
  );
}
