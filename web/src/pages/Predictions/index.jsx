import { useState } from 'react';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import { usePredictions } from '../../hooks/usePredictions';
import { Pagination } from '../../components/Table';
import { PredictionTable } from './PredictionTable';

export const Predictions = () => {
  const [page, setPage] = useState(1);
  const predictionsQuery = usePredictions(page);

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
        {predictionsQuery.data.predictions.length > 0 ? (
          <>
            <PredictionTable predictions={predictionsQuery.data.predictions} />
            <Pagination
              offset={offset}
              limit={limit}
              total={total}
              page={page}
              setPage={setPage}
              hasMore={hasMore}
            />
          </>
        ) : (
          <p>You have no predictions.</p>
        )}
      </div>
    </ContentLayout>
  );
};
