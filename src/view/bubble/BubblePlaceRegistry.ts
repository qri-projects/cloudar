import Place, {Position, Scale} from "./BubblePlace";
import BubbleMsg from "./BubbleMsg";

class BubblePlaceRegistry {
    scale: Scale = {width: 0, height: 0};

    setScale(scale: Scale) {
        this.scale = scale
    }

    registerUsePlace(msg: BubbleMsg) {

    }

    getPosition(scale: Scale): Position {
        return {
            x: 100 * Math.random() * (this.scale.width - scale.width) / this.scale.width,
            y: 100 * Math.random() * (this.scale.height - scale.height) / this.scale.height
        }
    }
}

const bubblePlaceRegistry = new BubblePlaceRegistry();
export default bubblePlaceRegistry;