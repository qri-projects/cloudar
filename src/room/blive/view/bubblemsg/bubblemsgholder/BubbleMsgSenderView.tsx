import React from "react";
import {Sender} from "../../../../../normal/NormalMsg";
import "./BubbleMsgSenderView.scss"

export default class BubbleMsgSenderView extends React.Component<{ sender: Sender }, any> {
    constructor(props: { sender: Sender }) {
        super(props);
        console.log("bubbleMsgSenderView init")
    }

    render() {
        return <span className={"bubbleMsgSender"}>
            {/*头像*/}
            <a href={`https://space.bilibili.com/${this.props.sender.uniqueId}`} target="_blank">
                <span className={"bubbleMsgSenderHeadImgHolder"}>
                    <img src={this.props.sender.avatar} alt=""/>
                </span>
            </a>

            {/*姓名*/}
            <div className={"bubbleMsgSenderNameHolder"} title={this.props.sender.name}>
                {this.props.sender.name}
            </div>
        </span>
    }
}