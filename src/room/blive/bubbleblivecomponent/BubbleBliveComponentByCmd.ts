import React, {ClassType} from "react";

import {BaseBliveMsg, Danmaku, SendGift} from "../msgsource/bubbleblivetypes/BliveMsg";
import {Sender} from "../../../normal/NormalMsg";
import BubbleDanmuMsgView from "../view/bubblemsg/bycmd/DANMU_MSG/BubbleDanmuMsgView";
import {
    BliveBubbleDanmuMsg,
    BliveBubbleMsg,
    BliveBubbleSendGiftMsg
} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleSendGiftView from "../view/bubblemsg/bycmd/SEND_GIFT/BubbleSendGiftView";

export abstract class BubbleBliveComponentByCmd<BaseBliveMsgType extends BaseBliveMsg, BliveBubbleMsgType extends BliveBubbleMsg<BaseBliveMsgType>> {
    abstract cmd: string;

    abstract viewClassType: ClassType<{ msg: BliveBubbleMsgType }, any, any>;

    abstract genBliveBubbleMsg(rawBliveMsg: BaseBliveMsgType): BliveBubbleMsgType

    genReactComponent(rawBliveMsg: BaseBliveMsgType): React.ReactNode {
        let bliveBubbleMsg = this.genBliveBubbleMsg(rawBliveMsg);
        return React.createElement(this.viewClassType, {key: bliveBubbleMsg.uniqueId, msg: bliveBubbleMsg});
    }
}

class DanmuBubbleBliveMsg extends BubbleBliveComponentByCmd<Danmaku, BliveBubbleDanmuMsg> {
    cmd = "DANMU_MSG"

    genSender(rawBliveMsg: Danmaku): Sender {
        let userId = rawBliveMsg.info[2][0]
        let uniqueId = `bili-${userId}`
        return {
            uniqueId,
            name: rawBliveMsg.info[2][1],
            avatar: `http://cdn.flrscn.tech/avatar-302/${userId}`
        }
    }


    genBliveBubbleMsg(rawBliveMsg: Danmaku): BliveBubbleMsg<Danmaku> {
        return {
            raw: rawBliveMsg,
            uniqueId: `bili-bubble-DANMU_MSG-${rawBliveMsg.info[0][4]}-${rawBliveMsg.info[0][5]}`,
            senders: new Array<Sender>(
                this.genSender(rawBliveMsg)
            )
        };
    }

    viewClassType = BubbleDanmuMsgView;
}

class SendGiftBliveMsg extends BubbleBliveComponentByCmd<SendGift, BliveBubbleSendGiftMsg> {
    cmd: string = "SEND_GIFT";

    genSender(rawBliveMsg: SendGift): Sender {
        let userId = rawBliveMsg.data.uid
        let uniqueId = `bili-${userId}`
        return {
            uniqueId,
            name: rawBliveMsg.data.uname,
            avatar: `http://cdn.flrscn.tech/avatar-302/${userId}`
        }
    }

    genBliveBubbleMsg(rawBliveMsg: SendGift): BliveBubbleSendGiftMsg {
        return {
            uniqueId: `bili-SEND_GIFT-${rawBliveMsg.data.timestamp}-${rawBliveMsg.data.rnd}`,
            raw: rawBliveMsg,
            giftStatic: null,
            senders: new Array<Sender>(this.genSender(rawBliveMsg))
        };
    }

    viewClassType: React.ClassType<{ msg: BliveBubbleSendGiftMsg }, any, any> = BubbleSendGiftView;
}

const danmuBubbleBliveMsg = new DanmuBubbleBliveMsg();
const sendGiftBliveMsg = new SendGiftBliveMsg();

const bubbleBliveComponentsByCmd = new Map<string, BubbleBliveComponentByCmd<any, any>>(
    [
        [danmuBubbleBliveMsg.cmd, danmuBubbleBliveMsg],
        [sendGiftBliveMsg.cmd, sendGiftBliveMsg],
    ]
);

export default bubbleBliveComponentsByCmd;