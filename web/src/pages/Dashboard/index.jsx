import { Card } from '../../components/Card';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { useAuth } from '../../lib/auth';
import { PredictionTable } from './PredictionTable';
import { usePredictions } from '../../hooks/usePredictions';
import { LinkButton } from '../../components/Button';
import { Spinner } from '../../components/Spinner';

export const Dashboard = () => {
  const { user } = useAuth();
  const predictionsQuery = usePredictions(1, true);

  if (predictionsQuery.isLoading) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <ContentLayout darkBg={true} title={`Hey, ${user.username}!`}>
        <div className='mt-4'>
          <p>
            Welcome to HokiGuessr! Your mission is to predict which players
            score goals in Finnish Elite League (Liiga). To make predictions,
            you will use in-game currency called <b>pucks</b>. You can see your
            balance on top right of the page.
            <br />
            Each player will have a puck ratio (by default 2) so if you bet 20
            pucks on a player, you will win 20 pucks if he scores on the game.
            Game is real-time so as soon as someone scores, you can see your
            balance top up!
          </p>
        </div>
      </ContentLayout>

      <ContentLayout
        darkBg={true}
        title='Your active predictions'
        buttonElement={
          <LinkButton className='py-2' to='games'>
            New Prediction
          </LinkButton>
        }
      >
        <div className='mt-4'>
          {predictionsQuery.data.predictions.filter(
            (prediction) => !prediction.completed_at
          ).length > 0 ? (
            <PredictionTable
              predictions={predictionsQuery.data.predictions.filter(
                (prediction) => !prediction.completed_at
              )}
            />
          ) : (
            <p>You have no active predictions.</p>
          )}
        </div>
      </ContentLayout>
    </>
  );
};
