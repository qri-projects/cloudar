import NormalMsg from "./NormalMsg";

export default interface CloudarThemeAdaptor<InMsgType extends NormalMsg, OutMsgType> {
    convert(normalMsg: InMsgType) : OutMsgType
}