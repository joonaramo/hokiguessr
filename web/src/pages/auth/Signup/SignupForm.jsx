import { useState } from 'react';
import { useAuth } from '../../../lib/auth';
import { Form } from '../../../components/Form';
import { InputField } from '../../../components/Form';
import { Button } from '../../../components/Button';
import * as yup from 'yup';

export const SignupForm = ({ onSuccess }) => {
  const { register, isRegistering } = useAuth();
  const [errors, setErrors] = useState([]);

  const schema = yup
    .object({
      username: yup.string().min(3).max(60).required('Username is required'),
      password: yup.string().min(8).max(60).required('Password is required'),
      confirmPassword: yup
        .string()
        .required('Password  must be confirmed')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    })
    .required();

  return (
    <Form
      onSubmit={async (values) => {
        try {
          const { username, password } = values;
          await register({ username, password });
          onSuccess();
        } catch (err) {
          setErrors(err.response?.data);
        }
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputField
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
            type='password'
            label='Password'
            error={formState.errors['password']}
            registration={register('password')}
          />
          <InputField
            type='password'
            label='Confirm Password'
            error={formState.errors['confirmPassword']}
            registration={register('confirmPassword')}
          />

          <div>
            <Button
              type='submit'
              isLoading={isRegistering}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign up
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
