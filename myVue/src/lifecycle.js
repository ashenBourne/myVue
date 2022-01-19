import {patch } from "./vdom/patch"
import Watcher from "./observe/watcher"
export function  lifecycleMixin(Vue) {
    Vue.prototype._update=function (vnode) {
        let vm=this
        vm.$el=patch(vm.$el,vnode)
    }
}
export function  mountComponent(vm,el) {
    vm.$el=el
    // 生成真实的dom，放进el中
    callHook(vm,'beforeMount')  //在挂载之前执行
    // 先调用render方法创建虚拟节点，再将虚拟节点渲染到页面上
    let updateComponent=()=>{
        vm._update(vm._render())
    }
    new Watcher(vm,updateComponent,()=>{
        callHook(vm,'beforeUpdate')
    },true)
    
    callHook(vm,'mounted')
}

// 执行声明周期回调
export function  callHook(vm,hook) {
    const handles=vm.$options[hook] //是个数组
    if(handles){
        for(let item of handles){
            item.call(vm)
        }
    }
    

}