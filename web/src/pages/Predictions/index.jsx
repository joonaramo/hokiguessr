import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import { usePlayers } from '../../hooks/usePlayers';
import { usePredictions } from '../../hooks/usePredictions';
import { PredictionTable } from './PredictionTable';

export const Predictions = () => {
  const predictionsQuery = usePredictions();
  const playersQuery = usePlayers();

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
    <ContentLayout darkBg={true} title='Predictions'>
      <div className='mt-4'>
        {predictionsQuery.data.length > 0 ? (
          <PredictionTable
            getPlayerName={getPlayerName}
            getPlayerTeamName={getPlayerTeamName}
            predictions={predictionsQuery.data}
          />
        ) : (
          <p>You have no predictions.</p>
        )}
      </div>
    </ContentLayout>
  );
};
