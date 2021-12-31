import { useQuery } from 'react-query';
import liigaService from '../../services/liiga';
import { Spinner } from '../Spinner';

export const GoalScorers = ({
  homeTeamGoals,
  awayTeamGoals,
  season,
  gameId,
}) => {
  const game = useQuery(['liigaGame', { season, gameId }], () =>
    liigaService.getGame(season, gameId)
  );

  if (game.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const getPlayerName = (playerId, team) => {
    let player;
    if (team === 'home') {
      player = game.data.homeTeamPlayers.find(
        (player) => player.id === playerId
      );
    } else {
      player = game.data.awayTeamPlayers.find(
        (player) => player.id === playerId
      );
    }
    return `${player.lastName} ${player.firstName}`;
  };

  return (
    <div className='w-full flex p-3'>
      <div className='flex flex-wrap flex-col text-center w-1/2'>
        {homeTeamGoals.map((goal) => (
          <p
            key={goal.eventId}
            className='text-gray-500 text-sm truncate tracking-wider w-full'
          >
            {getPlayerName(goal.scorerPlayerId, 'home')}
          </p>
        ))}
      </div>
      <div className='flex flex-wrap flex-col text-center w-1/2'>
        {awayTeamGoals.map((goal) => (
          <p
            key={goal.eventId}
            className='text-gray-500 text-sm truncate tracking-wider w-full'
          >
            {getPlayerName(goal.scorerPlayerId, 'away')}
          </p>
        ))}
      </div>
    </div>
  );
};
