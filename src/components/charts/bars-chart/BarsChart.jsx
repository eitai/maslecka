import React, { useMemo, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';
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
  let color = randomColor();

  // const labels = useMemo(() => {
  //   const labels = tablesData.map((label) => {
  //     return label.title;
  //   });
  // }, [tablesData]);

  const data = useMemo(() => {
    if (tablesData) {
      const labels = tablesData.map((label) => {
        return label.title;
      });
      console.log(labels);

      const dataSet = tablesData?.map((category) => {
        const rows = category.rows;
        const rowData = rows.map((el) => {
          return { kind: el.kind, amount: el.amount };
        });

        return { data: rowData, backgroundColor: color };
      });
      console.log({ labels, datasets: dataSet });
      return { labels, datasets: dataSet };
    }
  }, [tablesData, color]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    parsing: {
      xAxisKey: 'kind',
      yAxisKey: 'amount',
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarsChart;
