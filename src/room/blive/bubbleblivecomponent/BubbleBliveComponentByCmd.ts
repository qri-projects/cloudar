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
import giftStaticInfos from "../manager/giftStaticManager";
import {MsgManager} from "../manager/MsgManager";
import BubblePlaceRegistry from "../view/BubblePlaceRegistry";

export abstract class BubbleBliveComponentByCmd<BaseBliveMsgType extends BaseBliveMsg, BliveBubbleMsgType extends BliveBubbleMsg<BaseBliveMsgType>> {
    abstract cmd: string;

    abstract viewClassType: ClassType<{ msg: BliveBubbleMsgType }, any, any>;

    abstract genBliveBubbleMsg(rawBliveMsg: BaseBliveMsgType): BliveBubbleMsgType

    genReactComponent(bliveBubbleMsg: BliveBubbleMsgType): React.ReactNode {
        return React.createElement(this.viewClassType, {key: bliveBubbleMsg.uniqueId, msg: bliveBubbleMsg});
    }

    // 利用这个类做方法表驱动
    abstract registerMsg(msg: BliveBubbleMsgType, msgManager: MsgManager): BliveBubbleMsgType | null;
}

class DanmuBubbleBliveMsg extends BubbleBliveComponentByCmd<Danmaku, BliveBubbleDanmuMsg> {
    cmd = "DANMU_MSG"

    public genSender(rawBliveMsg: Danmaku): Sender {
        let userId = rawBliveMsg.info[2][0]
        let uniqueId = `bili-${userId}`
        return {
            uniqueId,
            name: rawBliveMsg.info[2][1],
            avatar: `http://cdn.flrscn.tech/avatar-302/${userId}`
        }
    }


    genBliveBubbleMsg(rawBliveMsg: Danmaku): BliveBubbleDanmuMsg {
        console.log("rawBliveMsg=", rawBliveMsg)
        return new BliveBubbleDanmuMsg(
            `bili-bubble-DANMU_MSG-${rawBliveMsg.info[0][4]}-${rawBliveMsg.info[0][5]}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg))
        );
    }

    viewClassType = BubbleDanmuMsgView;

    registerMsg(msg: BliveBubbleDanmuMsg, msgManager: MsgManager): BliveBubbleDanmuMsg | null {
        return msgManager.registerDanmakuMsg(msg);
    }
}

class SendGiftBliveMsg extends BubbleBliveComponentByCmd<SendGift, BliveBubbleSendGiftMsg> {
    cmd: string = "SEND_GIFT";

    public genSender(rawBliveMsg: SendGift): Sender {
        let userId = rawBliveMsg.data.uid
        let uniqueId = `bili-${userId}`
        return {
            uniqueId,
            name: rawBliveMsg.data.uname,
            avatar: `http://cdn.flrscn.tech/avatar-302/${userId}`
        }
    }

    genBliveBubbleMsg(rawBliveMsg: SendGift): BliveBubbleSendGiftMsg {
        return new BliveBubbleSendGiftMsg(
            `bili-SEND_GIFT-${rawBliveMsg.data.timestamp}-${rawBliveMsg.data.rnd}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg)),
            giftStaticInfos.get(rawBliveMsg.data.giftId)!
        );
    }

    viewClassType: React.ClassType<{ msg: BliveBubbleSendGiftMsg }, any, any> = BubbleSendGiftView;

    registerMsg(msg: BliveBubbleSendGiftMsg, msgManager: MsgManager): BliveBubbleSendGiftMsg | null {
        return msgManager.registerSendGiftMsg(msg);
    }
}

export const danmuBubbleBliveMsg = new DanmuBubbleBliveMsg();
export const sendGiftBliveMsg = new SendGiftBliveMsg();

const bubbleBliveComponentsByCmd = new Map<string, BubbleBliveComponentByCmd<any, any>>(
    [
        [danmuBubbleBliveMsg.cmd, danmuBubbleBliveMsg],
        [sendGiftBliveMsg.cmd, sendGiftBliveMsg],
    ]
);

export default bubbleBliveComponentsByCmd;