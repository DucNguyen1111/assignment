import { Input } from 'antd';
import { ReactNode } from 'react';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from 'react-hook-form';
import { IObject } from '../../shared/utils/constant';
import clsxm from '../../shared/lib/clsxm';
import ErrorMessage from './ErrorMessage';

interface InputTextProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  form: UseFormReturn<IObject>; // Return from `useForm` hook of react-hook-form package
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  handleChange?: (value: string) => void;
  handleBlur?: (e: string) => void;
  handlePressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  type?: string;
  regex?: RegExp;
  flag?: number | null;
  messageBlur?: string;
  suffix?: ReactNode;
  showLabel?: boolean;
  customColorText?: string;
  customFontWeight?: string;
}

/**
 * Form field group with validation
 */
export const onChangeSelect = (
  e: string,
  field: ControllerRenderProps<Record<string, number | string | null>, string>,
  type?: string,
  regex?: RegExp,
  flag?: number | null,
  handleChange?: (value: string) => void
) => {
  field.onChange(e);
  // Call the handleChange function if available
  if (typeof handleChange === 'function') handleChange(e);
};
export const renderErrorMessage = (
  form: UseFormReturn,
  errorMessage: string | undefined,
  name: string
) => {
  return (form?.formState?.errors?.[name]?.message as string) || errorMessage;
};
export default function InputText({
  form,
  name,
  label,
  placeholder,
  required,
  className,
  handleChange,
  handleBlur,
  handlePressEnter,
  errorMsg,
  type,
  regex,
  flag,
  messageBlur,
  suffix,
  showLabel = true,
  customColorText,
  customFontWeight
}: Readonly<InputTextProps>) {
  const errorMessage = renderErrorMessage(form, errorMsg, name);
  const status = errorMessage ? 'error' : undefined;
  // The function displays an error when the user focusout with an invalid value
  const onBlur = (e: number | string) => {
    // Check if the value of e is falsy
    if (!e) {
      // Set a custom error message for the capacity field
      form.setError('capacity', {
        type: 'custom',
        message: messageBlur,
      });
    }
    if (handleBlur) handleBlur(e as string);
  };

  const onPressEnter: React.KeyboardEventHandler<HTMLInputElement> = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (handlePressEnter) handlePressEnter(e);
  };

  return (
    <div className='input-text-group relative flex flex-col'>
      {showLabel && (
        <label
          className={clsxm(
            'input-text-group__label mb-[6px] text-sm font-semibold leading-[21px] text-[#1B1B1B]',
            className
          )}
        >
          {label}{' '}
          {required ? (
            <span
              data-testid='icon-required'
              className='ml-1 text-xs font-semibold text-[#CE092F]'
            >
              *
            </span>
          ) : (
            ''
          )}
        </label>
      )}
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            data-testid={name}
            status={status}
            suffix={suffix}
            size='large'
            placeholder={placeholder}
            onBlur={(e) => onBlur(e.target.value)}
            onPressEnter={onPressEnter}
            styles={{ input: { color: customColorText, fontWeight: customFontWeight } }}
            className={clsxm(
              'input-text-group__body h-10 rounded-[1000px] border border-[#474747] text-sm text-[#1B1B1B] hover:border-[#474747] focus:border-[#474747]',
              className
            )}
            onChange={(e) =>
              onChangeSelect(
                e.target.value,
                field,
                type,
                regex,
                flag,
                handleChange
              )
            }
          />
        )}
      />
      <ErrorMessage
        message={errorMessage}
        className='absolute bottom-0 translate-y-[100%] tracking-[-1px]'
      />
    </div>
  );
}
