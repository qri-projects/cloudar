export interface BaseBliveMsg {
    cmd: string
}

export interface Danmaku extends BaseBliveMsg {
    "cmd": "DANMU_MSG",
    "info": [
        [
            0,
            1,
            25,
            16777215,
            1641774525141,
            1641774071,
            0,
            "63e97abb",
            0,
            0,
            0,
            "",
            0,
            "{}",
            "{}",
            {
                "mode": 0,
                "show_player_type": 0,
                "extra": "{\"send_from_me\":false,\"mode\":0,\"color\":16777215,\"dm_type\":0,\"font_size\":25,\"player_mode\":1,\"show_player_type\":0,\"content\":\"问问\",\"user_hash\":\"1676245691\",\"emoticon_unique\":\"\",\"direction\":0,\"pk_direction\":0,\"space_type\":\"\",\"space_url\":\"\"}"
            }
        ],
        "问问",
        [
            13578650,
            "空包糖",
            0,
            0,
            0,
            10000,
            1,
            ""
        ],
        [
            26,
            "沙月月",
            "沙月ちゃん",
            4767523,
            398668,
            "",
            0,
            6809855,
            398668,
            6850801,
            3,
            1,
            128912828
        ],
        [
            26,
            0,
            5805790,
            ">50000",
            1
        ],
        [
            "",
            ""
        ],
        0,
        0,
        null,
        {
            "ts": 1641774525,
            "ct": "56DAFD66"
        },
        0,
        0,
        null,
        null,
        0,
        210
    ],
    "_roomid": 336119
}

export interface SendGift extends BaseBliveMsg {
    "cmd": "SEND_GIFT",
    "data": {
        "action": "投喂",
        "batch_combo_id": "",
        "batch_combo_send": null,
        "beatId": "",
        "biz_source": "Live",
        "blind_gift": null,
        "broadcast_id": 0,
        "coin_type": "silver",
        "combo_resources_id": 1,
        "combo_send": null,
        "combo_stay_time": 3,
        "combo_total_coin": 0,
        "crit_prob": 0,
        "demarcation": 1,
        "discount_price": 0,
        "dmscore": 4,
        "draw": 0,
        "effect": 0,
        "effect_block": 1,
        "face": "http://i2.hdslb.com/bfs/face/b12a0303b6336e1dcf7bb0c4e2ebe3e666657245.jpg",
        "float_sc_resource_id": 0,
        "giftId": 1,
        "giftName": "辣条",
        "giftType": 5,
        "gold": 0,
        "guard_level": 0,
        "is_first": true,
        "is_special_batch": 0,
        "magnification": 1,
        "medal_info": {
            "anchor_roomid": 0,
            "anchor_uname": "",
            "guard_level": 0,
            "icon_id": 0,
            "is_lighted": 0,
            "medal_color": 0,
            "medal_color_border": 0,
            "medal_color_end": 0,
            "medal_color_start": 0,
            "medal_level": 0,
            "medal_name": "",
            "special": "",
            "target_id": 0
        },
        "name_color": "",
        "num": 1,
        "original_gift_name": "",
        "price": 100,
        "rcost": 24727,
        "remain": 0,
        "rnd": "1641577019120200014",
        "send_master": null,
        "silver": 0,
        "super": 0,
        "super_batch_gift_num": 0,
        "super_gift_num": 0,
        "svga_block": 0,
        "tag_image": "",
        "tid": "1641577019120200014",
        "timestamp": 1641577019,
        "top_list": null,
        "total_coin": 100,
        "uid": 76696082,
        "uname": "小黄瓜本瓜"
    },
    "_roomid": 336119
}

export interface EntryEffect extends BaseBliveMsg {
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

export interface InteractWord extends BaseBliveMsg {
    "cmd": "INTERACT_WORD",
    "data": {
        "contribution": {
            "grade": 0
        },
        "dmscore": 2,
        "fans_medal": {
            "anchor_roomid": 0,
            "guard_level": 0,
            "icon_id": 0,
            "is_lighted": 0,
            "medal_color": 0,
            "medal_color_border": 0,
            "medal_color_end": 0,
            "medal_color_start": 0,
            "medal_level": 0,
            "medal_name": "",
            "score": 0,
            "special": "",
            "target_id": 0
        },
        "identities": [
            1
        ],
        "is_spread": 0,
        "msg_type": 1,
        "roomid": 336119,
        "score": 1641977569156,
        "spread_desc": "",
        "spread_info": "",
        "tail_icon": 0,
        "timestamp": 1641977569,
        "trigger_time": 1641977568058398700,
        "uid": 76696082,
        "uname": "小黄瓜本瓜",
        "uname_color": ""
    },
    "_roomid": 336119
}