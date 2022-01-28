import {BaseBliveMsg, SendGift} from "../msgsource/bubbleblivetypes/BliveMsg";
import {BliveBubbleMsg, BliveBubbleSendGiftMsg, BliveBubbleTheme} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender, UserMedal} from "../../../normal/NormalMsg";
import giftStaticInfos from "../manager/giftStaticManager";
import React from "react";
import BubbleSendGiftView from "../view/bubblemsg/bycmd/SEND_GIFT/BubbleSendGiftView";
import {MsgManager} from "../manager/MsgManager";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";

class BubbleBliveComponentSendGift extends BubbleBliveComponentByCmd<SendGift, BliveBubbleSendGiftMsg> {
    cmd: string = "SEND_GIFT";

    public genSender(rawBliveMsg: SendGift): Sender {
        const sender: Sender = this.genSenderFromUidAndUname(rawBliveMsg.data.uid, rawBliveMsg.data.uname)
        const medalInfo = rawBliveMsg.data.medal_info
        sender.userMedal =  {
            name: medalInfo.medal_name,
            belong2Name: medalInfo.anchor_uname,
            belong2RoomId: medalInfo.anchor_roomid,
            color: `${medalInfo.medal_color}`,
            level: medalInfo.medal_level
        }
        return sender;
    }

    genBliveBubbleMsg(rawBliveMsg: SendGift): BliveBubbleSendGiftMsg {
        const theme = new BliveBubbleTheme();
        theme.background = "rgb(255, 193, 110)";
        return new BliveBubbleSendGiftMsg(
            `bili-SEND_GIFT-${rawBliveMsg.data.timestamp}-${rawBliveMsg.data.rnd}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg)),
            giftStaticInfos.get(rawBliveMsg.data.giftId)!,
            300000,
            theme
        );
    }

    viewClassType: React.ClassType<{ msg: BliveBubbleSendGiftMsg }, any, any> = BubbleSendGiftView;

    registerMsg(msg: BliveBubbleSendGiftMsg, msgManager: MsgManager) {
        msgManager.registerSendGiftMsg(msg);
    }

    unRegisterMsg(msg: BliveBubbleSendGiftMsg, msgManager: MsgManager) {
        msgManager.unRegisterSendGiftMsg(msg);
    }
}

const sendGiftComponent = new BubbleBliveComponentSendGift();

export default sendGiftComponent;