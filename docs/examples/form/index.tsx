import React from 'react';
import { HSearchForm, HLegalInput } from 'hong-design';

const SearchForm = () => {
  const [form] = HSearchForm.useForm()
  const submit = () => {
    const values = form.getFieldsValue()
    console.log(values);
  }
  const reset = () => {
    form.resetFields()
  }
  return <HSearchForm
    form={form} submit={submit}
    wrapperCol={{ span: 12 }}
    reset={reset}
  >
    <HSearchForm.Item label="123" name='22'>
      <HLegalInput />
    </HSearchForm.Item>
    <HSearchForm.Item label="12223" name='333'>
      <HLegalInput />
    </HSearchForm.Item>
    <HSearchForm.Item label="1233" name='1'>
      <HLegalInput />
    </HSearchForm.Item>
    <HSearchForm.Item label="1234" name='2'>
      <HLegalInput />
    </HSearchForm.Item>
    <HSearchForm.Item label="11223" name='3'>
      <HLegalInput />
    </HSearchForm.Item>
  </HSearchForm>
}
export default SearchForm;