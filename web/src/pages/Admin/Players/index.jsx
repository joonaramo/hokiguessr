import { useState } from 'react';
import { Button } from '../../../components/Button';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Table';
import { useCustomPlayers } from '../../../hooks/useCustomPlayers';
import { CreatePlayer } from './CreatePlayer';
import { PlayerTable } from './PlayerTable';

export const Players = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const playersQuery = useCustomPlayers(page);

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
      <div className='mt-4'>
        <PlayerTable players={playersQuery.data.players} />
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
