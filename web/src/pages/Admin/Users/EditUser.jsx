import { useState } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Spinner } from '../../../components/Spinner';
import { useUser } from '../../../hooks/useUser';
import { useUpdateUser } from '../../../hooks/useUpdateUser';
import { UserForm } from './UserForm';

export const EditUser = ({ open, setOpen, id }) => {
  const [errors, setErrors] = useState([]);
  const userQuery = useUser(id);
  const updateUser = useUpdateUser(id);

  const onSubmit = async (values) => {
    const { username, points, is_admin } = values;
    try {
      await updateUser.mutateAsync({ username, points, is_admin });
      setOpen(false);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  if (userQuery.isLoading) {
    return (
      <Modal open={open} setOpen={setOpen}>
        <div className='w-full h-48 flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      </Modal>
    );
  }
  const defaultValues = {
    username: userQuery.data.username,
    points: userQuery.data.points,
    is_admin: userQuery.data.is_admin,
    created_at: userQuery.data.created_at,
    updated_at: userQuery.data.updated_at,
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <UserForm
        defaultValues={defaultValues}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
