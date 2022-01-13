import React, {ClassType} from "react";

import {BaseBliveMsg} from "../msgsource/bubbleblivetypes/BliveMsg";
import {Sender} from "../../../normal/NormalMsg";
import {BliveBubbleMsg} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {MsgManager} from "../manager/MsgManager";
import biliUserInfoManager from "../manager/biliUserInfoManager";

/**
 * 这个类的子类都要做无状态和单例
 */
export abstract class BubbleBliveComponentByCmd<BaseBliveMsgType extends BaseBliveMsg, BliveBubbleMsgType extends BliveBubbleMsg<BaseBliveMsgType>> {
    abstract cmd: string;

    abstract viewClassType: ClassType<{ msg: BliveBubbleMsgType }, any, any>;

    abstract genBliveBubbleMsg(rawBliveMsg: BaseBliveMsgType): BliveBubbleMsgType

    genReactComponent(bliveBubbleMsg: BliveBubbleMsgType): React.ReactNode {
        return React.createElement(this.viewClassType, {key: bliveBubbleMsg.uniqueId, msg: bliveBubbleMsg});
    }

    // 利用这个类做方法表驱动
    // 实现里应该调用一次msgManager.registerNormalMsg(msg);
    registerMsg(msg: BliveBubbleMsgType, msgManager: MsgManager) {
        msgManager.registerNormalMsg(msg);
    }

    // 实现里应该调用一次msgManager.unRegisterNormalMsg(msg);
    unRegisterMsg(msg: BliveBubbleMsgType, msgManager: MsgManager) {
        return msgManager.unRegisterNormalMsg(msg);
    }


    genSenderFromUidAndUname(uid: number, uname: string): Sender {
            let userId = uid
            const sender: Sender = {
                uniqueId: `${userId}`,
                name: uname,
                avatar: `https://pic.ggemo.com/6050612487861686.jpg`,
            }
            biliUserInfoManager.getUserInfo(userId)
                .then(uerInfo => {
                    sender.avatar = uerInfo?.face ?? `http://cdn.flrscn.tech/avatar-302/${userId}`
                });
            return sender

    }
}
