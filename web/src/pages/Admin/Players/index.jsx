import { useState } from 'react';
import { Button } from '../../../components/Button';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Table';
import { useCustomPlayers } from '../../../hooks/useCustomPlayers';
import { useDeleteCustomPlayer } from '../../../hooks/useDeleteCustomPlayer';
import { CreatePlayer } from './CreatePlayer';
import { EditPlayer } from './EditPlayer';
import { PlayerTable } from './PlayerTable';

export const Players = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [playerId, setPlayerId] = useState();
  const [playerName, setPlayerName] = useState('');
  const playersQuery = useCustomPlayers(page);
  const deletePlayer = useDeleteCustomPlayer();

  if (playersQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const { offset, limit, total, hasMore } = playersQuery.data.paging;

  return (
    <ContentLayout
      darkBg={true}
      title='Players'
      buttonElement={
        <Button onClick={() => setShowModal(true)} className='py-2'>
          New Player
        </Button>
      }
    >
      {showModal && <CreatePlayer open={showModal} setOpen={setShowModal} />}
      {showEditModal && (
        <EditPlayer
          id={playerId}
          playerName={playerName}
          open={showEditModal}
          setOpen={setShowEditModal}
        />
      )}
      <div className='mt-4'>
        <PlayerTable
          players={playersQuery.data.players}
          onEdit={(id, playerName) => {
            setPlayerId(id);
            setPlayerName(playerName);
            setShowEditModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm('Do you want to delete this player?')) {
              deletePlayer.mutate(id);
            }
          }}
        />
        <Pagination
          offset={offset}
          hasMore={hasMore}
          limit={limit}
          page={page}
          setPage={setPage}
          total={total}
        />
      </div>
    </ContentLayout>
  );
};
