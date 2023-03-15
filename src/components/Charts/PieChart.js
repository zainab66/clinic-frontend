import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function PieChart(patientEachMonth) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    setChartData(patientEachMonth);
  }, [patientEachMonth]);

  // Define age ranges
  const ageRanges = [
    { label: 'Under 18', minAge: 0, maxAge: 17 },
    { label: '18-34', minAge: 18, maxAge: 34 },
    { label: '35-49', minAge: 35, maxAge: 49 },
    { label: '50-64', minAge: 50, maxAge: 64 },
    { label: '65 and over', minAge: 65, maxAge: Infinity },
  ];

  // Group patients by age range
  const patientsByAgeRange =
    chartData.patientEachMonth &&
    chartData.patientEachMonth.reduce((acc, patient) => {
      const ageRange = ageRanges.find(
        (range) => patient.age >= range.minAge && patient.age <= range.maxAge
      );
      if (!acc[ageRange.label]) {
        acc[ageRange.label] = 1;
      } else {
        acc[ageRange.label]++;
      }
      return acc;
    }, {});

  // Convert patientsByAgeRange data into the format expected by Chart.js for the pie chart
  const data = {
    labels: patientsByAgeRange && Object.keys(patientsByAgeRange),
    datasets: [
      {
        label: 'Age Distribution',
        data: patientsByAgeRange && Object.values(patientsByAgeRange),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  // Group patients by age
  // const patientsByAge =
  //   chartData.patientEachMonth &&
  //   chartData.patientEachMonth.reduce((acc, patient) => {
  //     if (!acc[patient.age]) {
  //       acc[patient.age] = 1;
  //     } else {
  //       acc[patient.age]++;
  //     }
  //     return acc;
  //   }, {});

  // // Convert patientsByAge data into the format expected by Chart.js for the line chart
  // const lineChartData = {
  //   labels: Object.keys(patientsByAge),
  //   datasets: [
  //     {
  //       label: 'Number of Patients by Age',
  //       data: Object.values(patientsByAge),
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //     },
  //   ],
  // };
  // const data = {
  //   labels: Object.keys(patientsByAge),
  //   datasets: [
  //     {
  //       label: 'Age Distribution',
  //       data: Object.values(patientsByAge),
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.5)',
  //         'rgba(54, 162, 235, 0.5)',
  //         'rgba(255, 206, 86, 0.5)',
  //         'rgba(75, 192, 192, 0.5)',
  //         'rgba(153, 102, 255, 0.5)',
  //         'rgba(255, 159, 64, 0.5)',
  //       ],
  //     },
  //   ],
  // };
  // const patientsByMonthAndAge =
  //   chartData.patientEachMonth &&
  //   chartData.patientEachMonth.reduce((acc, patient) => {
  //     const month = patient.month.substring(0, 7); // Extract year and month from date string
  //     if (!acc[month]) {
  //       acc[month] = {};
  //     }
  //     if (!acc[month][patient.age]) {
  //       acc[month][patient.age] = 1; // If month and age combination doesn't exist in accumulator, set count to 1
  //     } else {
  //       acc[month][patient.age]++; // If month and age combination exists in accumulator, increment count
  //     }
  //     return acc;
  //   }, {});

  // // Convert patientsByMonthAndAge data into the format expected by Chart.js
  // const data = {
  //   labels: patientsByMonthAndAge && Object.keys(patientsByMonthAndAge),
  //   datasets: [],
  // };

  // patientsByMonthAndAge &&
  //   Object.keys(patientsByMonthAndAge).forEach((month, index) => {
  //     const ageCounts = patientsByMonthAndAge[month];
  //     const ageData = Object.keys(ageCounts).map((age) => ageCounts[age]);
  //     data.datasets.push({
  //       label: `Age ${Object.keys(ageCounts).join(', ')}`,
  //       data: ageData,
  //       fill: false,
  //       // borderColor: `rgb(${index * 50}, ${255 - index * 50}, 0)`,
  //     });
  //   });
  // console.log(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <div>
      <Pie data={data} options={options} height={300} width={500} />
    </div>
  );
}
