import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  // scales: {
    // y: {
    //   position: "right",
    //   ticks: {
    //     callback: function(value, index, ticks) {
    //       return `${value}%`;
    //     }
    //   }
    // },
  //   x: {
  //     type: 'time',
  //     time: {
  //       quarter: 'YYYY'
  //     }
  //   }
  // },
  plugins: {
    title: {
      display: true,
      text: 'График изменения ключевой ставки с 2013 по 2023 год'
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(data) {
          return `Ключевая ставка: ${data.parsed.y}%`
        }
      }
    }
  }
}

const labels = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];

const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [
        {x: "03.02.2013", y: 5.5},
        {x: "03.03.2014", y: 7},
        {x: "28.04.2014", y: 8},
        {x: "28.07.2014", y: 7.5},
        {x: "05.11.2014", y: 9.5},
        {x: "12.12.2014", y: 10.5},
        {x: "16.12.2014", y: 17},
        {x: "02.02.2015", y: 15},
        {x: "16.03.2015", y: 14},
        {x: "05.05.2015", y: 12.5},
        {x: "16.06.2015", y: 11.5},
        {x: "03.08.2015", y: 11},
        {x: "14.06.2016", y: 10.5},
        {x: "19.09.2016", y: 10},
        {x: "27.03.2017", y: 9.75},
        {x: "02.05.2017", y: 9.25},
        {x: "19.06.2017", y: 9},
        {x: "18.09.2017", y: 8.5},
        {x: "30.10.2017", y: 8.25},
        {x: "18.12.2017", y: 7.75},
        {x: "12.02.2018", y: 7.5},
        {x: "02.05.2018", y: 9.25},
        {x: "26.03.2018", y: 7.25},
        {x: "17.09.2018", y: 7.5},
        {x: "17.12.2018", y: 7.75},
        {x: "17.06.2019", y: 7.5},
        {x: "29.07.2019", y: 7.25},
        {x: "09.09.2019", y: 7},
      ]
    }
  ],
  borderColor: 'rgb(255, 99, 132)',
}

export const KeyRateChart = () => {
  return <Line options={options} data={data} />
}