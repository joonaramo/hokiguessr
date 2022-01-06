import { axios } from '../lib/axios';

const getPredictions = async (page) => {
  return await axios.get('/predictions', { params: { page } });
};

const createPrediction = async (data) => {
  return await axios.post('/predictions', data);
};

const predictionService = {
  getPredictions,
  createPrediction,
};

export default predictionService;
