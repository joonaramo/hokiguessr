import { useState } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Spinner } from '../../../components/Spinner';
import { useCustomPlayer } from '../../../hooks/useCustomPlayer';
import { useUpdateCustomPlayer } from '../../../hooks/useUpdateCustomPlayer';
import { PlayerForm } from './PlayerForm';

export const EditPlayer = ({ open, setOpen, id, playerName }) => {
  const [errors, setErrors] = useState([]);
  const playerQuery = useCustomPlayer(id);
  const updatePlayer = useUpdateCustomPlayer(id);

  const onSubmit = async (values) => {
    const { pointsRatio } = values;
    try {
      await updatePlayer.mutateAsync({ pointsRatio });
      setOpen(false);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  if (playerQuery.isLoading) {
    return (
      <Modal open={open} setOpen={setOpen}>
        <div className='w-full h-48 flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      </Modal>
    );
  }
  const defaultValues = {
    playerName,
    pointsRatio: playerQuery.data.points_ratio,
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <PlayerForm
        defaultValues={defaultValues}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
