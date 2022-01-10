import React, {ClassType, RefObject} from "react";
import BubbleMsgHolderView from "./bubblemsg/bubblemsgholder/BubbleMsgHolderView";
import bubblePlaceRegistry from "./BubblePlaceRegistry";
import CSS from "csstype";
import {BaseBliveMsg} from "../msgsource/bubbleblivetypes/BliveMsg";
import bubbleBliveComponentsByCmd, {BubbleBliveComponentByCmd} from "../bubbleblivecomponent/BubbleBliveComponentByCmd";

// msgs: Array<BaseBliveMsg>
export default class BubblePanel extends React.Component<any, { msgs: Array<BaseBliveMsg> }> {
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
            msgs: new Array<BaseBliveMsg>()
        }
    }

    public registerMsg(msg: BaseBliveMsg) {
        let msgs = this.state.msgs
        msgs.push(msg)
        this.setState({"msgs": [...msgs]})
    }

    render() {
        return <div style={this.style} ref={this.ref}>
            {
                this.state.msgs.map(
                    (m) => {
                        if (!bubbleBliveComponentsByCmd.has(m.cmd)) {
                            return <span key={Math.ceil(Math.random() * 1000)}>{JSON.stringify(m)}</span>
                        }
                        const bubbleBliveComponent: BubbleBliveComponentByCmd<any, any> = bubbleBliveComponentsByCmd.get(m.cmd)!;
                        return bubbleBliveComponent.genReactComponent(m)
                    }
                )
            }
        </div>;
    }

    componentDidMount() {
        bubblePlaceRegistry.setScale({width: this.ref.current.clientWidth, height: this.ref.current.clientHeight})
    }
}