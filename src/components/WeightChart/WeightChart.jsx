import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  response: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(data) {
          return `${data.parsed.y}%`
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: function(value, index, ticks) {
          return `${value}%`;
        }
      }
    }
  }
}

const labels = ['Выраженный дефицит (<16)',
  'Недостаток массы (16-18,5)',
  'Норма (18,5-20)',
  'Избыток массы (25-30)',
  'Ожирение 1 ст. (30-35)',
  'Ожирение 2 ст. (35-40)',
  'Ожирение 3 ст. (>40)'];

const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [1.1, 5.4, 35.2, 30.6, 17.2, 6.8, 3.7],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(12, 138, 138, 0.5)',
        'rgba(66, 20, 138, 0.5)',
        'rgba(66, 165, 0, 0.5)',
        'rgba(255, 165, 0, 0.5)',
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 87, 0, 0.5)'
      ],
    }
  ]
};

export const WeightChart = () => {
  return <Bar options={options} data={data}/>
};
