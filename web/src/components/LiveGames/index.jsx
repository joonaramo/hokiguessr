import { ContentLayout } from '../Layout/ContentLayout';
import { GameCard } from './GameCard';
import { Spinner } from '../Spinner';
import { RefreshIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils/classnames';
import { useLiveGames } from '../../hooks/useLiveGames';

export const LiveGames = () => {
  const gamesQuery = useLiveGames();

  if (gamesQuery.isLoading) {
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
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      ) : (
        <p className='mt-4'>No live games on right now.</p>
      )}
    </ContentLayout>
  );
};
