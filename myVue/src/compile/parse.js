// 正则匹配：以下正则注意起始位置
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/   //匹配属性的，比如：aaa='aaa' aaa="aaa" aaa=aaa
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`   //标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //命名空间标签名<aa:aa>
const startTagOpen = new RegExp(`^<${qnameCapture}`)    //包括尖括号在内的字符串：<div（首位）
const startTagClose = /^\s*(\/?)>/  //匹配最后的闭合尖括号：/> 、>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) //匹配整个闭合标签：</div>
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// 解析html：原理是利用正则，匹配html字符串，拿出各种标签，组成需要的数据
// 这里先不管指令、<!DOCTYPE、注释等解析
export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,    //'1'表示标签元素类型
            children: [],
            attrs,
            parent: null
        }
    }
    let root;   //根节点
    let currentParent;  //当前父节点
    let stack=[]    //存储节点数组，在一组节点结束后，从栈中删除
    function star(tagName, attrs) {
        let element=createASTElement(tagName,attrs)
        if(!root){
            root=element
        }
        // 当前获取的开始节点即作为父节点出现
        currentParent=element
        stack.push(element) //将开始节点放进去，在节点结尾处，将这个节点删掉
    }
    function chars(text) {
        text=text.replace(/s/g,'')  //空格去掉
        if(text){   //如果去掉空格还有字符串，则收入父节点的children中
            currentParent.children.push({
                type:3, //3代表文本节点
                text
            })

        }

    }
    function end(tagName) {
        let element=stack.pop() //删除结尾标签，重新赋值currentParent
        currentParent=stack[stack.length-1]
        if(currentParent){
            element.parent=currentParent    //数组的上一位是下一位的父节点
            currentParent.children.push(element)
        }
    }
    
    while (html) {    //匹配一段，删除一段
        let textEnd = html.indexOf("<")
        if (textEnd === 0) {    //说明是开始标签/结束标签
            const startTagMatch = parseStartTag() //开始标签的匹配结果
            if (startTagMatch) {
                star(startTagMatch.tagName, startTagMatch.attrs)
                continue;
            }
            const endTagMatch = html.match(endTag)    //结束标签匹配结果
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }

        }
        // 获取下一段尖括号之前的内容，其实就是文本
        let text;
        if (textEnd > 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length)
            chars(text)
        }
    }
    function parseStartTag() {
        const starMatch = html.match(startTagOpen) //如果匹配上了，返回数组第一位是标签名+尖括号，第二位是标签名
        if (starMatch) {
            // 结果是为了获取这个match:比如{tagName:"div",attrs:[{name:"id",value:"app"},{name:"class",value:"xxx"}]}
            const match = {
                tagName: starMatch[1],
                attrs: []
            }
            advance(starMatch[0].length)
            let end, attr;
            //在开始标签结束以前都在循环,为了获取属性：改正则返回6位数组，第一位为完整属性，第二位为属性名，第三位位“=”，第四位/第五/第六位为属性值
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            if (end) {    //end匹配的是结束位置的尖角符号'>'
                advance(end[0].length)
                return match
            }
        }
    }
    // 截取字符串：匹配完之后，将前面的字符串删掉，赋值新的字符串
    function advance(index) {    //参数为下标
        html = html.substring(index)
    }
    return root //返回ast树

}