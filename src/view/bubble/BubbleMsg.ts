import NormalMsg, {Sender} from "../../normal/NormalMsg";
import Place from "./BubblePlace";

export default interface BubbleMsg {
    msg: NormalMsg
    /**
     * 消失时间, 毫秒
     */
    subSenders?: [Sender]
    disappearAt: number
    scaleRatio: number
    place: Place
}