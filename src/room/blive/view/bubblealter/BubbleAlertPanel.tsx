import React from "react";
import {BubbleMsgHolderViewProp, BubbleMsgHolderViewState} from "../bubblemsg/bubblemsgholder/BubbleMsgHolderView";
import {Position} from "../BubblePlace";
import {BliveBubbleSendGiftMsg} from "../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import "./BubbleAlertPanel.scss";
import {AppContext, BliveBubbleApplication} from "../../BubbleContextManager";

export class BubbleAlertManager {
    panel?: BubbleAlertPanel

    private unusedAlertUnitData: Array<BubbleAlertUnitData> = new Array<BubbleAlertUnitData>()

    public focus(position: Position) {
        const alertUnitData = this.getUnusedAlertUnitData(position);
        this.panel!.addEffect(alertUnitData)

        setTimeout(() => {
            this.panel!.removeEffect(alertUnitData)
            this.unusedAlertUnitData.push(alertUnitData)
        }, 150)
    }

    private getUnusedAlertUnitData(position: Position) {
        if (this.unusedAlertUnitData.length === 0) {
            return new BubbleAlertUnitData(position)
        } else {
            let res = this.unusedAlertUnitData.pop()!;
            res.focusPosition = position
            return res;
        }
    }
}

class BubbleAlertUnitData {
    focusPosition: Position

    constructor(focusPoint: Position) {
        this.focusPosition = focusPoint;
    }
}

interface BubbleAlertPanelState {
    alertUnitData: Array<BubbleAlertUnitData>
}

export default class BubbleAlertPanel extends React.Component<any, BubbleAlertPanelState> {

    constructor(props: any, context: any) {
        BubbleAlertPanel.contextType = AppContext;
        super(props, context);
        this.state = {
            alertUnitData: new Array<BubbleAlertUnitData>()
        };


    }

    componentDidMount() {
        const that = this;
        (this.context as BliveBubbleApplication).bubbleAlertManager.panel = this;
    }

    addEffect(alertUnitData: BubbleAlertUnitData) {
        this.state.alertUnitData.push(alertUnitData)
        console.log({alertUnitData})
        this.setState({...this.state})
        console.log({"state": this.state})
    }

    removeEffect(alertUnitData: BubbleAlertUnitData) {
        const i = this.state.alertUnitData.indexOf(alertUnitData)
        this.state.alertUnitData.splice(i, 1);
        this.setState({...this.state})
    }

    render() {
        const that = this;
        return <div>
            {this.state.alertUnitData.map(data => {
                const scale = (that.context as BliveBubbleApplication).placeManager.scale;
                // placeManager给出来的是百分比
                data.focusPosition.x = data.focusPosition.x * scale.width / 100;
                data.focusPosition.y = data.focusPosition.y * scale.height / 100
                const posStyle = {
                    left: `${data.focusPosition.x}px`,
                    top: `${data.focusPosition.y}px`
                };
                console.log({posStyle})

                const posInCalc: Position = {x: data.focusPosition.x, y: data.focusPosition.y}
                const rad0 = calcAngle(posInCalc, {x: 0, y: 0});
                const rad1 = calcAngle(posInCalc, {x: 0, y: scale.height})
                const rad2 = calcAngle(posInCalc, {x: scale.width, y: 0})
                const rad3 = calcAngle(posInCalc, {x: scale.width, y: scale.height})


                return <div key={`${data.focusPosition.x}-${data.focusPosition.y}`}>
                    <div className="alertLine" style={{...posStyle, background: `red`, transform: `rotate(${rad0}rad)`}}></div>
                    <div className="alertLine" style={{...posStyle, background: `white`, transform: `rotate(${rad1}rad)`}}></div>
                    <div className="alertLine" style={{...posStyle, background: `black` , transform: `rotate(${rad2}rad)`}}></div>
                    <div className="alertLine" style={{...posStyle, background: `yellow`, transform: `rotate(${rad3}rad)`}}></div>
                </div>;
            })}
        </div>
    }
}

/**
 * p1相对p0的角度
 * @param p0
 * @param p1
 */
function calcAngle(p0: Position, p1: Position) {
    const x = p1.x - p0.x;
    const y = p1.y - p0.y;
    const angleRaw = Math.atan2(y, x)
    return angleRaw;
}


