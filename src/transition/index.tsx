import React, { useEffect, useRef, useState } from 'react';
import { } from 'antd';
enum Status {
  beforeEnter = "BEFORE_ENTER",
  enter = 'ENTER',
  afterEnter = 'AFTER_ENTER',
  beforeLeave = 'BEFORE_LEAVE',
  leave = 'LEAVE',
  afterLeave = 'AFTER_LEAVE',
  unmounted = 'UNMOUNTED'
}
let doing = false
const classNameList = ['enter-from', 'enter-active', 'enter-to', 'leave-from', 'leave-active', 'leave-to']
interface TransitionProps {
  // childrenRef: React.MutableRefObject<HTMLDivElement>;
  show: boolean;
  children: React.ReactElement
  duration?: number | { enter: number, leave: number }
};
const Transition: React.FC<TransitionProps> = ({
  children,
  // childrenRef,
  duration = 1000,
  show
}) => {
  const getDuration = () => {
    if (typeof duration === 'number') {
      return {
        enter: duration,
        leave: duration,
      }
    }
    return duration
  }
  const onTransitionEnd = (time: number,
    startCb: () => void,
    activeCb: () => void,
    endCb: () => void,
    done?: () => void
  ) => {
    if (doing) {
      return
    }
    doing = true
    startCb()
    requestAnimationFrame(() => {
      activeCb()
      setTimeout(() => {
        endCb()
        requestAnimationFrame(() => {
          done?.()
          doing = false
        })
      }, time)
    });
  }
  const [status, setStatus] = useState<Status>(Status.unmounted)
  const init = useRef(false)
  const childrenRef = useRef<any>(null!)
  const addClassName = (cls?: string) => {
    childrenRef.current?.classList?.remove(...classNameList)
    if (cls) {
      childrenRef.current?.classList?.add(cls)
    }
  }
  useEffect(() => {
    const { enter, leave } = getDuration()
    if (!init.current) {
      init.current = true
      return
    }
    if (show) {
      onTransitionEnd(enter,
        () => {
          setStatus(Status.beforeEnter)
          addClassName('enter-from')
        },
        () => {
          setStatus(Status.enter)
          addClassName('enter-active')
        },
        () => {
          setStatus(Status.afterEnter)
          addClassName('enter-to')
        },
      )
    } else {
      onTransitionEnd(leave,
        () => {
          setStatus(Status.beforeLeave)
          addClassName('leave-from')
        },
        () => {
          setStatus(Status.leave)
          addClassName('leave-active')
        },
        () => {
          setStatus(Status.afterLeave)
          addClassName('leave-to')
        },
        () => {
          setStatus(Status.unmounted)
        }
      )
    }
  }, [show]);
  if (status === Status.unmounted) {
    return null
  }
  return React.cloneElement(children, {
    ref: childrenRef
  })
}
export default Transition