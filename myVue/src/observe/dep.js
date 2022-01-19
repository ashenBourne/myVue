class Dep{
    constructor(){
        this.subs=[]
    }
    // 将watcher存起来（一个属性对应一个wather）
    depend(){
        this.subs.push(Dep.target)
    }
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }

}

Dep.target=null

export function pushTarget(watcher){
    Dep.target=watcher
}
export function popTarget(){
    Dep.target=null
}
export default Dep