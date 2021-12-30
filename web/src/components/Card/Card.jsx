export const Card = ({ as, children, className }) => {
  const classes =
    className +
    ' relative bg-white text-gray-900 rounded-lg shadow divide-y divide-gray-200';
  const Tag = as || 'div';
  return <Tag className={classes}>{children}</Tag>;
};
