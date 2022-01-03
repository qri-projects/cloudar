import createRBTree, {Iterator, Node} from "functional-red-black-tree"


class CloudarTimer {
    private holder: createRBTree.Tree<number, [CloudarTimerEvent]>;

    constructor() {
        this.holder = createRBTree();
        this.registerEvent({
            shouldExecuteMillSeconds: new Date().getTime() + 50000,
            event: () => {
            },
            isFinished: false,
            isExecuting: false
        })
        setInterval(() => this.flush(), 200)
    }

    public flush() {
        const now = new Date().getTime();
        let shouldExecNodes: Iterator<number, [CloudarTimerEvent]> = this.holder.lt(now)
        let shouldExecNode: Node<number, [CloudarTimerEvent]> | null

        shouldExecNode = shouldExecNodes.node
        while (shouldExecNode) {
            let shouldExecs = shouldExecNode.value
            for (let cloudarTimerEvent of shouldExecs) {
                if (cloudarTimerEvent.isExecuting || cloudarTimerEvent.isFinished) {
                    continue
                }
                cloudarTimerEvent.isExecuting = true
                cloudarTimerEvent.event()
                cloudarTimerEvent.isFinished = true
            }
            shouldExecNodes.prev();
            shouldExecNode = shouldExecNodes.node
        }
    }

    registerEvent(event: CloudarTimerEvent) {
        let thisTimeShouldExecs: [CloudarTimerEvent] | void = this.holder.get(event.shouldExecuteMillSeconds)
        if (thisTimeShouldExecs) {
            thisTimeShouldExecs.push(event)
        } else {
            this.holder = this.holder.insert(event.shouldExecuteMillSeconds, [event]);
        }

    }
}

interface CloudarTimerEvent {
    shouldExecuteMillSeconds: number
    event: () => void
    isExecuting: boolean
    isFinished: boolean
}

const cloudarTimer = new CloudarTimer();

export default cloudarTimer;