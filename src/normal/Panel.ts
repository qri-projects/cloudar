import React from "react";
import NormalMsg from "./NormalMsg";

export default abstract class Panel<P, S> extends React.Component<P, S> {
    public abstract registerMsg(msg: NormalMsg): void
}
