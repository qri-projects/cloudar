import danmakuComponent from "./BubbleBliveComponentDanmaku";
import sendGiftComponent from "./BubbleBliveComponentSendGift";
import interactWordComponent from "./BubbleBliveComponentInteractWord";
import entryEffectComponent from "./BubbleBliveComponentEntryEffect";
import {BubbleBliveComponentByCmd} from "./BubbleBliveComponentByCmd";

const bubbleBliveComponentsByCmd = new Map<string, BubbleBliveComponentByCmd<any, any>>();

new Array<BubbleBliveComponentByCmd<any, any>>(
    danmakuComponent,
    sendGiftComponent,
    interactWordComponent,
    entryEffectComponent
).forEach(c => {
    bubbleBliveComponentsByCmd.set(c.cmd, c)
});

export default bubbleBliveComponentsByCmd;