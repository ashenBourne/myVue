import {patch } from "./vdom/patch"
export function  lifecycleMixin(Vue) {
    Vue.prototype._update=function (vnode) {
        let vm=this
        patch(vm.$el,vnode)
    }
}
export function  mountComponent(vm,el) {
    // 生成真实的dom，放进el中
    // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
    vm._update(vm._render())
}