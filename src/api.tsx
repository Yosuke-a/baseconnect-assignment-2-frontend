import axios from 'axios';

const API_BASE_URL = "https://baseconnect-backend-cba4a58a8c62.herokuapp.com/";

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching jobs:', error);
    throw error;
  }
};

export const createJobs = async (jobData: { title: string; category: string; income: number }) => {
  try {
    console.log('Requesting POST to:', `${API_BASE_URL}/jobs`);
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error while creating jobs:', error);
    throw error;
  }
};