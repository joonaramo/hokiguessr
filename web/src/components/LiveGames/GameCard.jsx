import { useState } from 'react';
import { useGetTeamName } from '../../hooks/useGetTeamName';
import { Card } from '../Card';
import { GoalScorers } from './GoalScorers';

export const GameCard = ({ game }) => {
  const [showGoalScorers, setShowGoalScorers] = useState(false);
  const homeTeamName = useGetTeamName(game.homeTeam.teamId);
  const awayTeamName = useGetTeamName(game.awayTeam.teamId);

  const getPeriod = (gameTime) => {
    if (gameTime / 60 <= 20) {
      return '1. Period';
    } else if (gameTime / 60 <= 40) {
      return '2. Period';
    } else {
      return '3. Period';
    }
  };
  return (
    <Card as='li'>
      <button
        onClick={() =>
          game.homeTeam.goalEvents && setShowGoalScorers(!showGoalScorers)
        }
        className='w-full p-6'
      >
        <div className='w-full flex items-center justify-center space-x-3 mt-2'>
          <h3 className='flex justify-end text-gray-900 text-sm font-medium w-1/3'>
            {homeTeamName}
          </h3>
          <div className='flex flex-col justify-center text-gray-900 text-sm font-medium w-1/3'>
            <span className='absolute top-0 rounded-b-md bg-gray-700 left-1/2 -translate-x-1/2 text-gray-300 pb-1 px-2'>
              {game.ended
                ? 'End'
                : `${getPeriod(game.gameTime)} -
              ${(game.gameTime / 60).toFixed(2).replace('.', ':')}`}
            </span>
            {game.homeTeam.goals} - {game.awayTeam.goals}
          </div>
          <h3 className='flex justify-start text-gray-900 text-sm font-medium w-1/3'>
            {awayTeamName}
          </h3>
        </div>
      </button>
      {showGoalScorers && (
        <GoalScorers
          homeTeamGoals={game.homeTeam.goalEvents}
          awayTeamGoals={game.awayTeam.goalEvents}
        />
      )}
    </Card>
  );
};
