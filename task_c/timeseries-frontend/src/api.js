import axios from 'axios';

export const fetchData = async (type, start, end) => {
  try {
    const response = await axios.get('http://localhost:5000/energydata', {
      params: {
        type,
        start,
        end
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
