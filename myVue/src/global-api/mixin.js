import { mergeOptions } from '../utils/index'

export function initMixin (Vue) {
    // 全局混入方法
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
