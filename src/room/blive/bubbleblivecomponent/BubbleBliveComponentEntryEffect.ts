import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";
import {Danmaku, EntryEffect} from "../msgsource/bubbleblivetypes/BliveMsg";
import {
    BliveBubbleDanmuMsg, BliveBubbleEntryEffectMsg,
    BliveBubbleInteractWordMsg,
    BliveBubbleMsg, BliveBubbleTheme
} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender} from "../../../normal/NormalMsg";
import BubbleDanmakuMsgView from "../view/bubblemsg/bycmd/DANMU_MSG/BubbleDanmakuMsgView";
import {MsgManager} from "../manager/MsgManager";
import EntryEffectView from "../view/bubblemsg/bycmd/ENTRY_EFFECT/EntryEffectView";

class BubbleBliveComponentEntryEffect extends BubbleBliveComponentByCmd<EntryEffect, BliveBubbleEntryEffectMsg> {
    cmd = "ENTRY_EFFECT"

    public genSender(rawBliveMsg: EntryEffect): Sender {
        return this.genSenderFromUidAndUname(rawBliveMsg.data.uid, rawBliveMsg.data.copy_writing.split("%")[1])
    }

    genBliveBubbleMsg(rawBliveMsg: EntryEffect): BliveBubbleEntryEffectMsg {
        const theme = new BliveBubbleTheme();
        theme.background = "rgb(255, 193, 110)";
        return new BliveBubbleEntryEffectMsg(
            `bili-ENTRY_EFFECT-${rawBliveMsg.data.trigger_time}-${rawBliveMsg.data.uid}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg)),
            120000,
            theme
        );
    }

    viewClassType = EntryEffectView;
}

const entryEffectComponent = new BubbleBliveComponentEntryEffect();

export default entryEffectComponent;