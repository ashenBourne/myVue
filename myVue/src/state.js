// vue中，将props、methods、data、computed、watch视为状态，会依次对其初始化
import { observe } from "./observe/index"
import {proxy} from "./utils/index"
export function  initState(vm){
    initData(vm)
}
// 数据初始化
function initData(vm) {
    let data = vm.$options.data || {}
    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}
    // let keys=Object.keys(data)
    // 这里将data等属性值直接给实例中，不用this._data.xxx,而是this.xxx
    for(let key in data){
        proxy(vm,'_data',key)
    }
    observe(data)
}