import {BaseBliveMsg} from "../msgsource/bubbleblivetypes/BliveMsg";
import {
    BliveBubbleDanmuMsg,
    BliveBubbleMsg,
    BliveBubbleSendGiftMsg
} from "../msgsource/bubbleblivetypes/BliveBubbleMsg";
import {GiftStatic} from "../msgsource/bubbleblivetypes/BubbleBliveCommon";
import bubbleBliveComponentsByCmd from "../bubbleblivecomponent/bubbleBliveComponts";
import {BubbleBliveComponentByCmd} from "../bubbleblivecomponent/BubbleBliveComponentByCmd";
import danmakuComponent from "../bubbleblivecomponent/BubbleBliveComponentDanmaku";

export class MsgManager {
    allMsgs: Array<BliveBubbleMsg<BaseBliveMsg>> = new Array<BliveBubbleMsg<BaseBliveMsg>>()
    onChanges: Map<number, (allMsg: Array<BliveBubbleMsg<BaseBliveMsg>>) => void>
        = new Map<number, (allMsg: Array<BliveBubbleMsg<BaseBliveMsg>>) => void>();
    private onChangeId = -1;

    registerOnChange(onChange: (allMsg: Array<BliveBubbleMsg<BaseBliveMsg>>) => void): number {
        this.onChangeId += 1;
        this.onChanges.set(this.onChangeId, onChange);
        return this.onChangeId;
    }

    unRegisterOnChange(key: number) {
        this.onChanges.delete(key)
    }



    public registerMsg(rawMsg: BaseBliveMsg): void{
        if (!bubbleBliveComponentsByCmd.has(rawMsg.cmd)) {
            return;
        }
        let cmdComponent: BubbleBliveComponentByCmd<any, any> = bubbleBliveComponentsByCmd.get(rawMsg.cmd)!
        let bubbleMsg: BliveBubbleMsg<any> = cmdComponent.genBliveBubbleMsg(rawMsg)
        let newMsg: BliveBubbleMsg<BaseBliveMsg> | null = cmdComponent.registerMsg(bubbleMsg, this)
        if (newMsg) {
            this.allMsgs.push(newMsg)
        }
        this.onChanges.forEach((onchange: ((allMsg: Array<BliveBubbleMsg<BaseBliveMsg>>) => void)) => onchange(this.allMsgs))
        return;
    }

    public removeMsg(bliveBubbleMsg: BliveBubbleMsg<BaseBliveMsg>) {
        const i = this.allMsgs.indexOf(bliveBubbleMsg)
        this.allMsgs.splice(i, 1);
        this.onChanges.forEach(onchange => onchange(this.allMsgs))
    }

    private danmakuByFuduIdInner: Map<string, BliveBubbleDanmuMsg> = new Map<string, BliveBubbleDanmuMsg>();

    registerNormalMsg<MsgType extends BliveBubbleMsg<any>>(msg: MsgType): MsgType | null {
        return msg;
    }

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
            const sender = danmakuComponent.genSender(msg.raw);
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