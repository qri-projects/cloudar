import MsgSource from "../../normal/MsgSource";
import NormalMsg, {Level} from "../../normal/NormalMsg";
import DMclientRE from "./blive/dm_client_re";
import React from "react";

export default class BLiveMsgSource implements MsgSource {
    onMsgs: Array<(normalMsg: NormalMsg) => void> = []

    // todo: 上线删除
    events = new Array()

    constructor(roomId: number) {
        // @ts-ignore
        window.events = this.events
        let client = new DMclientRE({roomID: roomId});
        client.on("ALL_MSG", (data) => {
            console.log("ALL_MSG", data)
            this.events.push(data)
        })
        client.on("INTERACT_WORD", (d) => {
            let normalMsg: NormalMsg = {
                uniqueId : `bili-enterroom-${d.data.uid}`,
                sender: {
                    uniqueId: `bili-${d.data.uid}`,
                    name: d.data.uname,
                    avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg"
                },
                content: React.createElement("h1", {}, "欢迎" + d.data.uname + " 进入直播间~"),
                sendTime: d.data.trigger_time/1000000,
                level: Level.NORMAL
            }
            this.emitMsg(normalMsg)
        })
        client.on("ENTRY_EFFECT", d => {
            d = {
                "cmd": "ENTRY_EFFECT",
                "data": {
                    "id": 136,
                    "uid": 13578650,
                    "target_id": 13578650,
                    "mock_effect": 0,
                    "face": "https://i2.hdslb.com/bfs/face/3adf31f2286079fe662f8081e6821d6620d1142f.jpg",
                    "privilege_type": 0,
                    "copy_writing": "欢迎 <%空包糖%> 进入直播间",
                    "copy_color": "#000000",
                    "highlight_color": "#FFF100",
                    "priority": 1,
                    "basemap_url": "https://i0.hdslb.com/bfs/live/mlive/586f12135b6002c522329904cf623d3f13c12d2c.png",
                    "show_avatar": 1,
                    "effective_time": 2,
                    "web_basemap_url": "https://i0.hdslb.com/bfs/live/mlive/586f12135b6002c522329904cf623d3f13c12d2c.png",
                    "web_effective_time": 2,
                    "web_effect_close": 0,
                    "web_close_time": 900,
                    "business": 3,
                    "copy_writing_v2": "欢迎 <^icon^> <%空包糖%> 进入直播间",
                    "icon_list": [
                        2
                    ],
                    "max_delay_time": 7,
                    "trigger_time": 1641495986433488000,
                    "identities": 22
                },
                "_roomid": 336119
            }
        })
        client.on("DANMU_MSG", (d) => {
            console.log("DANMU_MSG", {d})
            let normalMsg: NormalMsg = {
                uniqueId : `${d.info[0][4]}-${d.info[0][5]}`,
                sender: {
                    uniqueId: `bili-${d.info[2][0]}`,
                    name: d.info[2][1],
                    avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg"
                },
                content: d.info[1],
                sendTime: d.info[0][4],
                level: Level.NORMAL
            }
            this.emitMsg(normalMsg)
        })
        client.Connect()
    }

    emitMsg(normalMsg: NormalMsg) {
        this.onMsgs.forEach(onMsg => {
            onMsg(normalMsg)
        })
    }

    registerOnMsg(onMsg: (normalMsg: NormalMsg) => void): void {
        this.onMsgs.push(onMsg)
    }
}
