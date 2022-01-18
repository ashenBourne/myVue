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

// 策略模式，合并对象
const strats={}
strats.data=function (father,child) {
  return child
}
strats.computed=function () {}
strats.watch=function () {}
// 合并属性:将子属性合并到父属性上
export function mergeOptions(father,child) {
  // 例子1：假如有两个created，则options:{created:[a,b]}，step1：先考虑生命周期
  const options={}
  //可能父亲有，儿子有/没有
  for(let key in father){
    mergeField(key)   //合并字段
  }
  // 可能儿子有，父亲没有
  for(let key in child){
    if(!father.hasOwnProperty(key)){  //没有该属性
      mergeField(key)
    }
  }
  
  function mergeField(key) {
    console.log(key);
    if(strats[key]){ //key代表生命周期名称（暂时）
      options[key]=strats[key](father[key],child[key])
    } else{

    }
  }
  return options
}

// 生命周期
export const LIFECYCLE_HOOKS=[
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

// 策略模式：可以节省大量的if判断
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})
// 合并生命周期
function mergeHook(father,child) {
  if(child){  //儿子有的
    if(father){ //父亲也有的，则进行合并
      return father.concat(child)
    }else{  //父亲没有，则创建一个新数组
      return [child]
    }
  }else{
    return father
  }
}