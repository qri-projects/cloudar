import React, {RefObject} from "react";
import {BliveBubbleMsg} from "../../../msgsource/bubbleblivetypes/BliveBubbleMsg";
import BubblePlaceRegistry from "../../BubblePlaceRegistry";
import exp from "constants";
import Place from "../../BubblePlace";

export default abstract class BubbleViewByCmd<BliveBubbleMsgType extends BliveBubbleMsg<any>, S extends BubbleViewByCmdStates> extends React.Component<BubbleViewByCmdProps<BliveBubbleMsgType>, S> {
    thisRootRef: RefObject<any> = React.createRef();
}

export interface BubbleViewByCmdProps<BliveBubbleMsgType> {
    msg:  BliveBubbleMsgType
}

export interface BubbleViewByCmdStates {
}