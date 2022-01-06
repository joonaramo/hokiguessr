import { Table } from '../../components/Table';
import { useGetPlayerName } from '../../hooks/useGetPlayerName';
import { useGetPlayerTeamName } from '../../hooks/useGetPlayerTeamName';

export const PredictionTable = ({ predictions }) => {
  return (
    <Table
      data={predictions}
      columns={[
        {
          title: 'Player',
          field: 'player_id',
          Cell({ entry: { player_id } }) {
            const playerName = useGetPlayerName(player_id);
            return <span className='tracking-wider'>{playerName}</span>;
          },
        },
        {
          title: 'Team',
          field: 'player_id',
          Cell({ entry: { player_id } }) {
            const playerTeamName = useGetPlayerTeamName(player_id);
            return <span className='tracking-wider'>{playerTeamName}</span>;
          },
        },
        { title: 'Points used', field: 'points_used' },
        { title: 'Points ratio', field: 'points_ratio' },
      ]}
    />
  );
};
