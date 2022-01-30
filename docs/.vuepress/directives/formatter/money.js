export default {
  inserted: function (el, binding) {
    // 正则校验数字类型
    const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
    // 指令作用在 element-input 节点，对应原生 div.el-input (真实input节点的父节点)
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      el = el.getElementsByTagName('input')[0]
    }
    // 带¥符号、保留2位小数+千分位
    // el.value = (Number(el.value)).toLocaleString('zh', {style:'currency', currency: 'CNY', minimumFractionDigits: 2})
    // 去除，初始化时格式化
    const replaceValue = el.value.replace(/,/g, '')
    replaceValue &&
      (el.value = parseFloat(replaceValue).toLocaleString('en', {
        minimumFractionDigits: binding.arg,
        maximumFractionDigits: 2
      }))
    el.oninput = (e) => {
      if (e.target.value.includes(',')) {
        el.value = e.target.value.replace(/,/g, '')
        el.dispatchEvent(new Event('input'))
      }
    }
    el.onfocus = (e) => {
      const temp = e.target.value.replace(/,/g, '')
      if (!reg.test(temp)) return
      el.value = temp
    }
    el.onblur = (e) => {
      const temp = e.target.value.replace(/,/g, '')
      if (!reg.test(temp)) return
      el.value = parseFloat(temp).toLocaleString('en', {
        minimumFractionDigits: binding.arg,
        maximumFractionDigits: 2
      })
    }
  }
}
