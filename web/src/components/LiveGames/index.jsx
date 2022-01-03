import { ContentLayout } from '../Layout/ContentLayout';
import { GameCard } from './GameCard';
import { Spinner } from '../Spinner';
import { RefreshIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils/classnames';
import { useLiveGames } from '../../hooks/useLiveGames';
import { useTeams } from '../../hooks/useTeams';
import { usePlayers } from '../../hooks/usePlayers';

export const LiveGames = () => {
  const getTeamName = (teamId) => {
    return teamsQuery.data[teamId].name;
  };

  const getPlayerName = (playerId) => {
    const player = playersQuery.data.find((player) => player.id === playerId);
    return `${player.lastName} ${player.firstName}`;
  };

  const gamesQuery = useLiveGames(getPlayerName);
  const teamsQuery = useTeams();
  const playersQuery = usePlayers();

  if (gamesQuery.isLoading || teamsQuery.isLoading || playersQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <ContentLayout
      darkBg={true}
      title='Live Games'
      buttonElement={
        <button onClick={() => gamesQuery.refetch()}>
          <RefreshIcon
            className={classNames(
              gamesQuery.isRefetching
                ? 'animate-spin-fast rotate-[179deg]'
                : '',
              'w-6 h-6'
            )}
          />
        </button>
      }
    >
      {gamesQuery.data.length > 0 ? (
        <ul className='grid grid-cols-1 gap-6 mt-4'>
          {gamesQuery.data.map((game) => (
            <GameCard key={game.id} game={game} getTeamName={getTeamName} />
          ))}
        </ul>
      ) : (
        <p className='mt-4'>No live games on right now.</p>
      )}
    </ContentLayout>
  );
};
