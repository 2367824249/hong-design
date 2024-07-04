import React, {
  useMemo, useRef, useState
} from 'react';
import { Input, Select, Table } from 'antd';
import { SelectProps } from 'antd/lib';
import { ColumnProps } from 'antd/lib/table';
import useProSelectAntdTable from '../hooks/useProSelectAntdTable';

export type ProSelectServe = (params: {
  current: number; pageSize: number; name: string
}) => Promise<{ list: any[]; total: number }>;
export type ProSelectValue = { label: any; value: any;[key: string]: any }[] | undefined
export interface ProSelectProps extends Omit<SelectProps, 'value' | 'mode' | 'onChange' | 'maxCount'> {
  bindKey?: { labelKey: string; valueKey: string },
  /** 返回表格项全部数据 */
  backRow?: boolean;
  columns?: ColumnProps<any>[];
  serve: ProSelectServe;
  mode?: number | SelectProps['mode'];
  searchPlaceholder?: string;
  value?: ProSelectValue
  onChange?: (value?: ProSelectValue) => void;
  popupClassName?: string
}
export type Key = string | number
const ProSelect: React.FC<ProSelectProps> = ({
  mode,
  backRow,
  value: outerValue,
  onChange,
  bindKey = { labelKey: 'name', valueKey: 'id', },
  serve,
  searchPlaceholder = '请输入关键词搜索',
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    }
  ],
  popupClassName,
  ...restProps
}) => {
  const firstOpen = useRef(false)
  // 表格的操作项
  const [open, setOpen] = useState(false);
  const [cacheVal, setCacheVal] = useState('');
  const {
    tableProps: {
      pagination,
      ...tableProps
    },
    search: {
      submit,
    },
  } = useProSelectAntdTable(({ current, pageSize, keyword, }) => {
    return serve({ current, pageSize, name: keyword as string, });
  }, {
    keyword: cacheVal,
  });
  const [iptValue, setIptValue] = useState('');
  const max = useMemo(() => {
    if (typeof mode === 'number') {
      return mode;
    }
    return 0;
  }, [mode]);
  const multiple = useMemo(() => {
    if (typeof mode === 'number') return true;
    return mode && ['multiple', 'tags'].includes(mode);
  }, [mode]);
  const value = useMemo(() => {
    let v: Key | undefined | Key[] = undefined;
    let options: ProSelectValue = [];
    const isArr = Array.isArray(outerValue)
    if (multiple) {
      v = isArr ? outerValue.map((row) => row.value) : []
    } else {
      v = isArr ? outerValue[0]?.value : undefined
    }
    if (isArr) {
      options = outerValue;
    }
    return {
      value: v,
      options,
      selectedKeys: options.map((row) => row?.value),
    };
  }, [outerValue, multiple]);
  const onRowChange = (_rowKey: any[], rows: any[]) => {
    const currentPageDataIds = tableProps.dataSource.map(row => row[bindKey.valueKey]);
    const nonCurrentPageData = (Array.isArray(outerValue) ? outerValue : []).filter(row => !currentPageDataIds.includes(row.value));
    const values = rows.map((row) => {
      let otherObj = {};
      if (backRow) {
        otherObj = { ...row, };
      }
      return {
        value: row[bindKey.valueKey],
        label: row[bindKey.labelKey],
        ...otherObj,
      };
    });
    if (onChange) {
      const mergeValues = [...nonCurrentPageData, ...values];
      if (max && mergeValues.length > max) {
        return;
      }
      const mergeLen = mergeValues.length
      onChange(mergeLen ? mergeValues : undefined);
    }
    if (!multiple) {
      setOpen(false);
    }
  };
  const defaultRender = () => {
    return (
      <div className={popupClassName}>
        <div className='h-search' style={{ padding: '12px 0', maxWidth: '300px', }}>
          <Input.Search
            value={iptValue}
            onChange={(_) => { setIptValue(_.target.value); }}
            onSearch={(_) => {
              setCacheVal(_);
              submit(_);
            }}
            placeholder={searchPlaceholder}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                e.stopPropagation();
              }
            }}
          />
        </div>
        <Table
          size="small"
          className='h-table'
          rowKey={bindKey.valueKey}
          columns={columns}
          scroll={{ y: 200, }}
          rowSelection={{
            fixed: true,
            type: multiple ? 'checkbox' : 'radio',
            selectedRowKeys: value.selectedKeys,
            hideSelectAll: !!max,
            onChange: onRowChange,
          }}
          {
          ...tableProps
          }
          pagination={{
            ...pagination,
            showSizeChanger: false,
            simple: true,
          }}
        />
      </div>
    );
  };
  return (
    <Select
      placeholder="请选择"
      {...restProps}
      allowClear
      options={value.options}
      value={value.value}
      open={open}
      showSearch={false}
      onChange={(_e, rows) => {
        if (Array.isArray(rows) && rows.length) {
          onChange?.(rows as any);
        } else {
          onChange?.(undefined)
        }
      }}
      onDropdownVisibleChange={(b) => {
        setOpen(b);
        if (b && !firstOpen.current) {
          submit()
          firstOpen.current = true
        }
      }}
      mode={max ? 'multiple' : mode as any}
      onClear={() => {
        if (onChange) {
          onChange(undefined);
        }
      }}
      dropdownRender={defaultRender}
    />
  );
};
export default ProSelect;
