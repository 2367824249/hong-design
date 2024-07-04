import React, { useState } from "react"
import { HLegalInput } from "hong-design"
const LegalInput = () => {
  const [value, setValue] = useState('')
  return <HLegalInput value={value} reg={/\d/g} onChange={(e) => {
    setValue(e.target.value)
  }} />
}
export default LegalInput