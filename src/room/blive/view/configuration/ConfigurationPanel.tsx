import React from "react";
import {AppContext, BliveBubbleApplication} from "../../BubbleContextManager";

export default class ConfigurationPanel extends React.Component<any, any> {
    constructor(props: any) {
        ConfigurationPanel.contextType = AppContext
        super(props);
    }

    render() {
        return <div style={{
            display: (this.context as BliveBubbleApplication).openConfigPanel ? "flex": "none",
            zIndex: 3
        }}>
            todo~
        </div>;
    }
}