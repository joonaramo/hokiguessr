import { Button } from '../../components/Button';
import { classNames } from '../../utils/classnames';

export const Pagination = ({
  offset,
  limit,
  total,
  page,
  setPage,
  hasMore,
}) => {
  return (
    <nav
      className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
      aria-label='Pagination'
    >
      <div className='hidden sm:block'>
        <p className='text-sm text-gray-700'>
          Showing <span className='font-medium'>{offset}</span> to{' '}
          <span className='font-medium'>
            {!hasMore ? total : offset + limit - 1}
          </span>{' '}
          of <span className='font-medium'>{total}</span> results
        </p>
      </div>
      <div className='flex-1 flex justify-between sm:justify-end'>
        <button
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
          className={classNames(
            page === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50',
            'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white '
          )}
        >
          Previous
        </button>
        <button
          disabled={!hasMore}
          onClick={() => setPage((page) => page + 1)}
          className={classNames(
            hasMore ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400',
            'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white'
          )}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
