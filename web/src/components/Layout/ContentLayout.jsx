import { classNames } from '../../utils/classnames';
export const ContentLayout = ({ title, children, darkBg = false }) => {
  return (
    <div
      className={classNames(darkBg ? 'text-white' : 'text-gray-900', 'py-6')}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>{children}</div>
    </div>
  );
};
