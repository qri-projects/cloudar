import React, {ClassType, ReactNode, RefObject} from "react";

import CSS from 'csstype';
import BubblePlaceRegistry from "../../BubblePlaceRegistry";
import BubbleMsgSenderView from "./BubbleMsgSenderView";
import "./BubbleMsgHolderView.scss";
import {Sender} from "../../../../../normal/NormalMsg";
import Place from "../../BubblePlace";
import {BliveBubbleMsg} from "../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {appContext, BliveBubbleApplication} from "../../../BliveBubbleRoom";

export default class BubbleMsgHolderView extends React.Component<BubbleMsgHolderViewProp, BubbleMsgHolderViewState> {
    private timerInterval = 200;
    thisRef: RefObject<any> = React.createRef<any>();

    constructor(props: BubbleMsgHolderViewProp) {
        super(props);
        this.state = {
            bgColor: {r: 145, g: 164, b: 255, a: 1},
            place: {x: 0, y: 0, width: 0, height: 0},
            opacity: 0
        };
    }

    componentDidMount() {
        BubbleMsgHolderView.contextType = appContext
        const width = this.thisRef.current!.clientWidth;
        const height = this.thisRef.current!.clientHeight;

        const position = this.props.placeRegistry.getPosition({width, height});
        const place = {...position, width, height};
        this.setState({"place": place, "opacity": 1})
        this.props.placeRegistry.registerUsePlace(place)
        this.refreshRemainLoop()
    }

    refreshRemainLoop() {
        const that = this;
        setTimeout(() => {
            let m = that.props.msg;
            m.remainMillSeconds -= that.timerInterval;
            let bgA = (m.remainMillSeconds / m.initRemainMillSeconds);
            if (bgA > 0) {
                that.setState({opacity: bgA})
                that.refreshRemainLoop();
            } else {
                // 销毁
                (that.context as BliveBubbleApplication).msgManager.unRegisterMsg(that.props.msg);
            }
        }, that.timerInterval)
    }

    render() {
        return <div className={"bubbleMsg"} ref={this.thisRef} style={
            {
                left: `${this.state.place.x}%`,
                top: `${this.state.place.y}%`,
                opacity: `${this.state.opacity}`
            }
        }>
            {/*头像*/}
            <div className={"bubbleMsgSendersHolder"}>
                {
                    this.props.msg.senders?.map(sender =>
                        <BubbleMsgSenderView key={sender.uniqueId} sender={sender}/>
                    )
                }
            </div>

            <div className={"bubbleMsgContentHolder"} style={{
                background: this.props.msg.theme.background
            }}>
                {this.props.children}
            </div>
        </div>;
    }
}

export interface BubbleMsgHolderViewProp {
    msg: BliveBubbleMsg<any>,
    placeRegistry: BubblePlaceRegistry
}

export interface BubbleMsgHolderViewState {
    bgColor: {
        r: number,
        g: number,
        b: number,
        a: number
    },
    opacity: number,
    place: Place
}