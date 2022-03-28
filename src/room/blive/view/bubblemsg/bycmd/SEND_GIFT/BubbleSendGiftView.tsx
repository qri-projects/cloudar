import React from "react";

import {BliveBubbleMsg, BliveBubbleSendGiftMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import "./BubbleSendGiftView.scss"
import BubbleViewByCmd from "../BubbleViewByCmd";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";

export default class BubbleSendGiftView extends BubbleViewByCmd<BliveBubbleSendGiftMsg, { giftData?: BliveBubbleSendGiftMsg }> {
    constructor(props: { msg: BliveBubbleSendGiftMsg }, context: any) {
        super(props, context);
        this.state = {
            giftData: undefined
        }
    }

    render() {
        return <div className={"bubbleSendGift"}>
                <span className={"bubbleSendGiftGiftHolder"}>
                    <img src={this.props.msg?.giftStatic.gif} alt=""/>
                    {this.props.msg.raw.data.giftName}
                </span>
                <span> * {this.props.msg.raw.data.num}</span>
            </div>;
    }
}