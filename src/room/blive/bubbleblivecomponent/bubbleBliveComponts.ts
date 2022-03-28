import danmakuComponent from "./BubbleBliveComponentDanmaku";
import sendGiftComponent from "./BubbleBliveComponentSendGift";
import interactWordComponent from "./BubbleBliveComponentInteractWord";
import entryEffectComponent from "./BubbleBliveComponentEntryEffect";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";
import guardBuyComponent from "./BubbleBliveComponentGuardBuy";

const bubbleBliveComponentsByCmd = new Map<string, BubbleBliveComponentByCmd<any, any>>();

new Array<BubbleBliveComponentByCmd<any, any>>(
    danmakuComponent,
    sendGiftComponent,
    interactWordComponent,
    entryEffectComponent,
    guardBuyComponent
).forEach(c => {
    bubbleBliveComponentsByCmd.set(c.cmd, c)
});

export default bubbleBliveComponentsByCmd;