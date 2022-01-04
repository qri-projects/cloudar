import React, {ClassType, ComponentClass, ReactElement, ReactNode, RefObject} from "react";
import NormalMsg from "./NormalMsg";
import MsgSource from "./MsgSource";
import {symlink} from "fs";
import Panel from "./Panel";

export default class Room extends React.Component<RoomProps, any> {
    panelReact: ReactElement<any, any>
    panelReactRef: RefObject<Panel<any, any>>
    constructor(props: Readonly<RoomProps> | RoomProps) {
        super(props);
        this.panelReactRef = React.createRef();
        let ref = this.panelReactRef;
        this.panelReact = React.createElement(this.props.panelType, {ref})
    }

    render() {
        return this.panelReact;
    }

    componentDidMount() {
        this.props.msgSource.registerOnMsg(normalMsg => {
            this.panelReactRef.current?.registerMsg(normalMsg)
        })

    }
}

export interface RoomProps {
    // dataSource: DataSource;
    panelType: ClassType<any, any, any>
    msgSource: MsgSource
}