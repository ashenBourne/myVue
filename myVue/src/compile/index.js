

import {parseHTML} from "./parse"
import {generate} from "./generate"
// html模板-->变为render函数
export function compileToFunction(template) {
    // 1、将html转为"AST"语法树，注意AST语法树与虚拟dom的区别：虚拟dom是来描述dom的，AST是来描述语言的。
    let AST=parseHTML(template)
    console.log(AST);
    // 2、优化静态节点
    // 3、生成代码
    let code=generate(AST)
    // 4、生成render函数
    let render=new Function(`with(this){return ${code}}`)
    return render
    
}