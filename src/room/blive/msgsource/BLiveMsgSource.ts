import DMclientRE from "./blive/dm_client_re";
import {GiftStatic} from "./bubbleblivetypes/BubbleBliveCommon";
import {BaseBliveMsg} from "./bubbleblivetypes/BliveMsg";

export default class BLiveMsgSource {
    onMsgs: Array<(msg: BaseBliveMsg) => void> = []
    client: DMclientRE;

    constructor(roomId: number) {
        this.client = new DMclientRE({roomID: roomId});
        this.client.on("ALL_MSG", (data) => {
            console.log("ALL_MSG", data)
            this.emitMsg(data);
        })
        // client.on("ENTRY_EFFECT", d => {
        //     d = {
        //         "cmd": "ENTRY_EFFECT",
        //         "data": {
        //             "id": 136,
        //             "uid": 13578650,
        //             "target_id": 13578650,
        //             "mock_effect": 0,
        //             "face": "https://i2.hdslb.com/bfs/face/3adf31f2286079fe662f8081e6821d6620d1142f.jpg",
        //             "privilege_type": 0,
        //             "copy_writing": "欢迎 <%空包糖%> 进入直播间",
        //             "copy_color": "#000000",
        //             "highlight_color": "#FFF100",
        //             "priority": 1,
        //             "basemap_url": "https://i0.hdslb.com/bfs/live/mlive/586f12135b6002c522329904cf623d3f13c12d2c.png",
        //             "show_avatar": 1,
        //             "effective_time": 2,
        //             "web_basemap_url": "https://i0.hdslb.com/bfs/live/mlive/586f12135b6002c522329904cf623d3f13c12d2c.png",
        //             "web_effective_time": 2,
        //             "web_effect_close": 0,
        //             "web_close_time": 900,
        //             "business": 3,
        //             "copy_writing_v2": "欢迎 <^icon^> <%空包糖%> 进入直播间",
        //             "icon_list": [
        //                 2
        //             ],
        //             "max_delay_time": 7,
        //             "trigger_time": 1641495986433488000,
        //             "identities": 22
        //         },
        //         "_roomid": 336119
        //     }

            // let normalMsg: NormalMsg = {
            //     uniqueId : `bili-ENTRY_EFFECT-${d.data.trigger_time}-${d.data.uid}`,
            //     sender: {
            //         uniqueId: `bili-${d.data.uid}`,
            //         name: d.data.,
            //         avatar: d.data.face
            //     },
            //     content: d.info[1],
            //     sendTime: d.info[0][4],
            //     level: Level.NORMAL,
            //     extraInfo: {
            //         raw: d
            //     }
            // }
            // this.emitMsg(normalMsg)
        // })
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
