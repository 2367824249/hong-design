import React, { } from 'react';
import { Form, FormItemProps } from 'antd';

interface SearchFormItemProps extends FormItemProps {
  children?:React.ReactElement
}
const SearchFormItem:React.FC<SearchFormItemProps> = ({ children, ...rest }) => {
  return (
    <Form.Item {...rest}>
      {
        children
          ? React.cloneElement(children, {
            className: 'h-sform-ipt_control',
          }) : null
      }
    </Form.Item>
  );
};
export default SearchFormItem;
