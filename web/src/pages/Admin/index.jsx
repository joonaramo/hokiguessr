import { Card } from '../../components/Card';
import { ContentLayout } from '../../components/Layout/ContentLayout';
import { Spinner } from '../../components/Spinner';
import { useAllPredictions } from '../../hooks/useAllPredictions';
import { useCustomPlayers } from '../../hooks/useCustomPlayers';
import { useUsers } from '../../hooks/useUsers';

function isToday(date) {
  const today = new Date();
  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  );
}

export const AdminDashboard = () => {
  const usersQuery = useUsers();
  const playersQuery = useCustomPlayers();
  const predictionsQuery = useAllPredictions();

  if (
    usersQuery.isLoading ||
    playersQuery.isLoading ||
    predictionsQuery.isLoading
  ) {
    return (
      <div className='w-full h-48 flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  return (
    <ContentLayout darkBg={true} title='Admin Panel'>
      <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='flex flex-col text-center justify-center p-6'>
          <h2 className='text-xl'>{usersQuery.data.paging.total}</h2>
          <h3>Users</h3>
        </Card>
        <Card className='flex flex-col text-center justify-center p-6'>
          <h2 className='text-xl'>{playersQuery.data.paging.total}</h2>
          <h3>Added players</h3>
        </Card>
        <Card className='flex flex-col text-center justify-center p-6'>
          <h2 className='text-xl'>{predictionsQuery.data.paging.total}</h2>
          <h3>Total predictions</h3>
        </Card>
        <Card className='flex flex-col text-center justify-center p-6'>
          <h2 className='text-xl'>
            {
              predictionsQuery.data.predictions.filter((p) =>
                isToday(p.created_at)
              ).length
            }
          </h2>
          <h3>Predictions today</h3>
        </Card>
      </div>
    </ContentLayout>
  );
};
