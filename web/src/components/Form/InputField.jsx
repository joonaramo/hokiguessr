import { classNames } from '../../utils/classnames';
import { FieldWrapper } from './FieldWrapper';
export const InputField = ({
  type = 'text',
  label,
  className,
  registration,
  onChange,
  error,
}) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        onChange={onChange}
        className={classNames(
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-400'
            : '',
          className,
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
