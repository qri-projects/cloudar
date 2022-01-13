import React, {Context} from "react";
import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import BubblePanel from "./view/BubblePanel";
import {MsgManager} from "./manager/MsgManager";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg} from "./msgsource/bubbleblivetypes/BliveMsg";

export class BliveBubbleApplication {
    roomId: number;
    msgSource;
    msgManager: MsgManager = new MsgManager();

    constructor(roomId: number) {
        this.roomId = roomId;
        this.msgSource = new BLiveMsgSource(roomId);
    }
}

export const appContext: Context<BliveBubbleApplication> = React.createContext<BliveBubbleApplication>(new BliveBubbleApplication(336119));

export default class BliveBubbleRoom extends React.Component<BliveRoomProp, BliveRoomState> {
    app = new BliveBubbleApplication(this.props.roomId);


    constructor(props: BliveRoomProp) {
        super(props);

        this.state = {
            msgsHolder: new Array<BliveBubbleMsg<BaseBliveMsg>>()
        };
    }

    render() {
        return <appContext.Provider value={this.app}>
            <BubblePanel msgs={this.state.msgsHolder} />
        </appContext.Provider>
    }

    componentDidMount() {
        const that = this;
        that.app.msgSource.registerOnMsg(msg => {
            that.app.msgManager.registerMsg(msg);
        })

        that.app.msgManager.registerOnChange((allMsg) => {
            that.setState({msgsHolder: allMsg})
        })
        that.app.msgSource.start()
    }
}

export interface BliveRoomProp {
    roomId: number
}

interface BliveRoomState {
    msgsHolder: Array<BliveBubbleMsg<BaseBliveMsg>>
}