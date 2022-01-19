export function renderMixin(Vue) {
        // 创建虚拟dom节点
        Vue.prototype._c = function () {
                return createElement(...arguments)
        }
        // 创建虚拟dom文本节点
        Vue.prototype._v = function (text) {
                return createTextElement(text)
        }
        // 处理花括号中的变量
        Vue.prototype._s = function (val) {
                return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
        }
        // 调用的就是Vue中的render方法
        Vue.prototype._render = function () {
                const vm = this;
                const render = vm.$options.render
                const vnode = render.call(vm)
                return vnode
        }
}
// _c('div',{id:'app',style:{padding:'10px'}},child1,child2……)   
function createElement(tag, data = {}, ...children) {       //data是属性
        return vnode(tag, data, data.key, children)
}
function createTextElement(text) {
        return vnode(undefined, undefined, undefined, undefined, text)
}
// 生成虚拟node
function vnode(tag, data, key, children, text) {
        return {
                tag,
                data,
                key,
                children,
                text
        }
}