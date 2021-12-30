import { axios } from '../lib/axios';

const getPredictions = async () => {
  return await axios.get('/predictions');
};

const createPrediction = async (data) => {
  return await axios.post('/predictions', data);
};

const predictionService = {
  getPredictions,
  createPrediction,
};

export default predictionService;
