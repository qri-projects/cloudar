import React, {Context} from "react";
import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import BubblePanel from "./view/BubblePanel";
import {MsgManager} from "./manager/MsgManager";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg, HeartBeat} from "./msgsource/bubbleblivetypes/BliveMsg";
import FixedInfoPanelView from "./view/fixedview/fixed/FixedInfoPanelView";
import BubbleAlertPanel, {BubbleAlertManager} from "./view/bubblealter/BubbleAlertPanel";
import BubblePlaceManager from "./view/BubblePlaceManager";
import {BliveBubbleApplication, AppContext} from "./BubbleContextManager";

export default class BliveBubbleRoom extends React.Component<BliveRoomProp, BliveBubbleApplication> {
    qiRenComponentRef = React.createRef<FixedInfoPanelView>();

    constructor(props: BliveRoomProp) {
        super(props);
        this.state = new BliveBubbleApplication(this.props.roomId);
    }

    render() {
        return <AppContext.Provider value={this.state}>
            <div className="container">
                <div style={{
                    backgroundColor: "rgba(255, 137, 197, 0)",
                    width: "100vw",
                    position: "fixed",
                    height: "100vh"
                }}></div>
                <div className="positionAlerter">
                </div>


                {/*<video src="//pic.ggemo.com/usaNCED.mp4" autoPlay loop muted*/}
                {/*       style={{position:"fixed",zIndex: "-10",width: "100vw", filter: "grayscale(100%) brightness(118%)"}}></video>*/}
                <BubbleAlertPanel/>
            </div>
            <FixedInfoPanelView ref={this.qiRenComponentRef}/>
            <BubblePanel msgs={this.state.msgsHolder}/>
        </AppContext.Provider>
    }

    componentDidMount() {
        const that = this;
        const app = this.state;
        app.msgSource.registerOnMsg(msg => {
            app.msgManager.registerMsg(msg);
        })

        app.msgSource.registerOnMsg(msg => {
            if (msg.cmd === "$heartBeat") {
                const hbMsg = msg as HeartBeat;
                this.qiRenComponentRef.current?.setQiRenValue(hbMsg.qiRen)
            }
        })

        app.msgManager.registerOnChange((allMsg) => {
            that.setState({msgsHolder: allMsg})
        })
        app.msgSource.start()
    }
}

export interface BliveRoomProp {
    roomId: number
}

interface BliveRoomState {
    app: BliveBubbleApplication
}