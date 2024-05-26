import axios from 'axios';

export const fetchData = async (start, end) => {
  try {
    const response = await axios.get(`http://localhost:5000/energydata?type=${type}&start=${start}&end=${end}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
