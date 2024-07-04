---
nav: Components
---

# Select 组件
## 代码演示

### 基础示例
<code src="../examples/select/basic.tsx"></code>

### 多选
<code src="../examples/select/multiple.tsx"></code>

## API
|属性|描述|类型|默认值|
|---|--|---|---|
|serve|数据来源|[HongSelectServe](#hongserve)|`null`|
|bindKey|selectOptions 映射关系|`{ labelKey: string; valueKey: string }`|`{labelKey:"name",valueKey:"id"} `|
|backRow|返回表格row全部数据|`boolean`|
|coumns|表格列配置|`ColumnsType[]`|`[]`|
|mode|多选，单选，设为`number`时为最大多选`|`number\|'multiple'\|'tags'`|-|
|searchPlaceholder|搜索框 placeholder|`string`|请输入|
|value|-|`{ label: any; value: any; [key: string]: any }[]`|-|
|onChange|-|`(value:{ label: any; value: any; [key: string]: any }[])=>void`|-|
|popupClassName|弹出层 className｜`string`|`undefined`|

## HongServe 
```js
type HongServe 
  = (params: {current: number; pageSize: number; name: string}) 
  => Promise<{ list: any[]; total: number }>;
```
