import { ContentLayout } from '../Layout/ContentLayout';
import { useQuery } from 'react-query';
import liigaService from '../../services/liiga';
import { GameCard } from './GameCard';
import { Spinner } from '../Spinner';

export const LiveGames = () => {
  const games = useQuery('liveGames', liigaService.getLiveGames);
  const teams = useQuery('liigaTeams', liigaService.getTeams);

  const getTeamName = (teamId) => {
    return teams.data[teamId].name;
  };

  if (games.isLoading || teams.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <ContentLayout darkBg={true} title='Live Games'>
      {games.data.length > 0 ? (
        <ul className='grid grid-cols-1 gap-6 mt-4'>
          {games.data.map((game) => (
            <GameCard key={game.id} game={game} getTeamName={getTeamName} />
          ))}
        </ul>
      ) : (
        <p className='mt-4'>No live games on right now.</p>
      )}
    </ContentLayout>
  );
};
