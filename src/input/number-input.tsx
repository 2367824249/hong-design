import React, { useMemo } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib';
import { formatAccount, formatValidDecimal } from '../utils/number';
import { isEmpty, isObject } from '../utils/type-judg';
export type NumberInputAmountValue = { value: string; formatValue: string }
export type NumberInputValue = NumberInputAmountValue | string
export interface NumberInputProps extends Omit<InputProps, 'onChange' | 'onBlur' | 'value'> {
  dp?: number;
  negative?: boolean;
  amount?: boolean;
  onChange?: (value?: NumberInputValue) => void;
  onBlur?: (value?: NumberInputValue) => void;
  blurFormat?: boolean;
  max?: number;
  min?: number;
  value?: NumberInputValue
}
const NumberInput: React.FC<NumberInputProps> = (props) => {
  const {
    dp = 2, min, value, amount, onChange, max, onBlur, negative = true, blurFormat = false, ...restProps
  } = props;
  const change: InputProps['onChange'] = (e) => {
    e.stopPropagation()
    const ov = e.target.value;
    const fv = formatValidDecimal({
      value: ov,
      dp,
      negative,
    });
    let v: number | string = fv
    if ((max || max === 0) && Number(v) > max) {
      v = formatValidDecimal({
        value: max,
        dp,
        negative,
      });
    }
    if ((min || min === 0) && Number(v) < min) {
      v = formatValidDecimal({
        value: min,
        dp,
        negative,
      });
    }
    if (onChange) {
      let value: NumberInputValue = fv
      if (amount) {
        value = {
          value,
          formatValue: formatAccount({
            value,
            dp,
            zeroPadding: false
          })
        }
      }
      onChange(value);
    }
  };
  const blur: InputProps['onBlur'] = (e) => {
    const v = e.target.value;
    if (isEmpty(v)) {
      return;
    }
    let ov = value
    if ((onChange && blurFormat) || onBlur) {
      if (amount) {
        const ovv = formatValidDecimal({
          value: v,
          dp,
          negative,
        })
        ov = {
          ...(isObject(ov) ? (ov as object) : {}),
          value: ovv,
          formatValue: formatAccount({
            value: ovv,
            dp,
            zeroPadding: true
          })
        }
      }
      if (onBlur) {
        onBlur(ov);
      }
      if (onChange && blurFormat) {
        onChange(ov);
      }
    }
  };
  const bindValue = useMemo(() => {
    const isObj = isObject(value)
    if (amount) {
      return (isObj ? (value as any) : { formatValue: '', value: '' }).formatValue
    }
    return isObj ? '' : value
  }, [value, amount])
  return (
    <Input
      {
      ...restProps
      }
      value={bindValue}
      onChange={change}
      onBlur={blur}
    />
  );
};
export default NumberInput;
