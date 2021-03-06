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
        cmdComponent.registerMsg(bubbleMsg, this)
    }

    registerNormalMsg<MsgType extends BliveBubbleMsg<any>>(msg: MsgType) {
        this.allMsgs.push(msg)
        this.onChanges.forEach((onchange: ((allMsg: Array<BliveBubbleMsg<BaseBliveMsg>>) => void)) => onchange(this.allMsgs))
    }

    public unRegisterMsg(bliveBubbleMsg: BliveBubbleMsg<BaseBliveMsg>) {
        let cmd = bliveBubbleMsg.raw.cmd
        if (!bubbleBliveComponentsByCmd.has(cmd)) {
            return;
        }
        let cmdComponent: BubbleBliveComponentByCmd<any, any> = bubbleBliveComponentsByCmd.get(cmd)!
        cmdComponent.unRegisterMsg(bliveBubbleMsg, this)
    }

    public unRegisterNormalMsg(bliveBubbleMsg: BliveBubbleMsg<BaseBliveMsg>) {
        const i = this.allMsgs.indexOf(bliveBubbleMsg)
        this.allMsgs.splice(i, 1);
        this.onChanges.forEach(onchange => onchange(this.allMsgs))
    }


    private danmakuByFuduIdInner: Map<string, BliveBubbleDanmuMsg> = new Map<string, BliveBubbleDanmuMsg>();

    genDanmakuMsgFuduId(msg: BliveBubbleDanmuMsg): string {
        return msg.raw.info[1]
    }

    /**
     * ??????????????????{@link BubbleBliveComponentByCmd}????????????
     * @param msg
     */
    registerDanmakuMsg(msg: BliveBubbleDanmuMsg) {
        // ????????????
        const fuduId = this.genDanmakuMsgFuduId(msg);
        if (!this.danmakuByFuduIdInner.has(fuduId)) {
            this.danmakuByFuduIdInner.set(fuduId, msg);
            this.registerNormalMsg(msg);
            return;
        } else {
            const sender = danmakuComponent.genSender(msg.raw);
            const oldMsg = this.danmakuByFuduIdInner.get(fuduId)!
            const senders = oldMsg.senders;

            if (!senders.map(sender => sender.uniqueId).includes(sender.uniqueId)) {
                senders.push(sender)
            }
            oldMsg.remainMillSeconds = oldMsg.initRemainMillSeconds;
            return;
        }
    }

    unRegisterDanmakuMsg(msg: BliveBubbleDanmuMsg) {
        const fuduId = this.genDanmakuMsgFuduId(msg);
        this.danmakuByFuduIdInner.delete(fuduId);
        this.unRegisterNormalMsg(msg)
    }

    private sendGiftByAggregateIdInner: Map<string, Array<BliveBubbleSendGiftMsg>> = new Map<string, Array<BliveBubbleSendGiftMsg>>();
    private sendGiftProxyByAggregateIdInner: Map<string, BliveBubbleSendGiftMsg> = new Map<string, BliveBubbleSendGiftMsg>();

    private genSendGiftAggregateId(msg: BliveBubbleSendGiftMsg): string {
        return `${msg.raw.data.uid}-${msg.raw.data.giftId}`;
    }

    /**
     * ??????????????????{@link BubbleBliveComponentByCmd}????????????
     * @param msg
     */
    public registerSendGiftMsg(msg: BliveBubbleSendGiftMsg) {
        // ????????????
        let comboId = this.genSendGiftAggregateId(msg)

        if (this.sendGiftByAggregateIdInner.has(comboId)) {
            this.sendGiftByAggregateIdInner.get(comboId)?.push(msg)

            // ?????????proxy???, ???proxy?????????, ???num, ????????????
            let proxyedMsg = this.sendGiftProxyByAggregateIdInner.get(comboId)!
            proxyedMsg.raw.data.num += msg.raw.data.num
            proxyedMsg.remainMillSeconds = proxyedMsg.initRemainMillSeconds;
            return
        } else {
            // ????????????proxy, ?????????proxy
            this.sendGiftByAggregateIdInner.set(comboId, new Array<BliveBubbleSendGiftMsg>(msg))

            const proxyedMsg: BliveBubbleSendGiftMsg = {...msg}
            this.sendGiftProxyByAggregateIdInner.set(comboId, proxyedMsg)
            this.registerNormalMsg(msg)
            return;
        }
    }

    unRegisterSendGiftMsg(msg: BliveBubbleSendGiftMsg) {
        let comboId = this.genSendGiftAggregateId(msg)
            // ?????????sendGiftByAggregateIdInner????????????????????????
            const i = this.sendGiftByAggregateIdInner.get(comboId)?.indexOf(msg)
            if (i && i > 0) {
                this.sendGiftByAggregateIdInner.get(comboId)?.splice(i, 1);
            }

            // ???????????????????????????proxy, sendGiftByAggregateIdInner????????????????????????????????????, ?????????proxy

            // this.sendGiftByAggregateIdInner?????????
            if (!this.sendGiftByAggregateIdInner.get(comboId)?.length) {
                let proxyMsg = this.sendGiftProxyByAggregateIdInner.get(comboId)!
                this.sendGiftProxyByAggregateIdInner.delete(comboId)
                // ?????????proxy??????, ???view?????????proxyMsg
                this.unRegisterNormalMsg(proxyMsg)
            }

    }

}