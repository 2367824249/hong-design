import React, { useState } from 'react';
import { } from 'antd';
import { Transition } from 'hong-design';
import './index.css'
const BaseTransition = () => {
  const [show, setShow] = useState(false)
  return <div>
    <button type='button' role='button' onClick={() => {
      setShow((state) => !state)
    }}>点击</button>
    <Transition show={show} >
      <div >我显示了</div>
    </Transition>
  </div>
}
export default BaseTransition