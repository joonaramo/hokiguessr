import { useState } from 'react';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Table';
import { useUsers } from '../../../hooks/useUsers';
import { useDeleteUser } from '../../../hooks/useDeleteUser';
import { EditUser } from './EditUser';
import { UserTable } from './UserTable';

export const Users = () => {
  const [page, setPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState();
  const usersQuery = useUsers(page);
  const deleteUser = useDeleteUser();

  if (usersQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  const { offset, limit, total, hasMore } = usersQuery.data.paging;

  return (
    <ContentLayout darkBg={true} title='Users'>
      {showEditModal && (
        <EditUser id={userId} open={showEditModal} setOpen={setShowEditModal} />
      )}
      <div className='mt-4'>
        <UserTable
          users={usersQuery.data.users}
          onEdit={(id) => {
            setUserId(id);
            setShowEditModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm('Do you want to delete this user?')) {
              deleteUser.mutate(id);
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
