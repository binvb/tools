interface Task {
    (): Promise<any>
}
let EventQueue: Task[] = []
let pending: boolean = false

function addQueue(event: Task):void {
    EventQueue.push(event)
    if(!pending) {
        executionQueue(event)
    }
}

async function executionQueue(event: Task): Promise<void> {
    pending = true
    await event()
    EventQueue.shift()
    pending = false
    if(EventQueue.length) {
        executionQueue(EventQueue[0])
    }
}

export default addQueue