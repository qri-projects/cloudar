import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleDanmuMsg, BliveBubbleGuardBuyMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import React from "react";
import {guardGiftStaticInfos} from "../../../../manager/giftStaticManager";
import "../SEND_GIFT/BubbleSendGiftView.scss";

export default class BubbleGuardBuyView extends BubbleViewByCmd<BliveBubbleGuardBuyMsg, any>{

    constructor(props: { msg: BliveBubbleGuardBuyMsg }, context: any) {
        super(props, context);
    }

    render() {
        const giftInfo = guardGiftStaticInfos.get(this.props.msg.raw.data.guard_level)!;
        return <div className={"bubbleSendGift"}>
                <span className={"bubbleSendGiftGiftHolder"}>
                    <img src={giftInfo.img} alt=""/>
                    {giftInfo.name}
                </span>
            <span> * {this.props.msg.raw.data.num}</span>
        </div>;
    }
}