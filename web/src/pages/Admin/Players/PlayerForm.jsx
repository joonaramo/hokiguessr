import { Form, InputField } from '../../../components/Form';
import { useCreateCustomPlayer } from '../../../hooks/useCreateCustomPlayer';
import * as yup from 'yup';
import { useState } from 'react';
import { PlayerSelect } from '../../../components/Form/PlayerSelect';
import { Button } from '../../../components/Button';
import { usePlayers } from '../../../hooks/usePlayers';

const schema = yup
  .object({
    playerId: yup
      .number()
      .typeError('Player is required')
      .required('Player is required'),
    pointsRatio: yup
      .number()
      .positive('Points must be greater than zero')
      .typeError('Points is required')
      .required('Points is required'),
  })
  .required();

export const PlayerForm = ({ onSuccess, setOpen }) => {
  const createPlayer = useCreateCustomPlayer();
  const playersQuery = usePlayers();
  const [errors, setErrors] = useState([]);

  const playerOptions = playersQuery.data.map((player) => {
    return {
      value: player.id,
      label: `${player.lastName} ${player.firstName}`,
    };
  });
  const options = [{ label: 'Players', options: playerOptions }];

  return (
    <Form
      className='w-full'
      onSubmit={async (values) => {
        const { playerId, pointsRatio } = values;
        try {
          await createPlayer.mutateAsync({ playerId, pointsRatio });
          setOpen(false);
          onSuccess();
        } catch (err) {
          setErrors(err.response?.data);
        }
      }}
      schema={schema}
    >
      {({ register, formState, control }) => (
        <>
          <PlayerSelect
            options={options}
            control={control}
            error={formState.errors['playerId']}
            setErrors={setErrors}
          />
          <InputField
            type='number'
            label='Points ratio'
            step='0.01'
            error={
              formState.errors['pointsRatio'] ||
              errors.find((e) => e.field === 'pointsRatio')
            }
            registration={register('pointsRatio', {
              onChange: () => setErrors([]),
            })}
          />
          <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
            <button
              type='submit'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
            >
              Submit
            </button>
            <button
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Form>
  );
};
