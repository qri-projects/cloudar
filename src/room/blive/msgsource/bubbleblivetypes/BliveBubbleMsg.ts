import {Danmaku, SendGift} from "./BliveMsg";
import {Sender} from "../../../../normal/NormalMsg";
import {GiftStatic} from "./BubbleBliveCommon";

export class BliveBubbleMsg<RawMsg> {
    uniqueId: string
    raw: RawMsg
    senders: Array<Sender>
    remainMillSeconds: number
    initRemainMillSeconds: number

    constructor(uniqueId: string, raw: RawMsg, senders: Array<Sender>, remainMillSeconds: number = 30000) {
        this.uniqueId = uniqueId;
        this.raw = raw;
        this.senders = senders;
        this.remainMillSeconds = remainMillSeconds
        this.initRemainMillSeconds = remainMillSeconds
    }
}

export class BliveBubbleSendGiftMsg extends BliveBubbleMsg<SendGift> {
    giftStatic: GiftStatic



    constructor(uniqueId: string, raw: SendGift, senders: Array<Sender>, giftStatic: GiftStatic, remainMillSeconds: number = 30000) {
        super(uniqueId, raw, senders, remainMillSeconds);
        this.giftStatic = giftStatic;
    }
}

export class BliveBubbleDanmuMsg extends BliveBubbleMsg<Danmaku> {
    genMsgFuduId(): string {
        return this.raw.info[1]
    }
}

