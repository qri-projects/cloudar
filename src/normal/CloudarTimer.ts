import createRBTree, {Iterator, Node} from "functional-red-black-tree"


class CloudarTimer {
    private holder: createRBTree.Tree<number, CloudarTimerEvent>;

    constructor() {
        this.holder = createRBTree();
        setInterval(() => this.flush(), 200)
    }

    public flush() {
        const now = new Date().getTime();
        let shouldExecNodes: Iterator<number, CloudarTimerEvent> = this.holder.lt(now)
        let shouldExecNode: Node<number, CloudarTimerEvent> | null
        shouldExecNode = shouldExecNodes.node
        while (shouldExecNode) {
            let shouldExec = shouldExecNode.value
            if (shouldExec.isExecuting || shouldExec.isFinished) {
                shouldExecNodes.prev();
                shouldExecNode = shouldExecNodes.node
                continue
            }
            shouldExec.isExecuting = true
            shouldExec.event()
            shouldExec.isFinished = true
            this.holder = this.holder.remove(shouldExecNode!!.key)

            shouldExecNodes.prev();
            shouldExecNode = shouldExecNodes.node
        }
    }

    registerEvent(event: CloudarTimerEvent) {
        this.holder = this.holder.insert(event.shouldExecuteMillSeconds, event)
    }

    registerLoop(f: () => void, interval: number) {
        this.registerEvent({
            shouldExecuteMillSeconds: new Date().getTime() + interval,
            event: () => {
                f()
                this.registerLoop(f, interval);
            },
            isExecuting: false,
            isFinished: false
        })
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
