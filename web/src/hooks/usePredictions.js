import { useQuery } from 'react-query';
import predictionService from '../services/prediction';

export const usePredictions = () => {
  return useQuery('predictions', predictionService.getPredictions);
};
