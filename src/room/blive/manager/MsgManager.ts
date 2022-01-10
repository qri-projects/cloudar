import {BaseBliveMsg} from "../msgsource/bubbleblivetypes/BliveMsg";
import bubbleBliveComponentsByCmd, {
    BubbleBliveComponentByCmd, danmuBubbleBliveMsg,
    sendGiftBliveMsg
} from "../bubbleblivecomponent/BubbleBliveComponentByCmd";
import {
    BliveBubbleDanmuMsg,
    BliveBubbleMsg,
    BliveBubbleSendGiftMsg
} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {GiftStatic} from "../msgsource/bubbleblivetypes/BubbleBliveCommon";

export class MsgManager {
    allMsgs: Array<BliveBubbleMsg<BaseBliveMsg>> = new Array<BliveBubbleMsg<BaseBliveMsg>>()

    public registerMsg(rawMsg: BaseBliveMsg): Array<BliveBubbleMsg<BaseBliveMsg>> {
        if (!bubbleBliveComponentsByCmd.has(rawMsg.cmd)) {
            return this.allMsgs;
        }
        let cmdComponent: BubbleBliveComponentByCmd<any, any> = bubbleBliveComponentsByCmd.get(rawMsg.cmd)!
        let bubbleMsg: BliveBubbleMsg<any> = cmdComponent.genBliveBubbleMsg(rawMsg)
        let newMsg: BliveBubbleMsg<BaseBliveMsg> | null = cmdComponent.registerMsg(bubbleMsg, this)
        if (newMsg) {
            this.allMsgs.push(newMsg)
        }
        return this.allMsgs;
    }

    private danmakuByFuduIdInner: Map<string, BliveBubbleDanmuMsg> = new Map<string, BliveBubbleDanmuMsg>();
    /**
     * 这个方法利用{@link BubbleBliveComponentByCmd}做表驱动
     * @param msg
     */
    registerDanmakuMsg(msg: BliveBubbleDanmuMsg): BliveBubbleDanmuMsg | null {
        // 复读注册
        const fuduId = msg.genMsgFuduId();
        if (!this.danmakuByFuduIdInner.has(fuduId)) {
            this.danmakuByFuduIdInner.set(fuduId, msg);
            return msg;
        } else {
            const sender = danmuBubbleBliveMsg.genSender(msg.raw);
            const oldMsg = this.danmakuByFuduIdInner.get(fuduId)!
            const senders = oldMsg.senders;
            if (!senders.includes(sender)) {
                senders.push(sender)
            }
            oldMsg.remainMillSeconds = oldMsg.initRemainMillSeconds;
            return null;
        }
    }

    private sendGiftByComboIdInner: Map<string, BliveBubbleSendGiftMsg> = new Map<string, BliveBubbleSendGiftMsg>();
    /**
     * 这个方法利用{@link BubbleBliveComponentByCmd}做表驱动
     * @param msg
     */
    public registerSendGiftMsg(msg: BliveBubbleSendGiftMsg): BliveBubbleSendGiftMsg | null {
        // 连击注册
        let comboId = msg.raw.data.batch_combo_id
        if (!comboId) {
            return msg
        }

        if (!this.sendGiftByComboIdInner.has(comboId)) {
            this.sendGiftByComboIdInner.set(comboId, msg)
            return msg;
        }

        let oldMsg = this.sendGiftByComboIdInner.get(comboId)!
        oldMsg.raw.data.num += msg.raw.data.num
        oldMsg.remainMillSeconds = oldMsg.initRemainMillSeconds;
        return null
    }
}