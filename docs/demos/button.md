---
nav: Components
---

# Button组件

## 示例
<code src="../examples/button"></code>

## API
|属性|描述|类型|默认值|
|---|--|---|---|
|onClick|点击事件-loading 内部管理|[HButtonClick](#HButtonClick)|`null`|

## HButtonClick 
```js
export type HButtonClick = (value:{
  e:React.MouseEvent<HTMLElement, MouseEvent>,
  triggerLoading:()=>void
})=>void
```
