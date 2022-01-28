import {ReactNode} from "react";

export interface Sender {
    uniqueId: string
    name: string
    avatar: string
    userMedal?: UserMedal
}

export interface UserMedal {
    name: string
    belong2Name: string
    belong2RoomId: number
    color: string
    level: number
}