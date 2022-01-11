import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from '../../utils/classnames';

export const Form = ({ onSubmit, children, className, options, schema }) => {
  const methods = useForm({
    ...options,
    resolver: schema && yupResolver(schema),
  });
  return (
    <form
      className={classNames(className, 'space-y-6')}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {children(methods)}
    </form>
  );
};
