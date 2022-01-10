import { Form, InputField, Toggle } from '../../../components/Form';
import * as yup from 'yup';
import { format } from 'date-fns';

const schema = yup
  .object({
    username: yup
      .string()
      .min(3, 'Username must have at least 3 characters')
      .required('Username is required'),
    points: yup
      .number()
      .positive('Points must be greater than zero')
      .typeError('Points is required')
      .required('Points is required'),
  })
  .required();

export const UserForm = ({
  onSubmit,
  setOpen,
  defaultValues,
  errors,
  setErrors,
}) => {
  return (
    <Form className='w-full' onSubmit={onSubmit} schema={schema}>
      {({ register, formState, control }) => (
        <>
          <InputField
            defaultValue={defaultValues?.username}
            type='text'
            label='Username'
            error={
              formState.errors['username'] ||
              errors.find((e) => e.field === 'username')
            }
            registration={register('username', {
              onChange: () => setErrors([]),
            })}
          />
          <InputField
            defaultValue={defaultValues?.points}
            type='number'
            label='Points'
            error={
              formState.errors['points'] ||
              errors.find((e) => e.field === 'points')
            }
            registration={register('points', {
              onChange: () => setErrors([]),
            })}
          />
          <Toggle
            name='is_admin'
            control={control}
            defaultValue={defaultValues?.is_admin}
          />
          <InputField
            defaultValue={format(
              new Date(defaultValues?.created_at),
              'dd.MM.yyyy - HH:mm'
            )}
            type='text'
            label='Created at'
            disabled={true}
          />
          <InputField
            defaultValue={format(
              new Date(defaultValues?.updated_at),
              'dd.MM.yyyy - HH:mm'
            )}
            type='text'
            label='Updated at'
            disabled={true}
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
