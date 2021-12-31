import { isObject } from "../utils/index"
// 监听数据
class Observer {
    constructor(value) {
        if (Array.isArray(value)) {// 数组执行另一套方法

        } else {// 对象执行该方法进行监听
            this.walk(value)
        }

    }
    walk(value) {
        for (let key in value) {
            // 递归监听
            defineReactive(value, key, value[key])
        }
    }
}

export function defineReactive(obj, key, oldVal) {
    observe(oldVal)
    Object.defineProperty(obj, key, {
        get() {
            console.log("获取该属性值?");
            return oldVal
        },
        // 设置的时候，如果新值是对象，也要进行监控
        set(newVal) {
            if (newVal === oldVal) return
            console.log("设置新属性");
            observe(newVal)
            oldVal = newVal
        }
    })
}

// 判断是否是对象、数组，如果是对象，则进行监测
export function observe(data) {
    if (!isObject(data)) {
        return
    }
    return new Observer(data)
}