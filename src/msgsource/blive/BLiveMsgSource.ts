import MsgSource from "../../normal/MsgSource";
import NormalMsg from "../../normal/NormalMsg";
import DMclientRE from "./blive/dm_client_re";

export default class BLiveMsgSource implements MsgSource {
    onMsgs: Array<(normalMsg: NormalMsg) => void> = []

    constructor(roomId: number) {
        let client = new DMclientRE({roomID: roomId});
        client.on("event", ({name, content}) => {
            console.log(name, content)
        })
        client.Connect()
    }
    registerOnMsg(onMsg: (normalMsg: NormalMsg) => void): void {
        this.onMsgs.push(onMsg)
    }
}
