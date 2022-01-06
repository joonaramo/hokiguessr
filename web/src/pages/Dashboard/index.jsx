import { Card } from '../../components/Card';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { useAuth } from '../../lib/auth';
import { PredictionTable } from './PredictionTable';
import { usePredictions } from '../../hooks/usePredictions';
import { LinkButton } from '../../components/Button';
import { Spinner } from '../../components/Spinner';

export const Dashboard = () => {
  const { user } = useAuth();
  const predictionsQuery = usePredictions(1);

  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used;

  const returnedReducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used * currentValue.points_ratio;

  if (predictionsQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <ContentLayout darkBg={true} title={`Hey, ${user.username}!`}>
        <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>{user.points}</h2>
            <h3>Points</h3>
          </Card>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>{predictionsQuery.data.paging.total}</h2>
            <h3>Predictions</h3>
          </Card>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>
              {predictionsQuery.data.predictions.reduce(reducer, 0)}
            </h2>
            <h3>Points used</h3>
          </Card>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>
              {predictionsQuery.data.predictions
                .filter((prediction) => prediction.correct)
                .reduce(returnedReducer, 0)}
            </h2>
            <h3>Points returned</h3>
          </Card>
        </div>
      </ContentLayout>

      <ContentLayout
        darkBg={true}
        title='Your active predictions'
        buttonElement={
          <LinkButton className='py-2' to='games'>
            New Prediction
          </LinkButton>
        }
      >
        <div className='mt-4'>
          {predictionsQuery.data.predictions.filter(
            (prediction) => !prediction.completed_at
          ).length > 0 ? (
            <PredictionTable
              predictions={predictionsQuery.data.predictions.filter(
                (prediction) => !prediction.completed_at
              )}
            />
          ) : (
            <p>You have no active predictions.</p>
          )}
        </div>
      </ContentLayout>
    </>
  );
};
