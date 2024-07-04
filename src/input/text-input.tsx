import React from 'react';

export interface TextInputProps {
  value?: any;
  format?: (value: any) => any;
}
const TextInput: React.FC<TextInputProps> = ({ value, format, }) => {
  return <div>{format ? format(value) : value}</div>;
};
export default TextInput;
