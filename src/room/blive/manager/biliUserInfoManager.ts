import {LRUMap} from "lru_map";

export class BiliUserInfoManager {
    cache: LRUMap<number, BiliUserInfo> = new LRUMap<number, BiliUserInfo>(256);

    public async getUserInfo(biliUid: number): Promise<BiliUserInfo | undefined> {
        if (this.cache.has(biliUid)) {
            return this.cache.get(biliUid)
        }

        let biliUserInfo = await BiliUserInfoManager.fetchUserInfo(biliUid);
        if (biliUserInfo) {
            this.cache.set(biliUid, biliUserInfo);
        }
        return biliUserInfo;
    }

    private static async fetchUserInfo(biliUid: number): Promise<BiliUserInfo | undefined> {
        let raw = await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${biliUid}`);
        if (!raw.ok) {
            return undefined;
        }
        let rawJ = await raw.json();
        if (rawJ.code !== 0) {
            return undefined;
        }
        return rawJ.data;
    }
}

const biliUserInfoManager = new BiliUserInfoManager();
export default biliUserInfoManager;

export interface BiliUserInfo {
    "mid": 13568650,
    "name": "月半姬",
    "sex": "保密",
    "face": "http://i1.hdslb.com/bfs/face/6546c8364fb9565501c79901842b4f08764a0b7e.jpg",
    "face_nft": 0,
    "sign": "正在研究如何成为一个up主，感觉一时半会学不会",
    "rank": 10000,
    "level": 5,
    "jointime": 0,
    "moral": 0,
    "silence": 0,
    "coins": 0,
    "fans_badge": false,
    "fans_medal": {
        "show": true,
        "wear": true,
        "medal": {
            "uid": 13568650,
            "target_id": 546195,
            "medal_id": 7813,
            "level": 5,
            "medal_name": "茄子",
            "medal_color": 6126494,
            "intimacy": 231,
            "next_intimacy": 1000,
            "day_limit": 1500,
            "medal_color_start": 6126494,
            "medal_color_end": 6126494,
            "medal_color_border": 6126494,
            "is_lighted": 1,
            "light_status": 1,
            "wearing_status": 1,
            "score": 1932
        }
    },
    "official": {
        "role": 0,
        "title": "",
        "desc": "",
        "type": -1
    },
    "vip": {
        "type": 2,
        "status": 1,
        "due_date": 1643817600000,
        "vip_pay_type": 1,
        "theme_type": 0,
        "label": {
            "path": "",
            "text": "年度大会员",
            "label_theme": "annual_vip",
            "text_color": "#FFFFFF",
            "bg_style": 1,
            "bg_color": "#FB7299",
            "border_color": ""
        },
        "avatar_subscript": 1,
        "nickname_color": "#FB7299",
        "role": 3,
        "avatar_subscript_url": "http://i0.hdslb.com/bfs/vip/icon_Certification_big_member_22_3x.png"
    },
    "pendant": {
        "pid": 3222,
        "name": "星座系列：射手座",
        "image": "http://i1.hdslb.com/bfs/garb/item/71371426bf83d194a3feb4bdec441ad84b784845.png",
        "expire": 0,
        "image_enhance": "http://i1.hdslb.com/bfs/garb/item/71371426bf83d194a3feb4bdec441ad84b784845.png",
        "image_enhance_frame": ""
    },
    "nameplate": {
        "nid": 0,
        "name": "",
        "image": "",
        "image_small": "",
        "level": "",
        "condition": ""
    },
    "user_honour_info": {
        "mid": 0,
        "colour": null,
        "tags": []
    },
    "is_followed": false,
    "top_photo": "http://i1.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png",
    "theme": {},
    "sys_notice": {},
    "live_room": {
        "roomStatus": 1,
        "liveStatus": 0,
        "url": "https://live.bilibili.com/6081077",
        "title": "",
        "cover": "",
        "online": 0,
        "roomid": 6081077,
        "roundStatus": 0,
        "broadcast_type": 0
    },
    "birthday": "",
    "school": {
        "name": ""
    },
    "profession": {
        "name": ""
    },
    "tags": null,
    "series": {
        "user_upgrade_status": 3,
        "show_upgrade_window": false
    },
    "is_senior_member": 0
}