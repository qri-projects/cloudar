import {Danmaku, EntryEffect, InteractWord, SendGift} from "./BliveMsg";
import {Sender} from "../../../../normal/NormalMsg";
import {GiftStatic} from "./BubbleBliveCommon";

export class BliveBubbleMsg<RawMsg> {
    uniqueId: string
    raw: RawMsg
    senders: Array<Sender>
    remainMillSeconds: number
    initRemainMillSeconds: number
    theme: BliveBubbleTheme

    constructor(uniqueId: string, raw: RawMsg, senders: Array<Sender>, remainMillSeconds: number = 300000, theme: BliveBubbleTheme = new BliveBubbleTheme()) {
        this.uniqueId = uniqueId;
        this.raw = raw;
        this.senders = senders;
        this.remainMillSeconds = remainMillSeconds
        this.initRemainMillSeconds = remainMillSeconds
        this.theme = theme
    }
}

export class BliveBubbleTheme {
    background: string = "rgba(145, 164, 255, 1)"
    avatarBorderImgUrl?: string
    labelImgUrl?: string
}

export class BliveBubbleSendGiftMsg extends BliveBubbleMsg<SendGift> {
    giftStatic: GiftStatic

    constructor(uniqueId: string, raw: SendGift, senders: Array<Sender>, giftStatic: GiftStatic, remainMillSeconds: number = 300000, theme: BliveBubbleTheme = new BliveBubbleTheme()) {
        super(uniqueId, raw, senders, remainMillSeconds);
        this.giftStatic = giftStatic;
    }
}

export class BliveBubbleDanmuMsg extends BliveBubbleMsg<Danmaku> {
    genMsgFuduId(): string {
        return this.raw.info[1]
    }
}

export class BliveBubbleInteractWordMsg extends BliveBubbleMsg<InteractWord> {
}

export class BliveBubbleEntryEffectMsg extends BliveBubbleMsg<EntryEffect> {
}

