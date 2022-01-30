import { Loading as ElLoading } from 'element-ui'
const minMillisecondTimeForShow = 500 // 最小显示的毫秒时间，避免加载中样式一闪而过，没有充分显示
// 注入全局方法
;(function () {
  if (window.hadResetAjaxForWaiting) {
    // 如果已经重置过，则不再进入。解决开发时局部刷新导致重新加载问题
    return
  }
  window.hadResetAjaxForWaiting = true
  window.waitingAjaxMap = {} // 接口映射

  const OriginXHR = window.XMLHttpRequest
  const originOpen = OriginXHR.prototype.open

  // 重置 XMLHttpRequest
  window.XMLHttpRequest = function () {
    let targetDomList = [] // 存储本 ajax 请求，影响到的 dom 元素
    const realXHR = new OriginXHR() // 重置操作函数，获取请求数据

    realXHR.open = function (method, url, async) {
      Object.keys(window.waitingAjaxMap).forEach((key) => {
        const [targetMethod, targetUrl] = key.split('::')
        if (targetMethod.toLocaleLowerCase() === method.toLocaleLowerCase() && (url.indexOf(targetUrl) > -1 || new RegExp(targetUrl).test(url))) {
          targetDomList = [...window.waitingAjaxMap[key], ...targetDomList]
          window.waitingAjaxMap[key].forEach((dom) => {
            // 否则使用 element 的 loading 组件
            dom.ElLoading = ElLoading.service({
              target: dom,
              text: dom.getAttribute('element-loading-text'),
              spinner: dom.getAttribute('element-loading-spinner'),
              background: dom.getAttribute('element-loading-background'),
              customClass: dom.getAttribute('element-loading-custom-class')
            })
            if (!dom.waitingAjaxNum) {
              dom.showStartTime = new Date().getTime() // 该 dom 显示加载中的开始时间
            }
            dom.waitingAjaxNum = dom.waitingAjaxNum || 0 // 不使用 dataset，是应为 dataset 并不实时，在同一个时间内，上一次存储的值不能被保存
            dom.waitingAjaxNum++
          })
        }
      })
      // 使用原生的 XMLHttpRequest open操作
      originOpen.call(realXHR, method, url, async)
    }

    // 监听加载完成，清除 waiting
    realXHR.addEventListener(
      'loadend',
      () => {
        targetDomList.forEach((dom) => {
          dom.waitingAjaxNum--
          if (dom.waitingAjaxNum !== 0) return
          const showEndTime = new Date().getTime() // 该 dom 显示加载中样式的结束时间
          const showTime = showEndTime - dom.showStartTime // 该 dom 显示加载中样式的时长
          const remainShowTime = minMillisecondTimeForShow - showTime // 剩余需要显示加载中样式的时长
          const closeWaiting = () => {
            dom.ElLoading.close()
          }
          remainShowTime > 0 ? setTimeout(closeWaiting, remainShowTime) : closeWaiting() // 是否仍需要额外显示加载中样式，是则设置 setTimeout 延后再取消加载中样式
        })
      },
      false
    )
    return realXHR
  }
})()
export default {
  bind: (targetDom, binding) => {
    // 添加需要监听的接口，注入对应的 dom
    const targetUrlList = Array.isArray(binding.value) ? binding.value : [binding.value]
    targetUrlList.forEach((targetUrl) => {
      window.waitingAjaxMap[targetUrl] = [targetDom, ...(window.waitingAjaxMap[targetUrl] || [])]
    })
  },

  // 参数变化
  update: (targetDom, binding) => {
    if (binding.oldValue !== binding.value) {
      const preTargetUrlList = Array.isArray(binding.oldValue) ? binding.oldValue : [binding.oldValue]
      preTargetUrlList.forEach((targetUrl) => {
        const index = (window.waitingAjaxMap[targetUrl] || []).indexOf(targetDom)
        index > -1 && window.waitingAjaxMap[targetUrl].splice(index, 1)
      })

      // 添加需要监听的接口，注入对应的 dom
      const targetUrlList = Array.isArray(binding.value) ? binding.value : [binding.value]
      targetUrlList.forEach((targetUrl) => {
        window.waitingAjaxMap[targetUrl] = [targetDom, ...(window.waitingAjaxMap[targetUrl] || [])]
      })
    }
  },

  // 指令被卸载，消除消息监听
  unbind: (targetDom, binding) => {
    const targetUrlList = typeof binding.value === 'object' ? binding.value : [binding.value]
    targetUrlList.forEach((targetUrl) => {
      const index = window.waitingAjaxMap[targetUrl].indexOf(targetDom)
      index > -1 && window.waitingAjaxMap[targetUrl].splice(index, 1)
      if (window.waitingAjaxMap[targetUrl].length === 0) {
        delete window.waitingAjaxMap[targetUrl]
      }
    })
  }
}
