import React, { useState } from 'react'
import { HSelect, HSelectServe, HSelectvalue } from 'hong-design'
import mockList from '../../mock/get-list'
const serve: HSelectServe = (p) => {
  return new Promise((resolve) => {
    resolve(mockList(p))
  })
}
const Multiple = () => {
  const [value, setValue] = useState<HSelectvalue>([])
  return <HSelect
    serve={serve}
    style={{ width: '300px' }}
    value={value}
    onChange={(e) => {
      setValue(e ?? [])
    }}
    popupMatchSelectWidth={500}
    mode={8}
  ></HSelect>
}
export default Multiple