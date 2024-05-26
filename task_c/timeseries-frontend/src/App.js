import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [startDate, setStartDate] = useState(new Date('2023-02-02T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2023-02-03T00:00:00'));

  // This function simulates data fetching
  const handleFetchData = () => {
    console.log("Fetching data for:", startDate, "to", endDate);
    alert(`Fetching data from ${startDate} to ${endDate}`);
  };

  return (
    <div>
      <h1>Simple React App</h1>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default App;
