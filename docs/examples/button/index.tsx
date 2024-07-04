import { HButton } from 'hong-design';
import React from 'react';

const Button = () => {
  return <HButton onClick={({ triggerLoading }) => {
    console.log('loading3秒');
    triggerLoading()
    setTimeout(() => {
      triggerLoading()
    }, 3000);
  }}>按钮</HButton>
}
export default Button