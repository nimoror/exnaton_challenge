import React, { useState, useEffect } from 'react';
import { fetchData } from './api';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  // Set initial dates to a range where data is available
  const [startDate, setStartDate] = useState(new Date('2023-02-02T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2023-02-03T00:00:00'));
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const getData = async () => {
      // Format the date as 'YYYY-MM-DD-HH-MM'
      const format = date => `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}-${("0" + date.getHours()).slice(-2)}-${("0" + date.getMinutes()).slice(-2)}`;
      const data = await fetchData(format(startDate), format(endDate));
      if(data && data.length > 0) {
        setChartData({
          labels: data.map(d => d.timestamp),
          datasets: [{
            label: 'Energy Consumption',
            data: data.map(d => d.power),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      } else {
        // Handle empty or incorrect data
        setChartData({
          labels: [],
          datasets: []
        });
      }
    };
    getData();
  }, [startDate, endDate]);

  return (
    <div>
      <h1>Time Series Data Visualization</h1>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <Line data={chartData} />
    </div>
  );
};

export default App;
