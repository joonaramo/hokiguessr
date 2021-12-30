import { ContentLayout } from '../../components/Layout/ContentLayout';

export const PredictionTable = ({
  predictions,
  getPlayerName,
  getPlayerTeamName,
}) => {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Player
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Team
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Points used
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Points ratio
                  </th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction, idx) => (
                  <tr
                    key={prediction.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 tracking-wider font-medium'>
                      {getPlayerName(prediction.player_id)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 tracking-wider'>
                      {getPlayerTeamName(prediction.player_id)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {prediction.points_used}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {prediction.points_ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
