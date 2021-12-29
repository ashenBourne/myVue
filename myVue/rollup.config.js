import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
export default {
    input:"./src/index.js",
    output:{
        format:"umd",//模块化类型 有esModule、commonJs模块
        name:"Vue",
        file:"dist/umd/vue.js",
        sourcemap:true
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        serve({
            // open:true,
            port:3000,
            contentBase:"",
            openPage:"/index.html"  //直接指定打开页面
        })
    ]
}