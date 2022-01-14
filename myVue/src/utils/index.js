const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: ()=>{},
  set: ()=>{}
}
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
// 做一波代理：比如使用场景vm._data.attr=vm.attr
export function proxy (target, sourceKey, key) {
  
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}