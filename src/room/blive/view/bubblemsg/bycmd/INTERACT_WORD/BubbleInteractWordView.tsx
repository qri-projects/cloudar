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
                    <span className="emoji">🎈</span>
                    来看你咯~
                    <span className="emoji">🎈</span>
                </div>
            }
        ],
        [
            2,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"attention"}>
                    <span className="emoji">✨</span>
                    关注了直播间
                    <span className="emoji">✨</span>
                </div>
            }
        ],
        [
            3,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"share"}>
                    <span className="emoji">🎈</span>
                    分享了直播间
                    <span className="emoji">🎈</span>
                </div>
            }
        ],
        [
            4,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"specialAttention"}>
                    <span className="emoji">✨🎈✨</span>特别关注了直播间<span className="emoji">✨🎈✨</span></div>
            }
        ],
        [
            5,
            (msg: BliveBubbleInteractWordMsg) => {
                return <div className={"mutualAttention"}><span className="emoji">✨🎈✨</span>互粉了主播<span className="emoji">✨🎈✨</span></div>
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