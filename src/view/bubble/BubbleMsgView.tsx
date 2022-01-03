import React from "react";
import BubbleMsg from "./BubbleMsg";
import cloudarTimer from "../../normal/CloudarTimer";
import CSS from 'csstype';

export default class BubbleMsgView extends React.Component<{ msg: BubbleMsg }, any> {
    style: CSS.Properties = {
        position: "absolute",
    }

    constructor(props: { msg: BubbleMsg }) {
        super(props);
        this.state = {value: ''};
        this.style.left = `${this.props.msg.place.x}px`
        this.style.top = `${this.props.msg.place.y}px`
        this.style.width = `${this.props.msg.place.width}px`
        this.style.height = `${this.props.msg.place.height}px`

    }

    render() {
        return <div style={this.style}>
            {this.props.msg.msg.content}
        </div>;
    }
}