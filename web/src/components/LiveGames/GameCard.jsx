import { useState } from 'react';
import { Card } from '../Card';
import { GoalScorers } from './GoalScorers';

export const GameCard = ({ game, getTeamName }) => {
  const [showGoalScorers, setShowGoalScorers] = useState(false);
  return (
    <Card as='li'>
      <button
        onClick={() => !game.ended && setShowGoalScorers(!showGoalScorers)}
        className='w-full p-6'
      >
        <div className='w-full flex items-center justify-center space-x-3'>
          <h3 className='flex justify-end text-gray-900 text-sm font-medium w-1/3'>
            {getTeamName(game.homeTeam.teamId)}
          </h3>
          <span className='flex justify-center text-gray-900 text-sm font-medium w-1/3'>
            {game.homeTeam.goals} - {game.awayTeam.goals}
          </span>
          <h3 className='flex justify-start text-gray-900 text-sm font-medium w-1/3'>
            {getTeamName(game.awayTeam.teamId)}
          </h3>
        </div>
      </button>
      {showGoalScorers && (
        <GoalScorers
          homeTeamGoals={game.homeTeam.goalEvents}
          awayTeamGoals={game.awayTeam.goalEvents}
          season={game.season}
          gameId={game.id}
        />
      )}
    </Card>
  );
};
