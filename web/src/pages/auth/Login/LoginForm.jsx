import { useAuth } from '../../../lib/auth';
import { Form } from '../../../components/Form';
import { InputField } from '../../../components/Form';
import { Button } from '../../../components/Button';
import * as yup from 'yup';

export const LoginForm = ({ onSuccess }) => {
  const { login, isLoggingIn } = useAuth();

  const schema = yup
    .object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    })
    .required();

  return (
    <Form
      onSubmit={async (values) => {
        try {
          await login(values);
          onSuccess();
        } catch (err) {
          console.error(err);
        }
      }}
      schema={schema}
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
