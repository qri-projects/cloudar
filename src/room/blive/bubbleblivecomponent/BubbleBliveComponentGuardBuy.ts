import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";
import {GuardBuy, InteractWord, SendGift} from "../msgsource/bubbleblivetypes/BliveMsg";
import {
    BliveBubbleEntryEffectMsg,
    BliveBubbleGuardBuyMsg,
    BliveBubbleSendGiftMsg
} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {Sender} from "../../../normal/NormalMsg";
import BubbleGuardBuyView from "../view/bubblemsg/bycmd/GUARD_BUY/BubbleGuardBuyView";

class BubbleBliveComponentGuardBuy extends BubbleBliveComponentByCmd<GuardBuy, BliveBubbleGuardBuyMsg> {
    cmd: string = "GUARD_BUY";

    genSender(rawBliveMsg: GuardBuy): Sender {
        return this.genSenderFromUidAndUname(rawBliveMsg.data.uid, rawBliveMsg.data.username)
    }

    genBliveBubbleMsg(rawBliveMsg: GuardBuy): BliveBubbleGuardBuyMsg {
        return new BliveBubbleGuardBuyMsg(
            `bili-GUARD_BUY-${rawBliveMsg.data.start_time}-${rawBliveMsg.data.uid}`,
            rawBliveMsg,
            new Array<Sender>(this.genSender(rawBliveMsg)),
            600000,
        );
    }

    viewClassType: React.ClassType<{ msg: BliveBubbleGuardBuyMsg }, any, any> = BubbleGuardBuyView;

}

const guardBuyComponent = new BubbleBliveComponentGuardBuy();

export default guardBuyComponent;