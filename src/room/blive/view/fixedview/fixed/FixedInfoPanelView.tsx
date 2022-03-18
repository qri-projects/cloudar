import React from "react";
import {AppContext} from "../../../BubbleContextManager";
import {HeartBeat} from "../../../msgsource/bubbleblivetypes/BliveMsg";
import cloudarTimer from "../../../../../normal/CloudarTimer";
import {number2Str} from "../../../../../normal/NumberHelper";
import "./FixedInfoPanelView.scss"

export default class FixedInfoPanelView extends React.Component<any, QiRenState> {


    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            qiRenZhi: 0,
            times: {
                h: "00",
                m: "00",
                s: "00"
            }
        }
    }

    componentDidMount() {
        const that = this;
        setInterval(() => {
            const date = new Date();

            this.setState({times: {
                    h: number2Str(date.getHours(), 2),
                    m: number2Str(date.getMinutes(), 2),
                    s: number2Str(date.getSeconds(), 2)
                }})
        }, 200)
    }

    setQiRenValue(v: number) {
        this.setState({qiRenZhi: v})
    }

    render() {
        return (<span style={{
            position: "absolute",
            bottom: "0",
            left: "50px",
            fontWeight: 700,
            textShadow: "1px 0 1px white, 0 1px 1px white, -1px 0 1px white, 0 -1px 1px white",
            color: "#8c94ff"
        }}>
            <div>气人值: {this.state.qiRenZhi}</div>
            <div>
                {this.state.times.h}
                <span className={"blink"}>:</span>
                {this.state.times.m}
                <span className={"blink"}>:</span>
                {this.state.times.s}
            </div>
        </span>);
    }
}

export interface QiRenProps {
}

export interface QiRenState {
    qiRenZhi: number
    times: {
        h: string
        m: string
        s: string
    }
}