import { format } from 'date-fns';
import { Table } from '../../../components/Table';
import { useGetPlayerName } from '../../../hooks/useGetPlayerName';
import { useGetPlayerTeamName } from '../../../hooks/useGetPlayerTeamName';
import { useUser } from '../../../hooks/useUser';

export const PredictionTable = ({ predictions }) => {
  return (
    <Table
      rounded={false}
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
          title: 'User',
          Cell({ entry: { user_id } }) {
            const user = useUser(user_id);
            if (user.isLoading) return null;
            return user.data.username;
          },
        },
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
        { title: 'Pucks used', field: 'points_used' },
        { title: 'Puck ratio', field: 'points_ratio' },
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
