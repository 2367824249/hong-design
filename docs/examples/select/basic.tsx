import React, { useState } from 'react'
import { HSelect, HSelectServe, HSelectvalue } from 'hong-design'
import mockList from '../../mock/get-list'
const serve: HSelectServe = (p) => {
  return new Promise((resolve) => {
    resolve(mockList(p))
  })
}
const Basic = () => {
  const [value, setValue] = useState<HSelectvalue>([])
  return <HSelect style={{ width: '300px' }} value={value} onChange={(v) => {
    setValue(v ?? [])
  }} serve={serve} popupMatchSelectWidth={500}></HSelect>
}
export default Basic