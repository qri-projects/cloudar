import {Danmaku} from "../msgsource/bubbleblivetypes/BliveMsg";
import {BliveBubbleDanmuMsg} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender} from "../../../normal/NormalMsg";
import BubbleDanmakuMsgView from "../view/bubblemsg/bycmd/DANMU_MSG/BubbleDanmakuMsgView";
import {MsgManager} from "../manager/MsgManager";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";

class BubbleBliveComponentDanmaku extends BubbleBliveComponentByCmd<Danmaku, BliveBubbleDanmuMsg> {
    cmd = "DANMU_MSG"

    public genSender(rawBliveMsg: Danmaku): Sender {
        return this.genSenderFromUidAndUname(rawBliveMsg.info[2][0], rawBliveMsg.info[2][1])
    }


    genBliveBubbleMsg(rawBliveMsg: Danmaku): BliveBubbleDanmuMsg {
        return new BliveBubbleDanmuMsg(
            `bili-bubble-DANMU_MSG-${rawBliveMsg.info[0][4]}-${rawBliveMsg.info[0][5]}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg))
        );
    }

    viewClassType = BubbleDanmakuMsgView;

    registerMsg(msg: BliveBubbleDanmuMsg, msgManager: MsgManager): BliveBubbleDanmuMsg | null {
        return msgManager.registerDanmakuMsg(msg);
    }
}

const danmakuComponent = new BubbleBliveComponentDanmaku();

export default danmakuComponent;