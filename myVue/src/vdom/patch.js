export function patch(oldVnode,vnode) {
    // 将虚拟节点转换为真实节点
    let el=createElement(vnode) //真实节点
    // 获取el的父节点
    let parentEle=oldVnode.parentNode
    // 当前元素插入app的后边
    parentEle.insertBefore(el,oldVnode.nextSibling);
    // 删除老的节点
    parentEle.removeChild(oldVnode)
}
function createElement(vnode) {
    let {tag,children,key,data={},text}=vnode
    if(typeof tag ==='string'){ //说明是标签，则创建标签
        vnode.el=document.createElement(tag)
        // 设置属性源码中有单独的方法，这里只简单考虑下style和类名id等
        for(let key in data){
            if(key==='style'){
                let str=''
                for(let styleItem in data[key]){
                    str+=`${styleItem}:${data[key][styleItem]};`
                }
                vnode.el.setAttribute(key,str)
            }else{
                vnode.el.setAttribute(key,data[key])
            }
        }
        // 递归渲染子节点
        children.forEach(item=>{
            vnode.el.appendChild(createElement(item))
        })
    }else{  //文本节点
        vnode.el=document.createTextNode(text)
    }
    return vnode.el
}