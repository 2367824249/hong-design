import React, { useMemo, useRef, useState } from 'react';
import { FormProps } from 'antd/es/form';
import {
  Row, Col, Form
} from 'antd';
import FormItem from './form-item'
import GridLayout from './grid-layout';
import './index.scss'
import { HButton, HButtonClick } from 'hong-design';
import { HongButtonProps } from 'src/button';
export interface SearchFormProps extends FormProps {
  children?: React.ReactNode;
  submit?: HButtonClick;
  reset?: HButtonClick;
  otherAction?: React.ReactNode;
  count?: number;
  submitProps?: HongButtonProps;
  resetProps?: HongButtonProps;
  formItemHeight?: number;
}
const SearchForm: React.FC<SearchFormProps> = ({
  children, otherAction, reset, submit, count = 4,
  submitProps = {},
  resetProps = {},
  formItemHeight = 56,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const childrenCount = React.Children.count(children);

  const childrenCopy = useMemo(() => {
    const isNeedSpace = !(childrenCount % count);
    const arr = React.Children.map(children, (child, idx) => {
      const multipleItem = (idx + 1) % count === 0
      return React.isValidElement(child) ? React.cloneElement(child as any, multipleItem ? {
        className: 'multiple-item'
      } : {}) : child
    });
    if (isNeedSpace) {
      arr?.push(<Form.Item key="1" />);
    }
    return arr;
  }, [children, count]);
  const showExpandBtn = childrenCount >= count;
  const contentRef = useRef<HTMLDivElement>(null!);
  const handleExpand = () => {
    if (open) {
      contentRef.current.style.height = `${formItemHeight}px`
    } else {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
    }
    setOpen((_) => !_);
  };
  const span = Math.ceil(24 / count);
  return (
    <Form {...rest}>
      <Row
        ref={contentRef}
        style={{
          transition: 'height 0.3s',
          overflowY: 'hidden',
          position: 'relative',
          height: `${formItemHeight}px`,
        }}
      >
        <Col span={24}>
          <GridLayout count={count} className={`${open ? '' : 'h-sform-collapse'}`}>
            {
              childrenCopy
            }
          </GridLayout>
        </Col>
        <Row
          style={{
            position: 'absolute', width: '100%', bottom: 0, pointerEvents: 'none', zIndex: 2,
          }}
        >
          <Col
            offset={24 - span}
            span={span}
            style={{
              pointerEvents: 'all',
            }}
          >
            <Form.Item
              label=" "
              colon={false}
            >
              <div
                style={{ textAlign: 'right', whiteSpace: 'nowrap', }}
              >
                {showExpandBtn ? (
                  <HButton
                    type="link"
                    icon={(
                      <span
                        style={{
                          display: 'inline-flex',
                          transform: open
                            ? 'rotate(270deg)' : 'rotate(90deg)',
                          transition: 'all 0.3s',
                        }}
                      >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path></svg>
                      </span>
                    )}
                    onClick={handleExpand}
                  >
                    {open ? '收起' : '展开'}
                  </HButton>
                ) : null}
                <HButton
                  style={{ marginRight: '12px', }}
                  onClick={reset}
                  {
                  ...submitProps
                  }
                >
                  重置
                </HButton>
                <HButton
                  type="primary"
                  onClick={submit}
                  {
                  ...resetProps
                  }
                >
                  查询
                </HButton>
                {
                  otherAction
                }
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};
type InternalFormType = typeof SearchForm;
type CompoundedComponent = InternalFormType & {
  Item: typeof FormItem;
  useForm: typeof Form.useForm
};
const SForm = SearchForm as CompoundedComponent;
SForm.Item = FormItem
SForm.useForm = Form.useForm;
export default SForm;
