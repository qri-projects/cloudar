import React from "react";
import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import BubblePanel from "./view/BubblePanel";

export default class BliveBubbleRoom extends React.Component<BliveRoomProp, BliveRoomState> {
    panelRef = React.createRef<BubblePanel>();

    constructor(props: BliveRoomProp) {
        super(props);
        let msgSource = new BLiveMsgSource(this.props.roomId);

        msgSource.registerOnMsg(msg => {
            this.panelRef.current?.registerMsg(msg);
        })

        this.state = {
            msgSource
        };
    }

    render() {
        return <BubblePanel ref={this.panelRef}/>
    }
}

export interface BliveRoomProp {
    roomId: number
}

interface BliveRoomState {
    msgSource: BLiveMsgSource
}