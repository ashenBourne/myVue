import { isObject,def } from "../utils/index"
import {arrayMethods} from "./array"
import Dep from "./dep"
// 监听数据：在对data这种进行初始化的时候，会总体对data中的每个属性进行属性get和set的设置（非null且为对象）
class Observer {
    constructor(value) {
        this.dep=new Dep()
        // 给value定一个__ob__属性，指向自己，为了避免无线循环，所以要不可枚举
        def(value, '__ob__', this,false)
        if (Array.isArray(value)) {// 数组执行另一套方法
            // 对数组的几个改变数组长度或顺序的方法进行劫持
            value.__proto__=arrayMethods
            // 添加一个__ob__属性，便于在array.js中使用
            this.observeArray(value)
            
        } else {// 对象执行该方法进行监听
            this.walk(value)
        }

    }
    // 监听对象
    walk(value) {
        for (let key in value) {
            // 递归监听
            defineReactive(value, key, value[key])
        }
    }
    // 监听数组
    observeArray(array){
        for(let item of array){
            observe(item)
        }
    }
}

export function defineReactive(obj, key, oldVal) {
    console.log("key是："+key);
    //只有对象和数组才有返回值
    let childDep=observe(oldVal)    
    // 这里dep实例化是为了将
    let dep=new Dep()
    Object.defineProperty(obj, key, {
        get() {
            // 在watcher中将dep存起来
            if(Dep.target){
                dep.depend()
                // 数组收集依赖
                if(childDep){
                    childDep.dep.depend()
                }
            }
            return oldVal
        },
        // 设置的时候，如果新值是对象，也要进行监控
        set(newVal) {
            if (newVal === oldVal) return
            // console.log("设置新属性");
            observe(newVal)
            oldVal = newVal
            // 发生改变的时候，进行异步更新
            console.log("发生属性设置");
            dep.notify()
        }
    })
}

// 判断是否是对象、数组，如果是对象、数组，则进行监测
export function observe(data) {
    if (!isObject(data)) {
        return
    }
    // 如果有这个值，表示监听过了，不用再监听了
    if(data.__ob__){    
        return data.__ob__
    }
    return new Observer(data)
}