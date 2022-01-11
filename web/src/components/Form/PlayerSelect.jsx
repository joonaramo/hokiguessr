import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { PuckIcon } from '../Layout/PuckIcon';
import { FieldWrapper } from './FieldWrapper';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const formatOptionLabel = (data) => (
  <div className='flex justify-between'>
    <span>{data.label}</span>
    <span>
      {data.pointsRatio} x{' '}
      <PuckIcon className='inline-block text-gray-900 w-4 h-4' />
    </span>
  </div>
);

export const PlayerSelect = ({
  options,
  control,
  error,
  onChange: handleChange,
}) => {
  return (
    <Controller
      control={control}
      name='playerId'
      render={({ field: { onChange, value, ref } }) => (
        <FieldWrapper label='Player' error={error}>
          <Select
            inputRef={ref}
            formatOptionLabel={formatOptionLabel}
            formatGroupLabel={formatGroupLabel}
            options={options}
            value={
              value &&
              options.map((o) =>
                o.options.find((c) => {
                  return value.toString().includes(c.value.toString());
                })
              )
            }
            onChange={(val) => {
              onChange(val.value);
              if (handleChange) handleChange(val.pointsRatio);
            }}
          />
        </FieldWrapper>
      )}
    />
  );
};
