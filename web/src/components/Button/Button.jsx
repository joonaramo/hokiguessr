import { classNames } from '../../utils/classnames';

export const Button = ({ children, type, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        'inline-block text-center bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100'
      )}
    >
      {children}
    </button>
  );
};
