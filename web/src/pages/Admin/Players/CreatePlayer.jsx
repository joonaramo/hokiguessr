import { useState } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { useCreateCustomPlayer } from '../../../hooks/useCreateCustomPlayer';
import { PlayerForm } from './PlayerForm';

export const CreatePlayer = ({ open, setOpen }) => {
  const [errors, setErrors] = useState([]);
  const createPlayer = useCreateCustomPlayer();

  const onSubmit = async (values) => {
    const { playerId, pointsRatio } = values;
    try {
      await createPlayer.mutateAsync({ playerId, pointsRatio });
      setOpen(false);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <PlayerForm
        setOpen={setOpen}
        onSubmit={onSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </Modal>
  );
};
