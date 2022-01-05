import CloudarThemeAdaptor from "../../normal/CloudarThemeAdaptor";
import BubbleMsg from "./BubbleMsg";
import NormalMsg from "../../normal/NormalMsg";
import cloudarTimer from "../../normal/CloudarTimer";
import bubblePlaceRegistry from "./BubblePlaceRegistry";

class BubbleThemeAdaptor implements CloudarThemeAdaptor<NormalMsg, BubbleMsg> {
    convert(normalMsg: NormalMsg): BubbleMsg {
        let disappearAt = new Date().getMilliseconds() + 3000;
        // 72: 头像框&姓名高度, -8: 消息框负margin, 14: 消息框pending
        let height = 72 + -8 + 14 + 21 * Math.ceil(normalMsg.content.length / 14)
        let width = 18 + 16 * Math.min(normalMsg.content.length, 14)
        let scale = {width, height};
        let position = bubblePlaceRegistry.getPosition(scale);
        return {
            msg: normalMsg,
            disappearAt,
            scaleRatio: 1,
            place: {
                ...position, ...scale
            }
        };
    }

}

const bubbleThemeAdaptor = new BubbleThemeAdaptor()
export default bubbleThemeAdaptor;