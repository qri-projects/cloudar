import CloudarThemeAdaptor from "../../normal/CloudarThemeAdaptor";
import BubbleMsg from "./BubbleMsg";
import NormalMsg from "../../normal/NormalMsg";
import cloudarTimer from "../../normal/CloudarTimer";

class BubbleThemeAdaptor implements CloudarThemeAdaptor<NormalMsg, BubbleMsg> {
    convert(normalMsg: NormalMsg): BubbleMsg {
        let disappearAt = new Date().getMilliseconds() + 3000;
        return {
            msg: normalMsg,
            disappearAt,
            scaleRatio: 1,
            place: {
                x: 100,
                y: 100,
                width: 100,
                height: 100
            }

        };
    }

}

const bubbleThemeAdaptor = new BubbleThemeAdaptor()
export default bubbleThemeAdaptor;