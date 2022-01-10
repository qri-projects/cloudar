import {Danmaku, SendGift} from "./BliveMsg";
import {Sender} from "../../../../normal/NormalMsg";

export interface BliveBubbleMsg<RawMsg> {
    uniqueId: string
    raw: RawMsg
    senders: Array<Sender>
}

export interface BliveBubbleSendGiftMsg extends BliveBubbleMsg<SendGift> {
    giftStatic: GiftStatic
}

export interface BliveBubbleDanmuMsg extends BliveBubbleMsg<Danmaku> {

}

