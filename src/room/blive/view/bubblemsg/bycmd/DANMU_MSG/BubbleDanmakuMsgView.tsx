import React from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleDanmuMsg, BliveBubbleMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";

export default class BubbleDanmakuMsgView extends BubbleViewByCmd<BliveBubbleDanmuMsg, any>{
    render() {
        return this.props.msg.raw.info[1]
        // return this.props.msg.raw.info.content;
    }
}