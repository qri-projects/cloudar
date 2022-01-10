import React, {ClassType, ReactNode} from "react";

import CSS from 'csstype';
import bubblePlaceRegistry from "../../BubblePlaceRegistry";
import BubbleMsgSenderView from "./BubbleMsgSenderView";
import "./BubbleMsgHolderView.scss";
import cloudarTimer from "../../../../../normal/CloudarTimer";
import { Sender} from "../../../../../normal/NormalMsg";
import BubbleDanmuMsgView from "../bycmd/DANMU_MSG/BubbleDanmuMsgView";
import BubbleSendGiftView from "../bycmd/SEND_GIFT/BubbleSendGiftView";
import BubbleInteractWordView from "../bycmd/INTERACT_WORD/BubbleInteractWordView";

export default class BubbleMsgHolderView extends React.Component<{ senders: Array<Sender> },
    { bgOpacity: number, bgColor: { r: number, g: number, b: number } }> {

    constructor(props: { senders: Array<Sender>}) {
        super(props);
        this.state = {bgOpacity: 66, bgColor: {r: 130, g: 151, b: 255}};

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.setState({...this.state, bgOpacity: this.state.bgOpacity - 1})
            }, 3000 * i)
        }

    }

    render() {
        return <div className={"bubbleMsg"} style={{
            // left: `${this.props.msg.place.x}%`,
            // top: `${this.props.msg.place.y}%`
        }}>
            {/*头像*/}
            <div className={"bubbleMsgSendersHolder"}>
                {
                    this.props.senders?.map(sender =>
                        <BubbleMsgSenderView key={sender.uniqueId} sender={sender}/>
                    )
                }
            </div>

            <div className={"bubbleMsgContentHolder"} style={{
                background: `rgba(${this.state.bgColor.r}, ${this.state.bgColor.g},${this.state.bgColor.b},${this.state.bgOpacity}%)`
            }}>
                {this.props.children}
                {/*// todo*/}
            </div>
        </div>;
    }
}