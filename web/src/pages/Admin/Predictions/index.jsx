import { useState } from 'react';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Table';
import { useAllPredictions } from '../../../hooks/useAllPredictions';
import { PredictionTable } from './PredictionTable';

export const Predictions = () => {
  const [page, setPage] = useState(1);
  const predictionsQuery = useAllPredictions(page);

  if (predictionsQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const { offset, limit, total, hasMore } = predictionsQuery.data.paging;

  return (
    <ContentLayout darkBg={true} title='Predictions'>
      <div className='mt-4'>
        <PredictionTable predictions={predictionsQuery.data.predictions} />
        <Pagination
          offset={offset}
          hasMore={hasMore}
          limit={limit}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
    </ContentLayout>
  );
};
