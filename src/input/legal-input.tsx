import React, { } from 'react';
import { Input, InputProps } from 'antd';
import { reverseReplace } from '../utils/text';

export interface LegalInputProps extends InputProps {
  reg?: RegExp | false
}
const LegalInput: React.FC<LegalInputProps> = ({ reg = /\d/g, onChange, ...rest }) => {
  return <Input
    onChange={(e) => {
      if (reg) {
        const v = e.target.value;
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: reverseReplace({
              ov: v,
              reg
            }),
          },
        });
      }else{
        onChange?.(e)
      }
    }}
    {...rest}
  ></Input>;
};
export default LegalInput;