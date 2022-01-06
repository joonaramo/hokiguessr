import { classNames } from '../../utils/classnames';

export const Table = ({ data, columns, rounded = true }) => {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div
            className={classNames(
              rounded ? 'sm:rounded-lg' : 'sm:rounded-t-lg',
              'shadow overflow-hidden sm:rounded-t-lg'
            )}
          >
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.title + index}
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr
                    key={entry?.id || entryIndex}
                    className={
                      entryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    }
                  >
                    {columns.map(({ Cell, field, title }, columnIndex) => {
                      return (
                        <td
                          key={title + columnIndex}
                          className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'
                        >
                          {Cell ? <Cell entry={entry} /> : entry[field]}
                        </td>
                      );
                    })}
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
