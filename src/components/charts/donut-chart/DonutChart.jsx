import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({ tablesData }) => {
  const data = {
    labels: tablesData.labels,
    datasets: [
      {
        label: '# of Votes',
        data: tablesData.datasets.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label,
              currentValue = context.raw,
              total = context.chart._metasets[context.datasetIndex].total;

            var percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );

            return label + ': ' + currentValue + ' (' + percentage + '%)';
          },
        },
      },
      datalabels: {
        color: '#000',
        align: 'right',
        clamp: true,
        padding: {
          left: 30,
        },
        font: {
          size: 15,
          weight: 'bold',
        },
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            return (sum += data);
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';

          if (percentage === '0.00%' || sum <= 0) {
            return '';
          } else {
            return percentage;
          }
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={option} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default DonutChart;
