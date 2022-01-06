import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import logo from '../../../components/Layout/logo.svg';

export const Login = () => {
  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-200'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-200'>
          Or {''}
          <Link
            to='/signup'
            className='font-medium text-indigo-300 hover:text-indigo-400'
          >
            create a new one!
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <LoginForm onSuccess={() => console.log('login success')} />
        </div>
      </div>
    </div>
  );
};
