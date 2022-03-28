import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import {MsgManager} from "./manager/MsgManager";
import BubblePlaceManager from "./view/BubblePlaceManager";
import {BubbleAlertManager} from "./view/bubblealter/BubbleAlertPanel";
import React, {Context} from "react";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg} from "./msgsource/bubbleblivetypes/BliveMsg";

export class BliveBubbleApplication {
    urlParam: Map<string, string>;
    roomId: number;
    msgSource: BLiveMsgSource;
    msgManager: MsgManager = new MsgManager();
    placeManager: BubblePlaceManager;
    bubbleAlertManager: BubbleAlertManager = new BubbleAlertManager();
    msgsHolder: Array<BliveBubbleMsg<BaseBliveMsg>> = new Array<BliveBubbleMsg<BaseBliveMsg>>()
    openConfigPanel: boolean = false;
    applyState: (state: any) => void

    constructor(urlParam: Map<string, string>, applyState: (state: any) => void) {
        const roomId = parseInt(urlParam.get("roomId")!)
        this.urlParam = urlParam;
        this.roomId = roomId;
        this.msgSource = new BLiveMsgSource(roomId);
        this.placeManager = new BubblePlaceManager(this)
        this.applyState = applyState
    }
}

export const AppContext: Context<BliveBubbleApplication> =
    React.createContext<BliveBubbleApplication>(
        new BliveBubbleApplication(new Map<string, string>([["roomId", "336119"]])
            , (state) => {})
    );