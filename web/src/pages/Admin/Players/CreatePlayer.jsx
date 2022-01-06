import { Modal } from '../../../components/Modal/Modal';
import { PlayerForm } from './PlayerForm';

export const CreatePlayer = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <PlayerForm
        setOpen={setOpen}
        onSuccess={() => console.log('create player success')}
      />
    </Modal>
  );
};
