import React from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleDanmuMsg, BliveBubbleMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";

export default class BubbleDanmuMsgView extends BubbleViewByCmd<BliveBubbleDanmuMsg, any>{
    render() {
        return <BubbleMsgHolderView senders={this.props.msg.senders}>
            {this.props.msg.raw.info[1]}
        </BubbleMsgHolderView>
        // return this.props.msg.raw.info.content;
    }
}