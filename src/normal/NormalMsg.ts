import {ReactNode} from "react";

export default interface NormalMsg {
    uniqueId: string
    sender: Sender
    content: string | ReactNode
    sendTime: number
    recvTime?: number
    reply2UniqueId?: string
    extraInfo?: string
    level: Level
}

export interface Sender {
    uniqueId: string
    name: string
    avatar: string
}

export enum Level {
    /**
     * 永久置顶, 类似群公告
     */
    TOP,
    /**
     * 高光消息, 类似SuperChat
     */
    HIGH_LIGHT,
    /**
     * 一般消息
     */
    NORMAL,
    /**
     * 低, 比如送辣条
     */
    LOW,
    /**
     * 一闪而过
     */
    FLUSH
}

export interface DisplayParam {
    level: Level
}