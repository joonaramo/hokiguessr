import { useGetPlayerName } from '../../hooks/useGetPlayerName';

const GoalScorer = ({ playerId }) => {
  const playerName = useGetPlayerName(playerId);

  return (
    <p className='text-gray-500 text-sm truncate tracking-wider w-full'>
      {playerName}
    </p>
  );
};

export const GoalScorers = ({ homeTeamGoals, awayTeamGoals }) => {
  return (
    <div className='w-full flex p-3'>
      <div className='flex flex-wrap flex-col text-center w-1/2'>
        {homeTeamGoals.map((goal) => (
          <GoalScorer key={goal.eventId} playerId={goal.scorerPlayerId} />
        ))}
      </div>
      <div className='flex flex-wrap flex-col text-center w-1/2'>
        {awayTeamGoals.map((goal) => (
          <GoalScorer key={goal.eventId} playerId={goal.scorerPlayerId} />
        ))}
      </div>
    </div>
  );
};
