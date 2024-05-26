import React, { useState, useEffect } from 'react';
import { fetchData } from './api';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [startDate, setStartDate] = useState(new Date('2023-02-02T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2023-02-03T00:00:00'));
  const [dataPV, setDataPV] = useState([]);
  const [dataLoad, setDataLoad] = useState([]);
  const [showPVTable, setShowPVTable] = useState(false);
  const [showLoadTable, setShowLoadTable] = useState(false);
  const [totalPVProduction, setTotalPVProduction] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [pvSoldToNeighbors, setPvSoldToNeighbors] = useState(0);

  const handleFetchData = async () => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const dataPV = await fetchData('pv', start, end);
    const dataLoad = await fetchData('load', start, end);
    setDataPV(dataPV);
    setDataLoad(dataLoad);
    calculateMetrics(dataPV, dataLoad);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}-${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}`;
  };

  const calculateMetrics = (dataPV, dataLoad) => {
    const totalPV = dataPV.reduce((acc, item) => acc + item.power, 0) / 4 * 1000;
    const totalLoad = dataLoad.reduce((acc, item) => acc + item.power, 0) / 4 * 1000;
    const pvSold = dataPV.reduce((acc, item, index) => {
      const loadPower = dataLoad[index] ? dataLoad[index].power : 0;
      return acc + Math.max(0, item.power - loadPower);
    }, 0) / 4 * 1000;
    setTotalPVProduction(totalPV);
    setTotalConsumption(totalLoad);
    setPvSoldToNeighbors(pvSold);
  };

  const chartData = {
    labels: dataPV.map(d => d.timestamp), // Assuming PV and Load have the same timestamps
    datasets: [
      {
        label: 'PV',
        data: dataPV.map(d => d.power),
        fill: false,
        borderColor: 'rgb(255, 205, 86)', // Yellow
        tension: 0.1
      },
      {
        label: 'Load',
        data: dataLoad.map(d => d.power),
        fill: false,
        borderColor: 'rgb(75, 192, 192)', // Teal
        tension: 0.1
      }
    ]
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Exnaton Energy HUB</h1>
      <div>
        <span>Enter: Date_start (YYYY:MM:DD:HH:mm)</span>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          minDate={new Date('2023-02-01')}
          maxDate={new Date('2023-02-28')}
        />
      </div>
      <div>
        <span>Enter: Date_end (YYYY:MM:DD:HH:mm)</span>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          minDate={new Date('2023-02-01')}
          maxDate={new Date('2023-02-28')}
        />
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
      <div style={{ width: '80%', margin: 'auto' }}>
        <Line data={chartData} />
      </div>
      <div style={{ margin: '20px' }}>
        <h2>Metrics</h2>
        <p>Total PV Production: {totalPVProduction.toFixed(2)} kWh</p>
        <p>PV Production Sold to Neighbors: {pvSoldToNeighbors.toFixed(2)} kWh</p>
        <p>Total Consumption: {totalConsumption.toFixed(2)} kWh</p>
      </div>
      <button onClick={() => setShowPVTable(!showPVTable)}>Show PV Data</button>
      {showPVTable && (
        <>
          <h2>PV Data</h2>
          <Table data={dataPV} />
        </>
      )}
      <button onClick={() => setShowLoadTable(!showLoadTable)}>Show Load Data</button>
      {showLoadTable && (
        <>
          <h2>Load Data</h2>
          <Table data={dataLoad} />
        </>
      )}
    </div>
  );
};

const Table = ({ data }) => (
  <table style={{ margin: 'auto', marginTop: '20px', border: '1px solid black', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td style={{ border: '1px solid black', padding: '8px' }}>{item.timestamp}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{item.power}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default App;
