import React from "react";
import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import BubblePanel from "./view/BubblePanel";
import {GiftStatic} from "./msgsource/bubbleblivetypes/BubbleBliveCommon";
import {MsgManager} from "./manager/MsgManager";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg} from "./msgsource/bubbleblivetypes/BliveMsg";
import BubblePlaceRegistry from "./view/BubblePlaceRegistry";

export default class BliveBubbleRoom extends React.Component<BliveRoomProp, BliveRoomState> {
    constructor(props: BliveRoomProp) {
        super(props);
        let msgManager: MsgManager = new MsgManager();
        let msgSource = new BLiveMsgSource(this.props.roomId);

        this.state = {
            msgsHolder: msgManager.allMsgs
        };

        const that = this;
        msgSource.registerOnMsg(msg => {
            let msgsRegistered: Array<BliveBubbleMsg<BaseBliveMsg>> = msgManager.registerMsg(msg);
            console.log("msgsRegistered: ", msgsRegistered)
            that.setState({ "msgsHolder": [...msgsRegistered]})
        })
    }

    render() {
        return <BubblePanel msgs={this.state.msgsHolder} />
    }
}

export interface BliveRoomProp {
    roomId: number
}

interface BliveRoomState {
    msgsHolder: Array<BliveBubbleMsg<BaseBliveMsg>>
}