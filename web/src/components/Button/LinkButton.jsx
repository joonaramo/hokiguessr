import { Link } from 'react-router-dom';
export const LinkButton = ({ children, className, to }) => {
  const classes =
    className +
    ' inline-block text-center bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100';
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
};
