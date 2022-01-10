import { Controller } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';
import { Switch } from '@headlessui/react';
import { classNames } from '../../utils/classnames';

export const Toggle = ({ control, defaultValue, name }) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FieldWrapper label='Admin rights'>
          <Switch
            checked={value}
            onChange={onChange}
            className={classNames(
              value ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span
              aria-hidden='true'
              className={classNames(
                value ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
        </FieldWrapper>
      )}
    />
  );
};
