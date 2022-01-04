import React, {ReactNode} from "react";
import BubbleMsg from "../BubbleMsg";
import CSS from 'csstype';
import bubblePlaceRegistry from "../BubblePlaceRegistry";
import BubbleMsgSenderView from "./BubbleMsgSenderView";
import "./BubbleMsgView.scss";

export default class BubbleMsgView extends React.Component<{ msg: BubbleMsg }, any> {
    constructor(props: { msg: BubbleMsg }) {
        super(props);

        bubblePlaceRegistry.registerUsePlace(this.props.msg);
    }

    render() {
        return <div className={"bubbleMsg"} style={{
            left: `${this.props.msg.place.x}%`,
            top: `${this.props.msg.place.y}%`
        }}>
            {/*头像*/}
            <div className={"bubbleMsgSendersHolder"}>
                <BubbleMsgSenderView sender={this.props.msg.msg.sender}/>
                {
                    this.props.msg.msg.subSenders?.map(sender =>
                        <BubbleMsgSenderView key={sender.uniqueId} sender={sender}/>
                    )
                }
            </div>
            {/*消息内容*/}
            <div className={"bubbleMsgContentHolder"}>
                {this.props.msg.msg.content}
            </div>
        </div>;
    }
}