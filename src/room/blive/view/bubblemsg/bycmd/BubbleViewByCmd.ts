import React from "react";
import {BliveBubbleMsg} from "../../../msgsource/bubbleblivetypes/BliveBubbleMsg";

export default abstract class BubbleViewByCmd<BliveBubbleMsgType extends BliveBubbleMsg<any>, S> extends React.Component<{ msg:  BliveBubbleMsgType}, S> {

}