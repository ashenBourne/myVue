// vue中，将props、methods、data、computed、watch视为状态，会依次对其初始化
import { observe } from "./observe/index"
export function  initState(vm){
    initData(vm)
}
// 数据初始化
function initData(vm) {
    let data = vm.$options.data || {}
    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}
    observe(data)
}