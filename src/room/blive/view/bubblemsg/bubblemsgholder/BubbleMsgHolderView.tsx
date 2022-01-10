import React, {ClassType, ReactNode, RefObject} from "react";

import CSS from 'csstype';
import BubblePlaceRegistry from "../../BubblePlaceRegistry";
import BubbleMsgSenderView from "./BubbleMsgSenderView";
import "./BubbleMsgHolderView.scss";
import {Sender} from "../../../../../normal/NormalMsg";
import Place from "../../BubblePlace";

export default class BubbleMsgHolderView extends React.Component<BubbleMsgHolderViewProp, BubbleMsgHolderViewState> {

    thisRef: RefObject<any> = React.createRef<any>();

    constructor(props: BubbleMsgHolderViewProp) {
        super(props);
        this.state = {
            bgOpacity: 66,
            bgColor: {r: 130, g: 151, b: 255},
            hidden: true,
            place: {x: 0, y: 0, width: 0, height: 0}
        };
    }

    componentDidMount() {
        const width = this.thisRef.current!.clientWidth;
        const height = this.thisRef.current!.clientHeight;

        const position = this.props.placeRegistry.getPosition({width, height});
        const place = {...position, width, height};
        this.setState({"place": place, "hidden": false})
        this.props.placeRegistry.registerUsePlace(place)
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.setState({...this.state, bgOpacity: this.state.bgOpacity - 1})
            }, 3000 * i)
        }
    }

    render() {
        return <div className={"bubbleMsg"} ref={this.thisRef} style={
            {
                display: this.state.hidden ? "none" : "unset",
                left: `${this.state.place.x}%`,
                top: `${this.state.place.y}%`
            }
        }>
            {/*头像*/}
            <div className={"bubbleMsgSendersHolder"}>
                {
                    this.props.senders?.map(sender =>
                        <BubbleMsgSenderView key={sender.uniqueId} sender={sender}/>
                    )
                }
            </div>

            <div className={"bubbleMsgContentHolder"} style={{
                background: `rgba(${this.state.bgColor.r}, ${this.state.bgColor.g},${this.state.bgColor.b},${this.state.bgOpacity}%)`
            }}>
                {this.props.children}
            </div>
        </div>;
    }
}

export interface BubbleMsgHolderViewProp {
    senders: Array<Sender>,
    placeRegistry: BubblePlaceRegistry
}

export interface BubbleMsgHolderViewState {
    bgOpacity: number,
    bgColor: {
        r: number,
        g: number,
        b: number
    },
    hidden: boolean,
    place: Place
}