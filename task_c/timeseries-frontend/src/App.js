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
import { Chart } from 'react-chartjs-2';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './DatePickerStyles.css';

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
    // Multiply the power values by 1000
    const scaledDataPV = dataPV.map(d => ({ ...d, power: d.power * 1000 }));
    const scaledDataLoad = dataLoad.map(d => ({ ...d, power: d.power * 1000 }));
    setDataPV(scaledDataPV);
    setDataLoad(scaledDataLoad);
    calculateMetrics(scaledDataPV, scaledDataLoad);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}-${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}`;
  };

  const calculateMetrics = (dataPV, dataLoad) => {
    const totalPV = dataPV.reduce((acc, item) => acc + item.power, 0) / 4;
    const totalLoad = dataLoad.reduce((acc, item) => acc + item.power, 0) / 4;
    const pvSold = dataPV.reduce((acc, item, index) => {
      const loadPower = dataLoad[index] ? dataLoad[index].power : 0;
      return acc + Math.max(0, item.power - loadPower);
    }, 0) / 4;
    setTotalPVProduction(totalPV);
    setTotalConsumption(totalLoad);
    setPvSoldToNeighbors(pvSold);
  };

  const chartData = {
    labels: dataPV.map(d => new Date(d.timestamp).toLocaleString()), // Assuming PV and Load have the same timestamps
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energy Consumption and PV Production',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Power (kW)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
    },
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Exnaton Energy HUB
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          minDate={new Date('2023-02-01')}
          maxDate={new Date('2023-02-28')}
          customInput={<Button variant="outlined">Start Date</Button>}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          minDate={new Date('2023-02-01')}
          maxDate={new Date('2023-02-28')}
          customInput={<Button variant="outlined">End Date</Button>}
        />
        <Button variant="contained" onClick={handleFetchData}>Fetch Data</Button>
      </Box>
      <Typography variant="h6" align="center">
        Selected Date Range: {startDate.toLocaleString()} - {endDate.toLocaleString()}
      </Typography>
      <Box sx={{ height: '60vh', width: '100%', maxWidth: '1200px', margin: 'auto' }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Metrics
        </Typography>
        <Typography variant="body1">☀️ Total PV Production: {totalPVProduction.toFixed(2)} kWh</Typography>
        <Typography variant="body1">☀️🤝🏘️ PV Production Sold to Neighbors: {pvSoldToNeighbors.toFixed(2)} kWh</Typography>
        <Typography variant="body1">⚡ Total Consumption: {totalConsumption.toFixed(2)} kWh</Typography>
      </Box>
      <Box textAlign="center" mt={2}>
        <Button variant="outlined" onClick={() => setShowPVTable(!showPVTable)} style={{ margin: '10px' }}>
          {showPVTable ? 'Hide PV Data' : 'Show PV Data'}
        </Button>
        {showPVTable && (
          <>
            <Typography variant="h5" mt={2}>PV Data</Typography>
            <TableComponent data={dataPV} />
          </>
        )}
        <Button variant="outlined" onClick={() => setShowLoadTable(!showLoadTable)} style={{ margin: '10px' }}>
          {showLoadTable ? 'Hide Load Data' : 'Show Load Data'}
        </Button>
        {showLoadTable && (
          <>
            <Typography variant="h5" mt={2}>Load Data</Typography>
            <TableComponent data={dataLoad} />
          </>
        )}
      </Box>
    </Container>
  );
};

const TableComponent = ({ data }) => (
  <TableContainer component={Paper} sx={{ maxWidth: '1200px', margin: 'auto', marginTop: '20px' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Value (kW)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
            <TableCell>{item.power}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default App;
