import React from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {BliveBubbleSendGiftMsg} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";

export default class BubbleInteractWordView extends BubbleViewByCmd<BliveBubbleSendGiftMsg, { giftData?: BliveBubbleSendGiftMsg }> {
    render() {
        return <BubbleMsgHolderView senders={this.props.msg.senders}>
            <div style={{
                fontWeight: 1000
            }}>
                来咯~
            </div>
        </BubbleMsgHolderView>;
    }
}