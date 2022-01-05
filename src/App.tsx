import React from 'react';
import './App.css';
import BubblePanel from "./view/bubble/BubblePanel";
import Room from "./normal/Room";
import MsgSource from "./normal/MsgSource";
import NormalMsg, {Level, Sender} from "./normal/NormalMsg";
import cloudarTimer from "./normal/CloudarTimer";


class MockMsgSource implements MsgSource {
    onMsgs: Array<(normalMsg: NormalMsg) => void>

    registerOnMsg(onMsg: (normalMsg: NormalMsg) => void): void {
        this.onMsgs.push(onMsg)
    }

    constructor() {
        this.onMsgs = []
        for (let i = 0; i < 10; i++) {
            cloudarTimer.registerEvent({
                shouldExecuteMillSeconds: new Date().getTime() + 1000 * i,
                event: () => {
                    for (let onMsg of this.onMsgs) {
                        onMsg({
                            uniqueId: "12345" + i,
                            sender: {
                                avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg",
                                name: "qri",
                                uniqueId: "qri#23330"
                            },
                            content: `草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草`,
                            sendTime: new Date().getTime(),
                            reply2UniqueId: undefined,
                            level: Level.NORMAL,
                            subSenders: [
                                {
                                    uniqueId: "qri#23331",
                                    name: "小黄瓜小黄瓜小黄瓜小小黄瓜小黄瓜小黄瓜小小黄瓜小黄瓜小黄瓜小小黄瓜小黄瓜小黄瓜小",
                                    avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg"
                                }
                            ],
                            extraInfo: undefined
                        })
                    }
                },
                isExecuting: false,
                isFinished: false
            })
        }

    }
}

function App() {
    const mockMsgSource = new MockMsgSource();
    return (
        <Room msgSource={mockMsgSource} panelType={BubblePanel} />
    );
}

export default App;
