import { Table } from '../../../components/Table';
import { useGetPlayerName } from '../../../hooks/useGetPlayerName';
import { useGetPlayerTeamName } from '../../../hooks/useGetPlayerTeamName';

export const PlayerTable = ({ players }) => {
  return (
    <Table
      rounded={false}
      data={players}
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
        { title: 'Points ratio', field: 'points_ratio' },
        {
          title: 'Actions',
          Cell() {
            return (
              <div className='flex'>
                <button className='text-indigo-600 hover:text-indigo-900'>
                  Edit
                </button>
                <button className='ml-4 text-rose-600 hover:text-rose-900'>
                  Delete
                </button>
              </div>
            );
          },
        },
      ]}
    />
  );
};
