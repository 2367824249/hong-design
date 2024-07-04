import React, { useMemo } from 'react';
import { isObject } from '../utils/type-judg';
import { HNumberInput, HNumberInputProps, HNumberInputValue } from 'hong-design';
import { Button } from 'antd';
export type RangeInputValue = {
  start: HNumberInputValue; end: HNumberInputValue
} | undefined
export interface RangeInputProps {
  className?: string;
  placeholder?: [string, string]
  inputProps?: HNumberInputProps;
  value?: RangeInputValue;
  onChange?: (values: RangeInputValue) => void
}
const RangeIpt: React.FC<RangeInputProps> = ({ placeholder, value: outerValue, onChange: outerChange, inputProps, ...rest }) => {
  const [sPlaceholder, ePlaceholder] = useMemo(() => {
    if (placeholder?.length === 2) {
      return placeholder;
    }
    return ['最低', '最高'];
  }, [placeholder]);
  const value = useMemo(() => {
    if (isObject(outerValue) && outerValue) {
      return outerValue;
    }
    return {
      start: '',
      end: '',
    };
  }, [outerValue]);
  const { start, end, } = value;
  const onChange = (type: 'start' | 'end', e?: HNumberInputValue) => {
    const values = {
      ...value,
      [type]: e,
    };
    outerChange?.(values);
  };
  const onTran = () => {
    if (outerValue) {
      outerChange?.({
        start: end,
        end: start
      })
    }
  }
  return <div style={{ display: 'flex', alignItems: 'center' }} {...rest}>
    <HNumberInput
      style={{ flex: 1 }}
      {...inputProps}
      value={start}
      onChange={(e) => onChange('start', e,)}
      placeholder={sPlaceholder}
    />
    <Button className='h-splitter' type='text' onClick={onTran}>
      <svg viewBox="64 64 896 896" focusable="false" data-icon="swap" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
    </Button>
    <HNumberInput
      style={{ flex: 1 }}
      {...inputProps}
      value={end}
      onChange={(e) => onChange('end', e)}
      placeholder={ePlaceholder}
    ></HNumberInput>
  </div>;
};
export default RangeIpt;