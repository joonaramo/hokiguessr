import { useAuth } from '../../../lib/auth';
import { Form } from '../../../components/Form';
import { InputField } from '../../../components/Form';
import { Button } from '../../../components/Button';
import { LinkButton } from '../../../components/Button';

export const LoginForm = ({ onSuccess }) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <Form
      onSubmit={async (values) => {
        await login(values);
        onSuccess();
      }}
    >
      {({ register, formState }) => (
        <>
          <InputField
            type='text'
            label='Username'
            error={formState.errors['username']}
            registration={register('username')}
          />
          <InputField
            type='password'
            label='Password'
            error={formState.errors['password']}
            registration={register('password')}
          />

          {/* <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <Button
              type='submit'
              isLoading={isLoggingIn}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign in
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
