import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarsChart = ({ tablesData }) => {
  const [labels, setLabels] = useState('');

  useEffect(() => {
    setLabels(tablesData.labels);
  }, [tablesData]);

  const data = {
    labels,
    datasets: [
      {
        data: tablesData.datasets.data,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        maxBarThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'סכום הוצאות לפי קטגוריה',
        font: {
          size: 20,
        },
        padding: 20,
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: '#000',
        textAlign: 'center',
        anchor: 'end',
        align: 'end',
        padding: {
          left: 2,
          right: 2,
          top: 0,
          bottom: 0,
        },
        font: {
          size: 15,
          weight: 'bold',
        },
      },
    },
  };
  return <div>{tablesData && <Bar options={options} data={data} />}</div>;
};

export default BarsChart;
