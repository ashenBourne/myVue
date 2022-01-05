import {def} from "../utils/index"
// 在此文件劫持Array对象的原型
const arrayProto = Array.prototype
// 该对象继承了 Array的原型，重写以下七个方法
export const arrayMethods = Object.create(arrayProto)

// 劫持arrayMethods上面一些方法：改变数组长度/顺序的方法
let methodsToPatch=[
    'push',
    'unshift',
    'shift',
    'pop',
    'splice',
    'sort',
    'reverse'
]

// 场景[].push(2,34)
methodsToPatch.forEach(method=>{
    // 原来的方法
    let original=arrayProto[method]
    def(arrayMethods,method,function(...args){
        // 执行对应的方法,此处的this指处理的对象
        let result=original.apply(this,args)
        let ob= this.__ob__
        // 统一参数
        let inserted
        // 对于新增的方法来说，如果新增的参数是对象，也需要进行监控
        switch (method){
            case "push":
            case "unshift":
                inserted = args
                break
            // splice进行参数替换，从第三个参数往后都是替换的对象
            case 'splice':
                inserted=args.slice(2)
                break
        }
        // 执行挂载在
        if (inserted) ob.observeArray(inserted)
        return result
    })
})