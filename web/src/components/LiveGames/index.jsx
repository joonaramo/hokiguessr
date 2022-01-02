import { ContentLayout } from '../Layout/ContentLayout';
import { useQuery } from 'react-query';
import liigaService from '../../services/liiga';
import { GameCard } from './GameCard';
import { Spinner } from '../Spinner';
import { RefreshIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils/classnames';
import { useNotificationStore } from '../../stores/notification';

export const LiveGames = () => {
  const { addNotification } = useNotificationStore();
  const games = useQuery('liveGames', liigaService.getLiveGames, {
    onSuccess: (data) => {
      const prevData = games.data;
      if (prevData) {
        let goals = [];
        data.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          goals = goals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          goals = goals.concat(awayGoalEvents);
        });
        let oldGoals = [];
        prevData.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          oldGoals = oldGoals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          oldGoals = oldGoals.concat(awayGoalEvents);
        });
        const newGoals = goals.filter(
          (goal) =>
            !JSON.stringify(oldGoals).includes(`"eventId":${goal.eventId}`) &&
            !goal.goalTypes.includes('VL')
        );
        newGoals.forEach((goal) => {
          addNotification({
            type: 'info',
            title: 'New goal scored!',
            message: `Player: ${getPlayerName(goal.scorerPlayerId)}`,
          });
        });
      }
    },
  });
  const teams = useQuery('liigaTeams', liigaService.getTeams);
  const players = useQuery('liigaPlayers', () => liigaService.getPlayers());

  const getTeamName = (teamId) => {
    return teams.data[teamId].name;
  };

  const getPlayerName = (playerId) => {
    const player = players.data.find((player) => player.id === playerId);
    return `${player.lastName} ${player.firstName}`;
  };

  if (games.isLoading || teams.isLoading || players.isLoading) {
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
        <button onClick={() => games.refetch()}>
          <RefreshIcon
            className={classNames(
              games.isRefetching ? 'animate-spin-fast rotate-[179deg]' : '',
              'w-6 h-6'
            )}
          />
        </button>
      }
    >
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
