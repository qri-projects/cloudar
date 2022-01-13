import {InteractWord} from "../msgsource/bubbleblivetypes/BliveMsg";
import {BliveBubbleInteractWordMsg, BliveBubbleTheme} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender} from "../../../normal/NormalMsg";
import React from "react";
import BubbleInteractWordView from "../view/bubblemsg/bycmd/INTERACT_WORD/BubbleInteractWordView";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";

class BubbleBliveComponentInteractWord extends BubbleBliveComponentByCmd<InteractWord, BliveBubbleInteractWordMsg> {
    cmd: string = "INTERACT_WORD";

    genSender(rawBliveMsg: InteractWord): Sender {
        return this.genSenderFromUidAndUname(rawBliveMsg.data.uid, rawBliveMsg.data.uname)
    }

    genBliveBubbleMsg(rawBliveMsg: InteractWord): BliveBubbleInteractWordMsg {
        const theme = new BliveBubbleTheme();
        let remainTime = 60000;
        // 1 进入
        // 2 关注
        // 3 分享
        // 4 特别关注
        // 5 互关
        let msgType = rawBliveMsg.data.msg_type;
        if (msgType === 1) {
            theme.background = "rgb(254, 255, 195)";
            remainTime = 60000
        } else if(msgType === 2) {
            theme.background = "rgb(255, 193, 110)";
            remainTime = 120000;
        } else if (msgType === 3) {
            theme.background = "rgb(255, 193, 110)";
            remainTime = 60000;
        } else if (msgType === 4) {
            theme.background = "rgb(255, 150, 150)";
            remainTime = 120000;
        } else if (msgType === 5) {
            theme.background = "rgb(255, 150, 150)";
            remainTime = 120000;
        }

        return new BliveBubbleInteractWordMsg(
            `bili-INTERACT_WORD-${rawBliveMsg.data.trigger_time}-${rawBliveMsg.data.uid}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg)),
            remainTime,
            theme
        );
    }

    viewClassType: React.ClassType<{ msg: BliveBubbleInteractWordMsg }, any, any> = BubbleInteractWordView;
}

 const interactWordComponent = new BubbleBliveComponentInteractWord();

export default interactWordComponent;