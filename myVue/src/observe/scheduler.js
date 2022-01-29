import { nextTick } from "../utils/index"
let queue = []
// 利用对象来进行去重
let has = {}
// 为了防抖
let awaiting = false
function flushSchedulerQueue() {
    queue.forEach(item => item.run())
    queue = []
    has = {}
    awaiting = false
}
export function queueWatcher(watcher) {
    const id = watcher.id
    // 没有的话，进行
    if (has[id] == null) {

        queue.push(watcher)
        has[id] = true
        if (!awaiting) {
            nextTick(flushSchedulerQueue)
            awaiting = true
        }
    }
}