function mockListData({ current, pageSize, name }: { current: number; pageSize: number; name: string }) {
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const list = [];
  for (let i = startIndex; i < endIndex; i++) {
    list.push({
      id: i + 1,
      name: `${name || '名称'}${i + 1}`
    });
  }
  return list;
}

const mockList = (p: { current: number; pageSize: number; name: string }) => {
  return {
    total: 200,
    list: mockListData(p)
  }
}
export default mockList