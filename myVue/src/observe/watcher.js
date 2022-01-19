let id=0;
import {pushTarget,popTarget } from "./dep"
class Watcher {
    /**
     * @desc 依赖收集
     * @param 
     */
    constructor(vm,exprOrFn,cb,options){
        this.vm=vm
        this.exprOrFn=exprOrFn
        this.cb=cb
        this.options=options
        this.id=id++
        if(typeof this.exprOrFn ==='function'){
            this.getter=exprOrFn
        }
        this.get()

    }
    // 执行更新操作
    get(){
        // 将watch放入Dep中
        pushTarget(this)
        //渲染页面
        this.getter()
        // 渲染完了就结束
        popTarget()
    }
    // 更新的化，执行一遍gets
    update(){
        this.get()
    }
}

export default Watcher