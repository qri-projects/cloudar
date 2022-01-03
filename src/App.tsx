import React from 'react';
import './App.css';
import BubblePanel from "./view/bubble/BubblePanel";
import Room from "./normal/Room";
import MsgSource from "./normal/MsgSource";
import NormalMsg, {Sender} from "./normal/NormalMsg";
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
                            uniqueId: "12345",
                            sender: {
                                avatar: "https://pic.ggemo.com/picgo/qriheadimg.png",
                                name: "qri",
                                uniqueId: "qri#2333"
                            },
                            content: `23333hhh${i}`,
                            sendTime: new Date().getTime(),
                            reply2UniqueId: undefined,

                            subSenders: undefined,
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
