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
import ConfigurationPanel from "./view/configuration/ConfigurationPanel";

export default class BliveBubbleRoom extends React.Component<any, BliveBubbleApplication> {
    qiRenComponentRef = React.createRef<FixedInfoPanelView>();

    constructor(props: any) {
        super(props);
        const urlParam = this.anaUrlParam()
        this.state = new BliveBubbleApplication(urlParam, (state) => {
            this.setState({...this.state, ...state})
        });
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
            <ConfigurationPanel></ConfigurationPanel>
        </AppContext.Provider>
    }

    componentDidMount() {
        const that = this;
        const app = this.state;

        // @ts-ignore
        window.app = app
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

    anaUrlParam(): Map<string, string> {
        const res = new Map<string, string>()
        window.location.search.split("?")[1].split("&").forEach(kvStr => {
            const kvArr = kvStr.split("=")
            res.set(kvArr[0], kvArr[1])
        });
        return res;
    }
}

interface BliveRoomState {
    app: BliveBubbleApplication
}