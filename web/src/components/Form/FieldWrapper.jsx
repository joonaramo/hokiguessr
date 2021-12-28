export const FieldWrapper = ({ label, className, error, children }) => {
  const classes = className + ' block text-sm font-medium text-gray-700';
  return (
    <div>
      <label className={classes}>
        {label}
        <div className='mt-1'>{children}</div>
      </label>
      {error?.message && (
        <div
          role='alert'
          aria-label={error.message}
          className='text-sm font-semibold text-red-500'
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
