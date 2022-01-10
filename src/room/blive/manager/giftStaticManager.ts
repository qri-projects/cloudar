import {GiftStatic} from "../msgsource/bubbleblivetypes/BubbleBliveCommon";


async function fetchRoomGifts(): Promise<[GiftStatic]> {
    let raw = await fetch("https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftConfig?platform=pc&room_id=336119&area_parent_id=9&area_id=371");
    let json = await raw.json()
    let gifts = json.data.list
    return new Promise(r => r(gifts))
}

const giftStaticInfos = new Map<number, GiftStatic>();

async function initGiftStatic() {
    let gifts: [GiftStatic] = await fetchRoomGifts();
    gifts.forEach(gift => {
        giftStaticInfos.set(gift.id, gift);
    })
}

initGiftStatic();
export default giftStaticInfos;