import { LinkButton } from '../../components/Button';
import heroImg from './hero.webp';

export const Landing = () => {
  return (
    <div className='relative bg-gray-900'>
      <div aria-hidden='true' className='absolute inset-0 overflow-hidden'>
        <img
          src={heroImg}
          alt=''
          className='w-full h-full object-center object-cover'
        />
      </div>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gray-900 opacity-50'
      />
      <div className='relative h-screen max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0'>
        <h1 className='text-4xl font-extrabold tracking-tight text-white lg:text-6xl'>
          HokiGuessr
        </h1>
        <p className='mt-4 text-xl text-white'>
          A real-time Finnish Elite League goal scorer guessing application.
        </p>
        <LinkButton to='/login' className='mt-8'>
          Start Guessing
        </LinkButton>
      </div>
    </div>
  );
};
