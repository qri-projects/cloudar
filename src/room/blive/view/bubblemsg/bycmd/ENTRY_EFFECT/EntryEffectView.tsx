import BubbleViewByCmd from "../BubbleViewByCmd";
import {
    BliveBubbleEntryEffectMsg,
    BliveBubbleInteractWordMsg
} from "../../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import React from "react";

export default class EntryEffectView extends BubbleViewByCmd<BliveBubbleEntryEffectMsg, any> {
    render() {
        return <div style={{
            fontWeight: 600
        }}>
            <div className={"entry"}><span className="emoji">🎈✨✨</span>来看你咯~<span className="emoji">✨✨🎈</span></div>
        </div>;
    }
}