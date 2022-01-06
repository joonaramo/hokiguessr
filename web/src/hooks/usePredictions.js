import { useQuery } from 'react-query';
import predictionService from '../services/prediction';

export const usePredictions = (page) => {
  return useQuery(
    ['predictions', page],
    () => predictionService.getPredictions(page),
    { keepPreviousData: true }
  );
};
