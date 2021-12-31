import { Table } from '../../components/Table';

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
      ]}
    />
  );
};
