import React, { useState } from 'react';
import { Button, ButtonProps } from 'antd';
export type HongButtonClick = (value:{
  e:React.MouseEvent<HTMLElement, MouseEvent>,
  triggerLoading:()=>void
})=>void

interface HongButtonProps extends Omit<ButtonProps, 'onClick'> { 
  onClick?:HongButtonClick
}
const HongButton:React.FC<HongButtonProps> = ({ onClick, ...props }) => {
  const [loading, setLoading] = useState(false);
  const triggerLoading = () => {
    setLoading(_ => !_);
  };
  const handleClick:React.MouseEventHandler<HTMLElement> = (e) => {
    onClick?.({
      e,
      triggerLoading,
    });
  };
  return <Button
    {
      ...props
    }
    loading={loading}
    onClick={handleClick}
  />;
};
export default HongButton;