import { Table } from '../../components/Table';
import { format } from 'date-fns';

export const PredictionTable = ({
  predictions,
  getPlayerName,
  getPlayerTeamName,
}) => {
  return (
    <Table
      data={predictions}
      columns={[
        {
          title: 'Date',
          field: 'created_at',
          Cell({ entry: { created_at } }) {
            return format(new Date(created_at), 'dd.MM.yyyy');
          },
        },
        {
          title: 'Player',
          field: 'player_id',
          Cell({ entry: { player_id } }) {
            return (
              <span className='tracking-wider'>{getPlayerName(player_id)}</span>
            );
          },
        },
        {
          title: 'Team',
          field: 'player_id',
          Cell({ entry: { player_id } }) {
            return (
              <span className='tracking-wider'>
                {getPlayerTeamName(player_id)}
              </span>
            );
          },
        },
        { title: 'Points used', field: 'points_used' },
        { title: 'Points ratio', field: 'points_ratio' },
        {
          title: 'Correct',
          field: 'correct',
          Cell({ entry: { correct } }) {
            return correct ? 'Yes' : 'No';
          },
        },
      ]}
    />
  );
};
