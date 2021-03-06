import React, {ClassType, RefObject} from "react";
import BubbleMsgHolderView from "./bubblemsg/bubblemsgholder/BubbleMsgHolderView";
import bubblePlaceRegistry from "./BubblePlaceManager";
import CSS from "csstype";
import {BaseBliveMsg} from "../msgsource/bubbleblivetypes/BliveMsg";
import {BliveBubbleMsg} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubblePlaceManager from "./BubblePlaceManager";
import bubbleBliveComponentsByCmd from "../bubbleblivecomponent/bubbleBliveComponts";
import {BubbleBliveComponentByCmd} from "../bubbleblivecomponent/BubbleBliveComponentByCmd";
import "./BubblePanel.scss"
import {AppContext, BliveBubbleApplication} from "../BubbleContextManager";

export default class BubblePanel extends React.Component<{ msgs: Array<BliveBubbleMsg<BaseBliveMsg>> }, any> {
    style: CSS.Properties = {
        position: "absolute",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    }

    ref: RefObject<any> = React.createRef()

    constructor(props: any) {
        super(props);
        BubblePanel.contextType = AppContext;
    }

    render() {
        return <div style={this.style} ref={this.ref}>
            {
                this.props.msgs.map(
                    (m) => {
                        if (!bubbleBliveComponentsByCmd.has(m.raw.cmd)) {
                            return <span key={Math.ceil(Math.random() * 1000)}>{JSON.stringify(m)}</span>
                        }
                        const bubbleBliveComponent: BubbleBliveComponentByCmd<any, any> = bubbleBliveComponentsByCmd.get(m.raw.cmd)!;
                        return <BubbleMsgHolderView key={m.uniqueId} msg={m}>
                            {bubbleBliveComponent.genReactComponent(m)}
                        </BubbleMsgHolderView>
                    }
                )
            }
        </div>;
    }

    componentDidMount() {
        console.log(BubblePanel.contextType);
        console.log("context", this.context);
        (this.context as BliveBubbleApplication).placeManager.setScale({
            width: this.ref.current.clientWidth,
            height: this.ref.current.clientHeight
        })
    }
}
