import CloudarThemeAdaptor from "../../normal/CloudarThemeAdaptor";
import BubbleMsg from "./BubbleMsg";
import NormalMsg from "../../normal/NormalMsg";
import cloudarTimer from "../../normal/CloudarTimer";
import bubblePlaceRegistry from "./BubblePlaceRegistry";

class BubbleThemeAdaptor implements CloudarThemeAdaptor<NormalMsg, BubbleMsg> {
    convert(normalMsg: NormalMsg): BubbleMsg {
        let disappearAt = new Date().getMilliseconds() + 3000;
        let scale = {width: 100, height: 100};
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