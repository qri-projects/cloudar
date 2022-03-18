import BLiveMsgSource from "./msgsource/BLiveMsgSource";
import {MsgManager} from "./manager/MsgManager";
import BubblePlaceManager from "./view/BubblePlaceManager";
import {BubbleAlertManager} from "./view/bubblealter/BubbleAlertPanel";
import React, {Context} from "react";
import {BliveBubbleMsg} from "./msgsource/bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg} from "./msgsource/bubbleblivetypes/BliveMsg";

export class BliveBubbleApplication {
    roomId: number;
    msgSource: BLiveMsgSource;
    msgManager: MsgManager = new MsgManager();
    placeManager: BubblePlaceManager;
    bubbleAlertManager: BubbleAlertManager = new BubbleAlertManager();
    msgsHolder: Array<BliveBubbleMsg<BaseBliveMsg>> = new Array<BliveBubbleMsg<BaseBliveMsg>>()

    constructor(roomId: number) {
        this.roomId = roomId;
        this.msgSource = new BLiveMsgSource(roomId);
        this.placeManager = new BubblePlaceManager(this)
    }
}

export const AppContext: Context<BliveBubbleApplication> =
    React.createContext<BliveBubbleApplication>(new BliveBubbleApplication(336119));