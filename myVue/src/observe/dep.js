let id=0
class Dep{
    constructor(){
        this.id=id++
        this.subs=[]
    }
    // 将watcher存起来（一个属性对应一个wather）
    depend(){
        Dep.target.addDep(this)
    }

    addSub(watcher){
        this.subs.push(watcher)
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