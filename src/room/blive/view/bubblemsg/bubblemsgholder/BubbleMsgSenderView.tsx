import React from "react";
import {Sender} from "../../../../../normal/NormalMsg";
import "./BubbleMsgSenderView.scss"

export default class BubbleMsgSenderView extends React.Component<{ sender: Sender }, any> {
    render() {
        return <span className={"bubbleMsgSender"}>
            {/*头像*/}
            <span className={"bubbleMsgSenderHeadImgHolder"}>
                <img src={this.props.sender.avatar} alt=""/>
            </span>

            {/*姓名*/}
            <div className={"bubbleMsgSenderNameHolder"}>
                {this.props.sender.name}
            </div>
        </span>
    }
}