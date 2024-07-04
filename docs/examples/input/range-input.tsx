import React, { useState } from "react"
import { HRangeInputValue, HRangInput } from "hong-design"
const RangeInput = () => {
  const [value, setValue] = useState<HRangeInputValue>(undefined)
  return <HRangInput
    value={value}
    inputProps={{
      amount: true,
      negative: true
    }}
    onChange={(e) => {
      setValue(e)
    }}
  />
}

export default RangeInput