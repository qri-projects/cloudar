import React, {RefObject} from "react";
import BubbleMsg from "./BubbleMsg";
import BubbleMsgView from "./BubbleMsgView";
import NormalMsg from "../../normal/NormalMsg";
import bubbleThemeAdaptor from "./BubbleThemeAdaptor";
import Panel from "../../normal/Panel";
import bubblePlaceRegistry from "./BubblePlaceRegistry";
import CSS from "csstype";
export default class BubblePanel extends Panel<any, { msgs: Array<BubbleMsg> }> {
    style: CSS.Properties = {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    }

    ref: RefObject<any> = React.createRef()

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
        return <div style={this.style} ref={this.ref}>
            {this.state.msgs.map((m:BubbleMsg) => <BubbleMsgView key={m.msg.uniqueId} msg={m} />)}
        </div>;
    }

    componentDidMount() {
        bubblePlaceRegistry.setScale({width: this.ref.current.clientWidth, height: this.ref.current.clientHeight})
    }
}