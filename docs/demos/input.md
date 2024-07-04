---
nav: Components
---

# Input拓展组件
## 示例

### LegalInput
<code description="通过配置 reg 属性来限制输入" src="../examples/input/legal-input.tsx"></code>

### TextInput
<code description="用于显示表单详情" src="../examples/input/text-input.tsx"></code>

### NumberInput
<code description="只可输入数字的输入框，支持千分位格式化" src="../examples/input/number-input.tsx"></code>

### RangeInput 
<code description="范围输入框" src="../examples/input/range-input.tsx"></code>

## NumberInput API
|属性|描述|类型|默认值|
|---|--|---|---|
|max|最大数字|`number`|`undefined`|
|dp|小数位数|`number`|2|
|negative|支持负数|`boolean`|`true`|
|blurFormat|失焦后格式化|`boolean`|`false`|
|amount|千分位输入框|`boolean`|`false`|
|value|-|[HNumberInputValue](#HNumberInputValue)|`undefined`|
|onChange|-|(value: [HNumberInputValue](#HNumberInputValue)) => void|-|

## HNumberInputValue
```ts
type NumberInputAmountValue = { value: string; formatValue: string }
type HNumberInputValue = NumberInputAmountValue | string
```
