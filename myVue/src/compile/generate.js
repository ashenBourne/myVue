const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g //匹配花括号里面的 内容
// defaultTagRE.lastIndex=0
function gen(node) {
    // console.log(node);
    if (node.type === 1) {  //标签节点
        return generate(node)
    } else if (node.type === 3) {  //暂定为文本节点
        let text = node.text;
        if (!defaultTagRE.test(text)) {   //没有花括号，则直接导出
            return `_v(${JSON.stringify(text)})`
        }
        // 切割并拼接字符串，处理花括号里的内容
        let tokens = [];
        let lastIndex = defaultTagRE.lastIndex = 0;
        let match, index;    //每次匹配到的结果与下标
        // 正则匹配到的结果：第一位为全字符，第二位为括号内容
        while (match = defaultTagRE.exec(text)) {
            index = match.index;
            if (index > lastIndex) {    //将非括号内的也加入进去
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            // 预设此处_s为变量处理方法
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length //重设lastIndex
        }
        // 最后的最后,将括号后边的也加入进来
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join("+")})`

    }
}

function genProps(attrs) {
    let str = '';
    for (let attr of attrs) {
        if (attr.name === 'style') {
            let obj={}
            // attr.value:"color:red;diplay:block"
            // attr.value = attr.value.replace(/;/g, ',')
            attr.value.split(";").forEach(item=>{
                let [key,value]=item.split(":")
                obj[key]=value
            })
            attr.value=obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`  //加JSON.stringify是为了加入引号
    }
    return `{${str.slice(0, -1)}}`   //删除最后一个逗号
}
function genChildren(ast) {
    const children = ast.children
    if (children) {
        return children.map(child => gen(child)).join(",")
    }
}
/**
 * @desc: 这是要生成的render函数，预设_c方法：就是创造标签节点，_v方法：创造文本节点 _s转换变量等
 * render(){
 *      return _c('div',{id:'app',style:{padding:'10px'}},_v('姓名：'+_s(information.name))……)
 * }
**/
export function generate(ast) {
    let children = genChildren(ast)
    let code = `_c(${JSON.stringify(ast.tag)},${ast.attrs.length ? genProps(ast.attrs) : 'undefined'}${children ? (',' + children) : ''})`
    console.log(code);
    return code
}