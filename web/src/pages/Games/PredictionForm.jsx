import { Form } from '../../components/Form';
import { InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { useCreatePrediction } from '../../hooks/useCreatePrediction';
import { useGame } from '../../hooks/useGame';
import { PlayerSelect } from './PlayerSelect';

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

  return (
    <Form
      className='w-full'
      onSubmit={async (values) => {
        const { playerId, pointsUsed } = values;
        await createPrediction.mutateAsync({ playerId, pointsUsed, gameId });
        onSuccess();
      }}
    >
      {({ register, formState, control }) => (
        <>
          <PlayerSelect
            homeTeamPlayers={gameQuery.data.homeTeamPlayers}
            awayTeamPlayers={gameQuery.data.awayTeamPlayers}
            homeTeamName={homeTeamName}
            awayTeamName={awayTeamName}
            control={control}
          />
          <InputField
            type='number'
            label='Points'
            error={formState.errors['pointsUsed']}
            registration={register('pointsUsed')}
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
