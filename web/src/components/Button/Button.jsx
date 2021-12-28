export const Button = ({ children, type, className, onClick }) => {
  const classes =
    className +
    ' inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100';
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
