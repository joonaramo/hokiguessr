import { FieldWrapper } from './FieldWrapper';
export const InputField = ({
  type = 'text',
  label,
  className,
  registration,
  error,
}) => {
  const classes =
    className +
    ' appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type} className={classes} {...registration} />
    </FieldWrapper>
  );
};
