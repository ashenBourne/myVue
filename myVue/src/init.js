import {initState} from "./state"
import {compileToFunction} from "./compile/index"
import {mountComponent} from "./lifecycle"
// 初始化方法
const initMixin = function (Vue) {
    Vue.prototype.init = function (options) {
        let vm = this
        
 
        vm.$options = options
        initState(vm)
        // 如果有el，则自动执行$mount方法
        if(options.el){
            vm.$mount(options.el)
        }
    }
    Vue.prototype.$mount=function(el){
        const vm=this
        el=document.querySelector(el)
        vm.$el=el
        const options=vm.$options
        // debugger
        // 如果没render，则生成render
        if(options&&!options.render){
            let template=options.template
            if(!template&&el){  //没有template，则获取el所有内容，包括外围el
                template=el.outerHTML
            }
            // 将template编译成render
            const render=compileToFunction(template);
            // 获取render
            options.render=render
        }
        // 挂载组件
        mountComponent(vm,el)

    }
}

export default initMixin