import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [startDate, setStartDate] = useState(new Date('2023-02-01T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2023-02-28T00:00:00'));
  const [data, setData] = useState([]);

  const handleFetchData = async () => {
    // Format the date as 'YYYY-MM-DD-HH-MM'
    const format = date => `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}-00-00`;
    const response = await fetch(`http://localhost:5000/energydata?start=${format(startDate)}&end=${format(endDate)}`);
    const result = await response.json();
    setData(result); // This assumes the API returns an array of objects
  };

  return (
    <div>
      <h1>Simple React App</h1>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={new Date('2023-02-01')}
        maxDate={new Date('2023-02-28')}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={new Date('2023-02-01')}
        maxDate={new Date('2023-02-28')}
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Power (MW)</th>
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
      )}
    </div>
  );
};

export default App;
