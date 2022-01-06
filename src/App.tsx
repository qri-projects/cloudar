import React from 'react';
import './App.css';
import BubblePanel from "./view/bubble/BubblePanel";
import Room from "./normal/Room";
import MsgSource from "./normal/MsgSource";
import NormalMsg, {Sender} from "./normal/NormalMsg";
import cloudarTimer from "./normal/CloudarTimer";
import BLiveMsgSource from "./msgsource/blive/BLiveMsgSource";


// class MockMsgSource implements MsgSource {
{/*    onMsgs: Array<(normalMsg: NormalMsg) => void>*/}

//     registerOnMsg(onMsg: (normalMsg: NormalMsg) => void): void {
//         this.onMsgs.push(onMsg)
//     }
//
//     constructor() {
//         this.onMsgs = []
//         for (let i = 0; i < 10; i++) {
//             cloudarTimer.registerEvent({
//                 shouldExecuteMillSeconds: new Date().getTime() + 1000 * i,
//                 event: () => {
//                     for (let onMsg of this.onMsgs) {
//                         onMsg({
//                             uniqueId: "12345" + i,
//                             sender: {
//                                 avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg",
//                                 name: "qri",
//                                 uniqueId: "qri#23330"
//                             },
//                             content: `草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草草`,
//                             sendTime: new Date().getTime(),
//                             reply2UniqueId: undefined,
//                             extraInfo: undefined
//                         })
//                     }
//                 },
//                 isExecuting: false,
//                 isFinished: false
//             })
//         }
//
//     }
// }

function App() {
    const mockMsgSource = new BLiveMsgSource(336119);
    return (
        <Room msgSource={mockMsgSource} panelType={BubblePanel} />
    );
}

export default App;
