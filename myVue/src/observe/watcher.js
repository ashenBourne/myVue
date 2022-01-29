let id=0;
import { queueWatcher } from "./scheduler";
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
        this.id=id++    //watcher的唯一标识
        this.deps=[]    //watcher记录的dep依赖
        // 在get的时候，会多次存储，为此防止存储同样的对象，需要去重（通过id）
        this.depsId=new Set();
        // 一般是渲染页面方法
        if(typeof this.exprOrFn ==='function'){
            this.getter=exprOrFn
        }
        this.get()

    }
    // watcher和deo要互存对方，到时候便于通知对方
    addDep(dep){
        let id=dep.id
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
        
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
    // 执行编译
    run(){
        this.get()
    }
    // 更新试图/渲染视图（这里涉及到js的批处理，就好比同一时间多次更改数据，只执行一次视图渲染操作）
    update(){
        queueWatcher(this)
    }
}


export default Watcher