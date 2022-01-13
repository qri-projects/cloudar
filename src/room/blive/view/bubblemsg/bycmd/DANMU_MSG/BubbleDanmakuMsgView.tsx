import React from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleDanmuMsg, BliveBubbleMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";

export default class BubbleDanmakuMsgView extends BubbleViewByCmd<BliveBubbleDanmuMsg, any>{
    render() {
        let emotionInfo = this.props.msg.raw.info[0][13];
        // @ts-ignore
        if (emotionInfo && emotionInfo !== "{}") {
            return <img src={emotionInfo["url"]}
                        style={{
                            width: emotionInfo.width / 2, height: emotionInfo.height / 2,
                            margin: "0px -8px -6px -8px"
                        }}
                        alt={this.props.msg.raw.info[1]}/>
        }
        return this.props.msg.raw.info[1]
        // return this.props.msg.raw.info.content;
    }
}