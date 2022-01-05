import {initState} from "./state"

// 初始化方法
const mixInit = function (Vue) {
    Vue.prototype.init = function (options) {
        let vm = this
        vm.$options = options
        initState(vm)
    }
}

export default mixInit