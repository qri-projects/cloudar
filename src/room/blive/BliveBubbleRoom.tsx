import React, {Context} from "react";
import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import BubblePanel from "./view/BubblePanel";
import {MsgManager} from "./manager/MsgManager";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg, HeartBeat} from "./msgsource/bubbleblivetypes/BliveMsg";
import FixedInfoPanelView from "./view/fixedview/fixed/FixedInfoPanelView";

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

    qiRenComponentRef = React.createRef<FixedInfoPanelView>();

    constructor(props: BliveRoomProp) {
        super(props);

        this.state = {
            msgsHolder: new Array<BliveBubbleMsg<BaseBliveMsg>>()
        };
    }

    render() {
        return <appContext.Provider value={this.app}>
            <div className="container">
                <div style={{
                    backgroundColor: "rgba(255, 137, 197, 0.2)",
                    width: "100vw",
                    position: "fixed",
                    height: "100vh"
                }}></div>


                <video src="//pic.ggemo.com/usaNCED.mp4" autoPlay loop muted
                       style={{position:"fixed",zIndex: "-10",width: "100vw", filter: "grayscale(100%) brightness(118%)"}}></video>
            </div>
            <FixedInfoPanelView ref={this.qiRenComponentRef} />
            <BubblePanel msgs={this.state.msgsHolder} />
        </appContext.Provider>
    }

    componentDidMount() {
        const that = this;
        that.app.msgSource.registerOnMsg(msg => {
            that.app.msgManager.registerMsg(msg);
        })

        that.app.msgSource.registerOnMsg(msg => {
            if (msg.cmd === "$heartBeat") {
                const hbMsg = msg as HeartBeat;
                this.qiRenComponentRef.current?.setQiRenValue(hbMsg.qiRen)
            }
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