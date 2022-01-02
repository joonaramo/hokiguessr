import { useQuery } from 'react-query';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import liigaService from '../../services/liiga';
import { GameCard } from './GameCard';

export const Games = () => {
  const games = useQuery('liigaGames', liigaService.getGames);
  const teams = useQuery('liigaTeams', liigaService.getTeams);

  if (games.isLoading || teams.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const getTeamName = (teamId) => {
    return teams.data[teamId].name;
  };

  const upcomingGames = games.data.filter(
    (game) => new Date(game.start).getTime() > new Date(Date.now()).getTime()
  );

  const nextGameDay = upcomingGames[0].start.split('T')[0];

  const nextGameDayGames = upcomingGames.filter(
    (game) => game.start.split('T')[0] === nextGameDay
  );

  return (
    <ContentLayout darkBg={true} title='Upcoming Games'>
      <h2 className='mt-4'>{nextGameDay}</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        {nextGameDayGames.map((game) => (
          <GameCard key={game.id} game={game} getTeamName={getTeamName} />
        ))}
      </ul>
    </ContentLayout>
  );
};
