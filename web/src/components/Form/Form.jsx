import { useForm } from 'react-hook-form';

export const Form = ({ onSubmit, children, className, options, schema }) => {
  const methods = useForm({ ...options });
  const classes = className + ' space-y-6';
  return (
    <form className={classes} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};
