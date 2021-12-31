import { observe } from "./observe/index"


const mixInit = function (Vue) {
    Vue.prototype.init = function (options) {
        let vm = this
        vm.$options = options
        initData(vm)
    }
}
function initData(vm) {
    let data = vm.$options.data || {}
    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}
    observe(data)
}
export default mixInit