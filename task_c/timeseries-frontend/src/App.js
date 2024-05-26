import React, { useState } from 'react';
import { fetchData } from './api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [startDate, setStartDate] = useState(new Date('2023-02-02T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2023-02-03T00:00:00'));
  const [dataPV, setDataPV] = useState([]);
  const [dataLoad, setDataLoad] = useState([]);

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

  return (
    <div>
      <h1>Time Series Data Visualization</h1>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm"
        timeFormat="HH:mm"
        minDate={new Date('2023-02-01')}
        maxDate={new Date('2023-02-28')}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm"
        timeFormat="HH:mm"
        minDate={new Date('2023-02-01')}
        maxDate={new Date('2023-02-28')}
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      <h2>PV Data</h2>
      <Table data={dataPV} />
      <h2>Load Data</h2>
      <Table data={dataLoad} />
    </div>
  );
};

const Table = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.timestamp}</td>
          <td>{item.power}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default App;
