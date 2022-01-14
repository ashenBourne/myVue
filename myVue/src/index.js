
import initMixin from "./init"
import {lifecycleMixin} from "./lifecycle"
import {renderMixin} from "./vdom/index"
function Vue(options) {
    this.init(options)
}
initMixin(Vue)
lifecycleMixin(Vue) // 挂载_update方法
renderMixin(Vue)    //挂载_render方法
export default Vue
