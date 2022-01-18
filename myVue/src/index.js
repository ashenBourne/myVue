
import initMixin from "./init"
import {lifecycleMixin} from "./lifecycle"
import {renderMixin} from "./vdom/index"
import {initGlobalApi} from "./global-api/index"
function Vue(options) {
    this.init(options)
}
// 原型方法
initMixin(Vue)
lifecycleMixin(Vue) // 挂载_update方法
renderMixin(Vue)    //挂载_render方法
// Vue的静态方法 Vue.component  Vue.directive Vue.extend  Vue.mixin
initGlobalApi(Vue)
export default Vue
