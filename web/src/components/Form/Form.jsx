import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const Form = ({ onSubmit, children, className, options, schema }) => {
  const methods = useForm({
    ...options,
    resolver: schema && yupResolver(schema),
  });
  const classes = className + ' space-y-6';
  return (
    <form className={classes} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};
