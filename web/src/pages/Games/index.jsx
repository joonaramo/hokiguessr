import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import { useGames } from '../../hooks/useGames';
import { GameCard } from './GameCard';

export const Games = () => {
  const gamesQuery = useGames();

  if (gamesQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const upcomingGames = gamesQuery.data.filter(
    (game) => new Date(game.start).getTime() > new Date(Date.now()).getTime()
  );

  const nextGameDay = upcomingGames[0].start.split('T')[0];

  const nextGameDayGames = upcomingGames.filter(
    (game) => game.start.split('T')[0] === nextGameDay
  );

  return (
    <ContentLayout darkBg={true} title='Upcoming Games'>
      <p className='mt-4'>
        Predicting starts after the line-ups have been announced (usually 13.00
        on the game day). Predicting will be closed once the game has started.
      </p>
      <h2 className='mt-4'>{nextGameDay}</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        {nextGameDayGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </ContentLayout>
  );
};
