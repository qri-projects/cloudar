import NormalMsg from "../../normal/NormalMsg";
import Place from "./BubblePlace";

export default interface BubbleMsg {
    msg: NormalMsg
    /**
     * 消失时间, 毫秒
     */
    disappearAt: number
    scaleRatio: number
    place: Place
}