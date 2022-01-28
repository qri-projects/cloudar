import {Danmaku} from "../msgsource/bubbleblivetypes/BliveMsg";
import {BliveBubbleDanmuMsg} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender, UserMedal} from "../../../normal/NormalMsg";
import BubbleDanmakuMsgView from "../view/bubblemsg/bycmd/DANMU_MSG/BubbleDanmakuMsgView";
import {MsgManager} from "../manager/MsgManager";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";
import {from10Int2Css} from "../../../normal/ColorHelper";

class BubbleBliveComponentDanmaku extends BubbleBliveComponentByCmd<Danmaku, BliveBubbleDanmuMsg> {
    cmd = "DANMU_MSG"

    public genSender(rawBliveMsg: Danmaku): Sender {
        const userMedalInfo = this.genUserMedalInfo(rawBliveMsg);
        const userInfo = this.genSenderFromUidAndUname(rawBliveMsg.info[2][0], rawBliveMsg.info[2][1]);
        userInfo.userMedal = userMedalInfo;
        return userInfo
    }


    genBliveBubbleMsg(rawBliveMsg: Danmaku): BliveBubbleDanmuMsg {
        return new BliveBubbleDanmuMsg(
            `bili-bubble-DANMU_MSG-${rawBliveMsg.info[0][4]}-${rawBliveMsg.info[0][5]}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg))
        );
    }

    viewClassType = BubbleDanmakuMsgView;

    registerMsg(msg: BliveBubbleDanmuMsg, msgManager: MsgManager) {
        msgManager.registerDanmakuMsg(msg);
    }


    unRegisterMsg(msg: BliveBubbleDanmuMsg, msgManager: MsgManager): void {
        msgManager.unRegisterDanmakuMsg(msg);
    }


    genUserMedalInfo(msg: Danmaku): UserMedal | undefined {
        const info = msg.info[3];
        if (!info || info.length <= 0) {
            return undefined;
        }
        const userMedal: UserMedal = {
            level: info[0],
            name: info[1],
            belong2Name: info[2],
            belong2RoomId: info[3],
            color: from10Int2Css(info[4])
        }
        return userMedal;
    }
}

const danmakuComponent = new BubbleBliveComponentDanmaku();

export default danmakuComponent;