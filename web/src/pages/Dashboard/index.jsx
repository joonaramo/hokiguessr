import { Card } from '../../components/Card';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { useAuth } from '../../lib/auth';
import { PredictionTable } from './PredictionTable';
import { usePredictions } from '../../hooks/usePredictions';
import { LinkButton } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { usePlayers } from '../../hooks/usePlayers';

export const Dashboard = () => {
  const { user } = useAuth();
  const predictionsQuery = usePredictions();
  const playersQuery = usePlayers();

  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used;

  const returnedReducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used * currentValue.points_ratio;

  const getPlayerName = (playerId) => {
    const player = playersQuery.data.find((player) => player.id === playerId);
    return `${player.lastName} ${player.firstName}`;
  };

  const getPlayerTeamName = (playerId) => {
    const player = playersQuery.data.find((player) => player.id === playerId);
    return player.teamId.split(':')[1].toUpperCase();
  };

  if (predictionsQuery.isLoading || playersQuery.isLoading) {
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
            <h2 className='text-xl'>{predictionsQuery.data.length}</h2>
            <h3>Predictions</h3>
          </Card>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>
              {predictionsQuery.data.reduce(reducer, 0)}
            </h2>
            <h3>Points used</h3>
          </Card>
          <Card className='flex flex-col text-center justify-center p-6'>
            <h2 className='text-xl'>
              {predictionsQuery.data
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
          {predictionsQuery.data.filter(
            (prediction) => !prediction.completed_at
          ).length > 0 ? (
            <PredictionTable
              getPlayerName={getPlayerName}
              getPlayerTeamName={getPlayerTeamName}
              predictions={predictionsQuery.data.filter(
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
