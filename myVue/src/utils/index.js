export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}
export function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable, //是否可枚举，默认不可以
      writable: true, //属性是否可修改
      configurable: true  //是否可被删除
    })
  }