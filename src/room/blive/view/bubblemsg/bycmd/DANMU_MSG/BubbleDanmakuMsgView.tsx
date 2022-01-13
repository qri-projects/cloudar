import React from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleDanmuMsg, BliveBubbleMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";

export default class BubbleDanmakuMsgView extends BubbleViewByCmd<BliveBubbleDanmuMsg, any>{
    render() {
        let emotionInfo = this.props.msg.raw.info[0][13];
        // @ts-ignore
        if (emotionInfo && emotionInfo !== "{}") {
            return <img src={emotionInfo["url"]}
                        style={{
                            width: emotionInfo.width / 2, height: emotionInfo.height / 2,
                            margin: "2px -4px -6px -9px"
                        }}
                        alt={this.props.msg.raw.info[1]} />
        }
        return this.props.msg.raw.info[1]
        // return this.props.msg.raw.info.content;
    }
}