import React, { useState } from 'react';
import { fetchData } from './api';
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
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

  const handleFetchData = async () => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const dataPV = await fetchData('pv', start, end);
    const dataLoad = await fetchData('load', start, end);
    setDataPV(dataPV);
    setDataLoad(dataLoad);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}-${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}`;
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
