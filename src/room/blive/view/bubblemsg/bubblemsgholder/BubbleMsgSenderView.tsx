import React from "react";
import {Sender} from "../../../../../normal/NormalMsg";
import "./BubbleMsgSenderView.scss"

export default class BubbleMsgSenderView extends React.Component<{ sender: Sender }, any> {
    constructor(props: { sender: Sender }) {
        super(props);
    }

    render() {
        let userMedalComponent = undefined;
        const medalColor = this.props.sender.userMedal?.color;
        if (this.props.sender.userMedal && this.props.sender.userMedal?.level) {
            userMedalComponent = (<div className={"userMedalHolder"} style={{
                borderColor: medalColor
            }}>
                <div className={"userMedalLevel"} style={{
                    color: medalColor
                }}>{this.props.sender.userMedal.level}</div>
                <div className={"userMedalName"} style={{
                    backgroundColor: medalColor
                }}>{this.props.sender.userMedal.name}</div>
            </div>)
        }
        return (
        <span className={"bubbleMsgSender"}>
            {userMedalComponent}
            {/*头像*/}

            <div>
                <a href={`https://space.bilibili.com/${this.props.sender.uniqueId}`}
                   target="_blank">
                    <span className={"bubbleMsgSenderHeadImgHolder"}>
                        <img src={this.props.sender.avatar} alt=""/>
                    </span>
                </a>
            </div>

            {/*姓名*/}
            <div className={"bubbleMsgSenderNameHolder"} title={this.props.sender.name}>
                {this.props.sender.name}
            </div>
        </span>
        )
    }
}