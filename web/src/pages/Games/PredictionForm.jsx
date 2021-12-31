import { Form } from '../../components/Form';
import { InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import predictionService from '../../services/prediction';
import { useNotificationStore } from '../../stores/notification';
import { Spinner } from '../../components/Spinner';
import liigaService from '../../services/liiga';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export const PredictionForm = ({
  onSuccess,
  setShowPredictionForm,
  season,
  gameId,
  homeTeamName,
  awayTeamName,
}) => {
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['liigaGame', { season, gameId }], () =>
    liigaService.getGame(season, gameId)
  );
  const mutation = useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries('predictions');

      const previousPredictions = queryClient.getQueryData('predictions');

      return { previousPredictions };
    },
    onSuccess: (data) => {
      const previousPredictions = queryClient.getQueryData('predictions');

      queryClient.setQueryData('predictions', [
        ...(previousPredictions || []),
        data,
      ]);
      addNotification({
        type: 'success',
        title: 'Prediction created',
      });
    },
    mutationFn: predictionService.createPrediction,
  });
  if (isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  if (!data.homeTeamPlayers || !data.awayTeamPlayers) {
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
  const homeTeamOptions = data.homeTeamPlayers.map((player) => {
    return {
      value: player.id,
      label: `${player.lastName} ${player.firstName}`,
    };
  });
  const awayTeamOptions = data.awayTeamPlayers.map((player) => {
    return {
      value: player.id,
      label: `${player.lastName} ${player.firstName}`,
    };
  });
  const groupedOptions = [
    {
      label: homeTeamName,
      options: homeTeamOptions,
    },
    {
      label: awayTeamName,
      options: awayTeamOptions,
    },
  ];
  return (
    <Form
      className='w-full'
      onSubmit={async (values) => {
        const { playerId, pointsUsed } = values;
        await mutation.mutateAsync({ playerId, pointsUsed, gameId });
        onSuccess();
      }}
    >
      {({ register, formState, control }) => (
        <>
          <Controller
            control={control}
            defaultValue={homeTeamOptions[0]}
            name='playerId'
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                formatGroupLabel={formatGroupLabel}
                options={groupedOptions}
                value={groupedOptions.map((o) =>
                  o.options.find((c) => {
                    return value.toString().includes(c.value.toString());
                  })
                )}
                onChange={(val) => onChange(val.value)}
              />
            )}
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
