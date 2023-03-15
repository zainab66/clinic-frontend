import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function BarChart(maleData) {
  const [chartData, setChartData] = useState([]);
  const patientsByMonth =
    chartData.maleData &&
    chartData.maleData.reduce((acc, patient) => {
      const month = patient.month.substring(0, 7); // Extract year and month from date string
      if (!acc[month]) {
        acc[month] = 1; // If month doesn't exist in accumulator, set count to 1
      } else {
        acc[month]++; // If month exists in accumulator, increment count
      }
      return acc;
    }, {});

  console.log(patientsByMonth);
  useEffect(() => {
    setChartData(maleData);
  }, [maleData]);

  const data = {
    labels: patientsByMonth && Object.keys(patientsByMonth),
    datasets: [
      {
        label: 'Male',
        data: patientsByMonth && Object.values(patientsByMonth),
        fill: false,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          // 'rgb(255, 99, 132)',
          // 'rgb(255, 159, 64)',
          // 'rgb(255, 205, 86)',
          // 'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          // 'rgb(153, 102, 255)',
          // 'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: [55, 49, 70, 71, 46, 45, 30],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          // 'rgb(255, 159, 64)',
          // 'rgb(255, 205, 86)',
          // 'rgb(75, 192, 192)',
          // 'rgb(54, 162, 235)',
          // 'rgb(153, 102, 255)',
          // 'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                stepSize: 1, // <-- set the step size to 5
              },
            },
          },
        }}
        height={300}
        width={500}
        data={data}
      />
    </div>
  );
}
