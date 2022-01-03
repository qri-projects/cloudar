import React from "react";
import BubbleMsg from "./BubbleMsg";
import BubbleMsgView from "./BubbleMsgView";
import NormalMsg from "../../normal/NormalMsg";
import bubbleThemeAdaptor from "./BubbleThemeAdaptor";
import Panel from "../../normal/Panel";
export default class BubblePanel extends Panel<any, { msgs: Array<BubbleMsg> }> {

    constructor(props: any) {
        super(props);
        this.state = {
            msgs: new Array<BubbleMsg>()
        }
    }

    public registerMsg(msg: NormalMsg) {
        let msgs =  this.state.msgs
        msgs.push(bubbleThemeAdaptor.convert(msg))
        this.setState({"msgs": [...msgs]})
    }

    render() {
        return <div>111111111111
            {this.state.msgs.map((m:BubbleMsg, i) =><BubbleMsgView key={i} msg={m} />)}
        </div>;
    }


}