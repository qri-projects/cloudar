import React, {ReactNode} from "react";
import BubbleViewByCmd from "../BubbleViewByCmd";
import {
    BliveBubbleInteractWordMsg,
    BliveBubbleSendGiftMsg
} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubbleMsgHolderView from "../../bubblemsgholder/BubbleMsgHolderView";
import "../../../normal/emoji.scss"

export default class BubbleInteractWordView extends BubbleViewByCmd<BliveBubbleInteractWordMsg, any> {
    static MsgType2ElementGeneratorMap: Map<number, (msg: BliveBubbleInteractWordMsg) => JSX.Element>
        = new Map<number, (msg: BliveBubbleInteractWordMsg) => JSX.Element>([
        [
            1,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"entry"}>
                    <span className="emoji">π</span>
                    ζ₯ηδ½ ε―~
                    <span className="emoji">π</span>
                </div>
            }
        ],
        [
            2,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"attention"}>
                    <span className="emoji">β¨</span>
                    ε³ζ³¨δΊη΄ζ­ι΄
                    <span className="emoji">β¨</span>
                </div>
            }
        ],
        [
            3,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"share"}>
                    <span className="emoji">π</span>
                    εδΊ«δΊη΄ζ­ι΄
                    <span className="emoji">π</span>
                </div>
            }
        ],
        [
            4,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"specialAttention"}>
                    <span className="emoji">β¨πβ¨</span>ηΉε«ε³ζ³¨δΊη΄ζ­ι΄<span className="emoji">β¨πβ¨</span></div>
            }
        ],
        [
            5,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"mutualAttention"}><span className="emoji">β¨πβ¨</span>δΊη²δΊδΈ»ζ­<span className="emoji">β¨πβ¨</span></div>
            }
        ]
    ])

    render() {
        return <div style={{
            fontWeight: 600
        }}>
            {
                (BubbleInteractWordView.MsgType2ElementGeneratorMap.get(this.props.msg.raw.data.msg_type))
                    ?.call(this, this.props.msg)
            }
        </div>;
    }
}