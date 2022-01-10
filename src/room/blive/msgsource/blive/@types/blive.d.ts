type DMclientProtocol = 'flash' | 'ws' | 'wss'
interface DMclientOptions {
    roomID?: number
    userID?: number
    protocol?: DMclientProtocol
    key?: string
}
interface DMclientError {
    status: dmErrorStatus.client | dmErrorStatus.timeout
    error: Error
}

type DMerror = DMclientError | DMdanmakuError

interface DMdanmakuError {
    status: dmErrorStatus.danmaku
    error: TypeError
    data: Buffer
}

// 弹幕服务器
interface DanmuInfo {
    code: number
    message: string
    ttl: number
    data: danmuInfoData
}