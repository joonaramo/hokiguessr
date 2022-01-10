import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Table } from '../../../components/Table';

export const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Table
      rounded={false}
      data={users}
      columns={[
        {
          title: 'Username',
          field: 'username',
        },
        {
          title: 'Points',
          field: 'points',
        },
        {
          title: 'Admin',
          Cell({ entry: { is_admin } }) {
            if (is_admin) {
              return <CheckIcon className='w-6 h-6 text-green-600' />;
            }
            return <XIcon className='w-6 h-6 text-rose-600' />;
          },
        },
        {
          title: 'Actions',
          Cell({ entry: { id } }) {
            return (
              <div className='flex'>
                <button
                  onClick={() => onEdit(id)}
                  className='text-indigo-600 hover:text-indigo-900'
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className='ml-4 text-rose-600 hover:text-rose-900'
                >
                  Delete
                </button>
              </div>
            );
          },
        },
      ]}
    />
  );
};
