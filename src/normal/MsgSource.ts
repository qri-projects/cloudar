import NormalMsg from "./NormalMsg";

export default interface MsgSource {
    registerOnMsg(onMsg: (normalMsg: NormalMsg) => void): void
}