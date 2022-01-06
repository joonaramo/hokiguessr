import { Controller } from 'react-hook-form';
import Select from 'react-select';
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

export const PlayerSelect = ({ options, control, error }) => {
  return (
    <Controller
      control={control}
      defaultValue={options[0].options[0]}
      name='playerId'
      render={({ field: { onChange, value, ref } }) => (
        <FieldWrapper label='Player' error={error}>
          <Select
            inputRef={ref}
            formatGroupLabel={formatGroupLabel}
            options={options}
            value={options.map((o) =>
              o.options.find((c) => {
                return value.toString().includes(c.value.toString());
              })
            )}
            onChange={(val) => onChange(val.value)}
          />
        </FieldWrapper>
      )}
    />
  );
};
