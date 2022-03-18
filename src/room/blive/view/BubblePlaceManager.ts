import Place, {Position, Scale} from "./BubblePlace";
import {BliveBubbleApplication} from "../BubbleContextManager";

export default class BubblePlaceManager {
    app: BliveBubbleApplication;


    constructor(app: BliveBubbleApplication) {
        this.app = app;
    }

    scale: Scale = {width: 0, height: 0};

    /**
     * 设置整个面板的大小. 窗口大小变动的时候调用这个方法
     * @param scale
     */
    setScale(scale: Scale) {
        this.scale = scale
    }

    /**
     * 输入气泡占用的scale, 获取将要放置的位置
     * @param scale
     */
    getPosition(scale: Scale): Position {
        return {
            x: 100 * Math.random() * (this.scale.width - scale.width) / this.scale.width,
            y: 100 * Math.random() * (this.scale.height - scale.height) / this.scale.height
        }
    }

    /**
     * 放置气泡之后, 向本组件注册已使用该块区域
     * 在这里面做个醒目逻辑
     * @param place
     */
    registerUsePlace(place: Place) {
        this.highLightUse(place)
    }

    highLightUse(place: Place) {
        this.app.bubbleAlertManager.focus({...place})
    }
}


