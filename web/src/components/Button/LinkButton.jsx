import { Link } from 'react-router-dom';
import { classNames } from '../../utils/classnames';
export const LinkButton = ({ children, className, to }) => {
  return (
    <Link
      to={to}
      className={classNames(
        className,
        'inline-block text-center bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100'
      )}
    >
      {children}
    </Link>
  );
};
