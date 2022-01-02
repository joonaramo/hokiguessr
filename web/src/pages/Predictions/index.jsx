import { useQuery } from 'react-query';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import liigaService from '../../services/liiga';
import predictionService from '../../services/prediction';
import { PredictionTable } from './PredictionTable';

export const Predictions = () => {
  const predictions = useQuery('predictions', predictionService.getPredictions);
  const players = useQuery('players', () => liigaService.getPlayers());

  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used;

  const returnedReducer = (previousValue, currentValue) =>
    previousValue + currentValue.points_used * currentValue.points_ratio;

  const getPlayerName = (playerId) => {
    const player = players.data.find((player) => player.id === playerId);
    return `${player.lastName} ${player.firstName}`;
  };

  const getPlayerTeamName = (playerId) => {
    const player = players.data.find((player) => player.id === playerId);
    return player.teamId.split(':')[1].toUpperCase();
  };

  if (predictions.isLoading || players.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <ContentLayout darkBg={true} title='Predictions'>
      <div className='mt-4'>
        {predictions.data.length > 0 ? (
          <PredictionTable
            getPlayerName={getPlayerName}
            getPlayerTeamName={getPlayerTeamName}
            predictions={predictions.data}
          />
        ) : (
          <p>You have no predictions.</p>
        )}
      </div>
      {/* <h2 className='mt-4'>{nextGameDay}</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        {nextGameDayGames.map((game) => (
          <GameCard key={game.id} game={game} getTeamName={getTeamName} />
        ))}
      </ul> */}
    </ContentLayout>
  );
};
