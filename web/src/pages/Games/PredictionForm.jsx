import { Form } from '../../components/Form';
import { InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { useCreatePrediction } from '../../hooks/useCreatePrediction';
import { useGame } from '../../hooks/useGame';
import { PlayerSelect } from '../../components/Form/PlayerSelect';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup
  .object({
    playerId: yup
      .number()
      .typeError('Player is required')
      .required('Player is required'),
    pointsUsed: yup
      .number()
      .positive('Points must be greater than zero')
      .typeError('Points is required')
      .required('Points is required'),
  })
  .required();

export const PredictionForm = ({
  onSuccess,
  setShowPredictionForm,
  season,
  gameId,
  homeTeamName,
  awayTeamName,
}) => {
  const gameQuery = useGame(season, gameId);
  const createPrediction = useCreatePrediction();
  const [errors, setErrors] = useState([]);

  if (gameQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!gameQuery.data.homeTeamPlayers || !gameQuery.data.awayTeamPlayers) {
    return (
      <div>
        <p>Predicting will be opened on the game day at 13:00</p>
        <Button
          type='submit'
          onClick={() => setShowPredictionForm(false)}
          className='mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
        >
          Cancel
        </Button>
      </div>
    );
  }

  const { homeTeamPlayers, awayTeamPlayers } = gameQuery.data;

  const homeTeamOptions = homeTeamPlayers.map((player) => {
    return {
      value: player.id,
      label: `${player.lastName} ${player.firstName}`,
    };
  });
  const awayTeamOptions = awayTeamPlayers.map((player) => {
    return {
      value: player.id,
      label: `${player.lastName} ${player.firstName}`,
    };
  });
  const options = [
    { label: homeTeamName, options: homeTeamOptions },
    { label: awayTeamName, options: awayTeamOptions },
  ];

  return (
    <Form
      className='w-full'
      onSubmit={async (values) => {
        const { playerId, pointsUsed } = values;
        try {
          await createPrediction.mutateAsync({ playerId, pointsUsed, gameId });
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
            label='Points to use'
            error={
              formState.errors['pointsUsed'] ||
              errors.find((e) => e.field === 'pointsUsed')
            }
            registration={register('pointsUsed', {
              onChange: () => setErrors([]),
            })}
          />
          <div>
            <Button
              type='submit'
              isLoading={false}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Predict
            </Button>
            <Button
              type='submit'
              onClick={() => setShowPredictionForm(false)}
              className='mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
