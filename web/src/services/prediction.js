import { axios } from '../lib/axios';

const getPredictions = async (page, active) => {
  return await axios.get('/predictions', { params: { page, active } });
};

const createPrediction = async (data) => {
  return await axios.post('/predictions', data);
};

const updatePrediction = async (id, data) => {
  return await axios.patch(`/predictions/${id}`, data);
};

const predictionService = {
  getPredictions,
  createPrediction,
  updatePrediction,
};

export default predictionService;
