import {GiftStatic, GuardGiftStatic} from "../msgsource/bubbleblivetypes/BubbleBliveCommon";


const giftStaticInfos = new Map<number, GiftStatic>();
export const guardGiftStaticInfos = new Map<number, GuardGiftStatic>();

const guardImgs = {
    3: "http://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/icon-l-3.402ac8f..png",
    2: "https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/icon-l-2.6f68d77..png",
    1: "https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/icon-l-1.fde1190..png"
}

async function initGiftStatic() {
    let raw = await fetch("https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&room_id=336119&area_parent_id=9&area_id=371");
    let json = await raw.json()
    let gifts: [GiftStatic] = json.data.list
    gifts.forEach(gift => {
        giftStaticInfos.set(gift.id, gift);
    })
    json.data["guard_resources"].forEach((guardGift: GuardGiftStatic) => {
        guardGift.img = guardImgs[guardGift.level]
        guardGiftStaticInfos.set(guardGift.level, guardGift)
    })
}

initGiftStatic();
export default giftStaticInfos;
