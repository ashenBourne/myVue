import {initMixin} from "./mixin"
// 全局静态方法
export function initGlobalApi(Vue) {
    Vue.options={}  //这是Vue的静态属性，它不会出现在Vue实例中。
    initMixin(Vue)
}