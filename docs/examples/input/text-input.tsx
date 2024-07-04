import { HTextInput } from 'hong-design';
import React from 'react';
import { formatAccount } from '../../../src/utils/number';


const TextInput = () => {
  return <HTextInput value={123312312} format={(value) => formatAccount({
    value,
    dp: 3,
    zeroPadding: true,
    isShowCNY: true
  })} />
};
export default TextInput;
