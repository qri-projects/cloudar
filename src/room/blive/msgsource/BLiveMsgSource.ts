import DMclientRE from "./blive/dm_client_re";
import React from "react";
import {GiftStatic} from "./bubbleblivetypes/BubbleBliveCommon";
import {BliveBubbleSendGiftMsg} from "./bubbleblivetypes/BliveBubbleMsg";
import {BaseBliveMsg} from "./bubbleblivetypes/BliveMsg";

export default class BLiveMsgSource {
    onMsgs: Array<(msg: BaseBliveMsg) => void> = []

    giftStaticInfos = new Map<number, GiftStatic>();

    constructor(roomId: number) {
        this.initRoom();
        let client = new DMclientRE({roomID: roomId});
        client.on("ALL_MSG", (data) => {
            console.log("ALL_MSG", data)
            this.emitMsg(data);
        })
        // client.on("INTERACT_WORD", (d) => {
        //     let normalMsg: NormalMsg = {
        //         uniqueId : `bili-enterroom-${d.data.uid}`,
        //         sender: {
        //             uniqueId: `bili-${d.data.uid}`,
        //             name: d.data.uname,
        //             avatar: "http://pic.ggemo.com/picgo/qriheadimg.jpg"
        //         },
        //         content: React.createElement("h3", {}, "欢迎" + d.data.uname + " 进入直播间~"),
        //         sendTime: d.data.trigger_time/1000000,
        //         level: Level.NORMAL,
        //         extraInfo: {raw: d}
        //     }
        //     this.emitMsg(normalMsg)
        // })
        // //
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
        //
        // client.on("DANMU_MSG", async (d) => {
        //
        //     const userId = d.info[2][0];
        //     let headImg = await this.getUserHeadImg(userId);
        //     let normalMsg: NormalMsg = {
        //         uniqueId : `bili-DANMU_MSG-${d.info[0][4]}-${d.info[0][5]}`,
        //         sender: {
        //             uniqueId: `bili-${d.info[2][0]}`,
        //             name: d.info[2][1],
        //             avatar: headImg
        //         },
        //         content: d.info[1],
        //         sendTime: d.info[0][4],
        //         level: Level.NORMAL,
        //         extraInfo: {
        //             raw: d
        //         }
        //     }
        //     this.emitMsg(normalMsg)
        // })
        //
        // client.on("SEND_GIFT", async d => {
        //     let innerSendGift: InnerSendGift = {
        //         raw: d,
        //         giftStatic: this.giftStaticInfos.get(d.data.giftId)
        //     }
        //     let normalMsg: NormalMsg = {
        //         uniqueId : `bili-SEND_GIFT-${d.data.timestamp}-${d.data.rnd}`,
        //         sender: {
        //             uniqueId: `bili-${d.data.uid}`,
        //             name: d.data.uname,
        //             avatar: d.data.face
        //         },
        //         content: React.createElement("h2", {}, `${d.data.uname} 送出 ${d.data.giftName} * ${d.data.num}`,
        //             React.createElement("img", {src: this.giftStaticInfos.get(d.data.giftId)?.gif})),
        //         sendTime: d.data.timestamp,
        //         level: Level.NORMAL,
        //         extraInfo: innerSendGift
        //     }
        //     this.emitMsg(normalMsg)
        // })
        client.Connect()
    }

    private async initRoom() {
        let gifts: [GiftStatic] = await this.fetchRoomGifts();
        gifts.forEach(gift => {
            this.giftStaticInfos.set(gift.id, gift);
        })
        console.log("giftStaticInfos", this.giftStaticInfos);
    }

    private async fetchRoomGifts(): Promise<[GiftStatic]> {
        let raw = await fetch("https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&room_id=336119&area_parent_id=9&area_id=371");
        let json = await raw.json()
        let gifts = json.data.list
        return new Promise(r => r(gifts))
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