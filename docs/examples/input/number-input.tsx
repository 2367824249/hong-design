import React, { useState } from "react"
import { HNumberInput, HNumberInputValue } from "hong-design"
const NumberInput = () => {
  const [value, setValue] = useState<HNumberInputValue>({ value: '', formatValue: '' })
  return <HNumberInput amount value={value} dp={2} blurFormat negative={false} onChange={(e) => {
    setValue(e as string)
  }} />
}

export default NumberInput