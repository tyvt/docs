# 布局组件

## 页签

::: demo
```html
<template>
  <zs-tabs type="card" :tab-list="tabList"></zs-tabs>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [{ name: 0, label: '业务数据列表' }]
      }
    }
  }
</script>
```
:::
