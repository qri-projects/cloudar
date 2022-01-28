import DMclientRE from "./blive/dm_client_re";
import {GiftStatic} from "./bubbleblivetypes/BubbleBliveCommon";
import {BaseBliveMsg, HeartBeat} from "./bubbleblivetypes/BliveMsg";

export default class BLiveMsgSource {
    onMsgs: Array<(msg: BaseBliveMsg) => void> = []
    client: DMclientRE;

    constructor(roomId: number) {
        this.client = new DMclientRE({roomID: roomId});
        this.client.on("ALL_MSG", (data) => {
            console.log("ALL_MSG", data)
            this.emitMsg(data);
        })
        this.client.on("online", data => {
            const heartBeatMsg: HeartBeat = {
                cmd: "$heartBeat",
                qiRen: data
            }
            this.emitMsg(heartBeatMsg)
        })
    }

    public start() {
        this.client.Connect();
    }

    private emitMsg(normalMsg: BaseBliveMsg) {
        this.onMsgs.forEach(onMsg => {
            onMsg(normalMsg)
        })
    }

    registerOnMsg(onMsg: (msg: BaseBliveMsg) => void): void {
        this.onMsgs.push(onMsg)
    }
}
