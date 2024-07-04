import { TableProps } from 'antd/lib';
import { useState } from 'react';

type ServeParams = { current: number; pageSize: number; keyword?: string };
export type Serve<Row = unknown> = (params: ServeParams) => Promise<{ list: Row[], total: number }>;

type Params = { keyword?: any };

const defaultPage = 1;
const defaultPageSize = 10;

const useProSelectAntdTable = <Row = any>(serve: Serve<Row>,
  params?: Params) => {
  const { keyword } = params || {};
  const [current, setCurrent] = useState(defaultPage);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [dataSource, setDataSource] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const getList = (p: ServeParams) => {
    setLoading(true);
    serve({
      ...p,
    }).then(({ list, total: serveTotal, }) => {
      if (p.current > 1 && list.length === 0) {
        const c = p.current - 1;
        setCurrent(c);
        getList({
          ...p,
          current: c,
        });
      } else {
        setDataSource(list);
        setTotal(serveTotal);
      }
    })
      .finally(() => {
        setLoading(false);
      });
  };
  const resetPagination = () => {
    setCurrent(defaultPage);
    setPageSize(defaultPageSize);
  };
  const submit = (k?: string) => {
    resetPagination();
    getList({
      current: defaultPage,
      pageSize: defaultPageSize,
      keyword: k,
    });
  };
  const onChange: TableProps['onChange'] = ({ current: c = defaultPage, pageSize: p = defaultPageSize, }) => {
    setCurrent(c);
    setPageSize(p);
    getList({
      current: c,
      pageSize: p,
      keyword,
    });
  };
  return {
    tableProps: {
      pagination: {
        pageSize,
        current,
        total,
      },
      dataSource,
      loading,
      onChange,
    },
    search: {
      submit,
    },
  };
};
export default useProSelectAntdTable;
