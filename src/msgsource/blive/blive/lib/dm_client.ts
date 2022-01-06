import {inflate} from 'zlib'
import {EventEmitter} from 'events'
import tools from "./tools";

/**
 * 错误类型
 *
 * @enum {number}
 */
enum dmErrorStatus {
    'client',
    'danmaku',
    'timeout',
}

/**
 * 弹幕客户端, 用于连接弹幕服务器和发送弹幕事件
 *
 * @class DMclient
 * @extends {EventEmitter}
 */
class DMclient extends EventEmitter {
    /**
     * Creates an instance of DMclient.
     * @param {Options} [{ roomID = 23058, userID = 0, protocol = 'ws' }={}]
     * @memberof DMclient
     */
    constructor({roomID = 23058, userID = 0, protocol = "ws", key = ''}: DMclientOptions = {}) {
        super()
        this.roomID = roomID
        this.userID = userID
        this._protocol = protocol
        this.key = key
    }

    /**
     * 用户UID
     *
     * @type {number}
     * @memberof DMclient
     */
    public userID: number
    /**
     * 房间号, 注意不要短号
     *
     * @type {number}
     * @memberof DMclient
     */
    public roomID: number
    /**
     * 连接使用的token, 暂时不知道功能
     *
     * @type {string}
     * @memberof DMclient
     */
    public key: string
    /**
     * 连接弹幕服务器使用的协议
     * 为了避免不必要的麻烦, 禁止外部修改
     *
     * @protected
     * @type {DMclientProtocol}
     * @memberof DMclient
     */
    protected _protocol: DMclientProtocol
    /**
     * 连接弹幕服务器使用的协议
     *
     * @readonly
     * @type {DMclientProtocol}
     * @memberof DMclient
     */
    public get protocol(): DMclientProtocol {
        return this._protocol
    }

    /**
     * 当前连接的弹幕服务器
     * 为了避免不必要的麻烦, 禁止外部修改
     *
     * @protected
     * @type {string}
     * @memberof DMclient
     */
    protected _server!: string
    /**
     * 当前连接的弹幕服务器
     *
     * @readonly
     * @type {string}
     * @memberof DMclient
     */
    public get server(): string {
        return this._server
    }

    /**
     * 当前连接的弹幕服务器端口
     * 为了避免不必要的麻烦, 禁止外部修改
     *
     * @protected
     * @type {number}
     * @memberof DMclient
     */
    protected _port!: number
    /**
     * 当前连接的弹幕服务器端口
     *
     * @readonly
     * @type {number}
     * @memberof DMclient
     */
    public get port(): number {
        return this._port
    }

    /**
     * 是否已经连接到服务器
     * 为了避免不必要的麻烦, 禁止外部修改
     *
     * @protected
     * @type {boolean}
     * @memberof DMclient
     */
    protected _connected: boolean = false
    /**
     * 是否已经连接到服务器
     *
     * @readonly
     * @type {boolean}
     * @memberof DMclient
     */
    public get connected(): boolean {
        return this._connected
    }

    /**
     * 版本
     *
     * @type {number}
     * @memberof DMclient
     */
    public version: number = 1

    /**
     * 全局计时器, 负责除心跳超时的其他任务, 便于停止
     *
     * @protected
     * @type {NodeJS.Timer}
     * @memberof DMclient
     */
    protected _Timer!: NodeJS.Timer
    /**
     * 心跳超时
     *
     * @protected
     * @type {NodeJS.Timer}
     * @memberof DMclient
     */
    protected _timeout!: NodeJS.Timer
    /**
     * 模仿客户端与服务器进行通讯
     *
     * @protected
     * @type {(Socket | ws)}
     * @memberof DMclient
     */
    protected _client!: WebSocket
    /**
     * 缓存数据
     *
     * @private
     * @type {Buffer}
     * @memberof DMclient
     */
    private __data?: Buffer
    /**
     * 错误类型
     *
     * @static
     * @type {typeof dmErrorStatus}
     * @memberof DMclient
     */
    public static readonly errorStatus: typeof dmErrorStatus = dmErrorStatus

    /**
     * 连接到指定服务器
     *
     * @param {{ server: string, port: number }} [options]
     * @memberof DMclient
     */
    public async Connect(options?: { server: string, port: number }) {
        if (this._connected) return
        this._connected = true
        if (options === undefined) {
            // 动态获取服务器地址, 防止B站临时更换
            const getDanmuInfo = {uri: `http://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${this.roomID}&type=0`}
            const danmuInfo = await (await fetch(getDanmuInfo.uri)).json()
            console.log("danmuInfo", danmuInfo)
            let socketServer = 'broadcastlv.chat.bilibili.com'
            let socketPort = 2243
            let wsServer = 'broadcastlv.chat.bilibili.com'
            let wsPort = 2244
            let wssPort = 443
            if (danmuInfo !== undefined && danmuInfo.code === 0) {
                wsServer = danmuInfo.data.host_list[0].host
                wsPort = danmuInfo.data.host_list[0].ws_port
                wssPort = danmuInfo.data.host_list[0].wss_port
                this.key = danmuInfo.data.token
            }
            if (this._protocol === 'flash') {
                this._server = socketServer
                this._port = socketPort
            } else {
                this._server = wsServer
                if (this._protocol === 'ws') this._port = wsPort
                if (this._protocol === 'wss') this._port = wssPort
            }
        } else {
            this._server = options.server
            this._port = options.port
        }
        this._ClientConnect()
    }

    /**
     * 断开与服务器的连接
     *
     * @memberof DMclient
     */
    public Close() {
        if (!this._connected) return
        this._connected = false
        clearTimeout(this._Timer)
        clearTimeout(this._timeout);

        this._client.close();
        // 发送关闭消息
        this.emit('close')
    }

    /**
     * 客户端连接
     *
     * @protected
     * @memberof DMclient
     */
    protected _ClientConnect() {
        let url = `${this._protocol}://${this._server}:${this._port}/sub`
        console.log(url)
        let client = new WebSocket(url);
        this._client = client
        if (client != null) {

            client.onopen =(ev) => this._ClientConnectHandler();

            client.onmessage = (ev) => this._ClientDataHandler(ev.data);
            this._client.onclose =  () => this.Close()
        }

    }

    /**
     * 客户端错误
     *
     * @protected
     * @param {DMerror} errorInfo
     * @memberof DMclient
     */
    protected _ClientErrorHandler(errorInfo: DMerror) {
        // 'error' 为关键词, 为了避免麻烦不使用
        this.emit('DMerror', errorInfo)
        if (errorInfo.status !== DMclient.errorStatus.danmaku) this.Close()
    }

    /**
     * 向服务器发送自定义握手数据
     *
     * @protected
     * @memberof DMclient
     */
    protected _ClientConnectHandler() {
        let data: string
        if (this._protocol === 'flash')
            data = JSON.stringify({
                key: this.key,
                clientver: '2.4.6-9e02b4f1',
                roomid: this.roomID,
                uid: this.userID,
                protover: 2,
                platform: 'flash'
            })
        else data = JSON.stringify({
            uid: this.userID,
            roomid: this.roomID,
            protover: 2,
            platform: 'web',
            clientver: '1.7.4',
            type: 2,
            key: this.key
        })
        this._Timer = setTimeout(() => this._ClientHeart(), 30 * 1000)
        this._ClientSendData(16 + data.length, 16, this.version, 7, 1, data)
    }

    /**
     * 心跳包
     *
     * @protected
     * @memberof DMclient
     */
    protected _ClientHeart() {
        if (!this._connected) return
        let data: string
        if (this._protocol === 'flash') data = ''
        else data = '[object Object]'
        this._timeout = setTimeout(() => {
            const errorInfo: DMclientError = {status: dmErrorStatus.timeout, error: new Error('心跳超时')}
            this._ClientErrorHandler(errorInfo)
        }, 10 * 1000)
        this._Timer = setTimeout(() => this._ClientHeart(), 30 * 1000)
        this._ClientSendData(16 + data.length, 16, this.version, 2, 1, data)
    }

    /**
     * 向服务器发送数据
     *
     * @protected
     * @param {number} totalLen 总长度
     * @param {number} [headLen=16] 头部长度
     * @param {number} [version=this.version] 版本
     * @param {number} [type=2] 类型
     * @param {number} [driver=this.driver] 设备
     * @param {string} [data] 数据
     * @memberof DMclient
     */
    protected _ClientSendData(totalLen: number, headLen = 16
        , version = this.version, type = 2, driver = 1, data?: string) {
        var newBuff = new ArrayBuffer(totalLen)
        let bufferData = new DataView(newBuff, 0, totalLen);
        bufferData.setInt32(totalLen, 0)
        bufferData.setInt16(headLen, 4)
        bufferData.setInt16(version, 6)
        bufferData.setInt32(type, 8)
        bufferData.setInt32(driver, 12)
        if (data) bufferData.set(data, headLen)
        this._client.send(bufferData)
    }

    /**
     * 解析从服务器接收的数据
     * 抛弃循环, 使用递归
     *
     * @protected
     * @param {Buffer} data
     * @memberof DMclient
     */
    protected async _ClientDataHandler(data: Buffer) {
        // 拼接数据
        if (this.__data !== undefined) {
            // 把数据合并到缓存
            this.__data = Buffer.concat([this.__data, data])
            const dataLen = this.__data.length
            const packageLen = this.__data.readInt32BE(0)
            if (dataLen >= packageLen) {
                data = this.__data
                delete this.__data
            } else return
        }
        // 读取数据
        const dataLen = data.length
        if (dataLen < 16 || dataLen > 0x100000) {
            // 抛弃长度过短和过长的数据
            const errorInfo: DMdanmakuError = {status: dmErrorStatus.danmaku, error: new TypeError('数据长度异常'), data}
            return this._ClientErrorHandler(errorInfo)
        }
        const packageLen = data.readInt32BE(0)
        if (packageLen < 16 || packageLen > 0x100000) {
            // 抛弃包长度异常的数据
            const errorInfo: DMdanmakuError = {status: dmErrorStatus.danmaku, error: new TypeError('包长度异常'), data}
            return this._ClientErrorHandler(errorInfo)
        }
        // 等待拼接数据
        if (dataLen < packageLen) return this.__data = data
        // 数据长度20时为在线人数
        if (dataLen > 20) {
            // const version = data.readInt16BE(6)
            // if (version === 2) {
            const compress = data.readInt16BE(16)
            if (compress === 0x78DA) {
                // 检查是否压缩, 目前来说压缩格式固定
                const uncompressData = await this._Uncompress(data.slice(16, packageLen))
                if (uncompressData !== undefined) {
                    this._ClientDataHandler(uncompressData)
                    if (dataLen > packageLen) this._ClientDataHandler(data.slice(packageLen))
                    return
                } else {
                    // 直接抛弃解压失败的数据
                    const errorInfo: DMdanmakuError = {
                        status: dmErrorStatus.danmaku,
                        error: new TypeError('解压数据失败'),
                        data
                    }
                    return this._ClientErrorHandler(errorInfo)
                }
            }
        }
        this._ParseClientData(data.slice(0, packageLen))
        if (dataLen > packageLen) this._ClientDataHandler(data.slice(packageLen))
    }

    /**
     * 解析消息
     *
     * @protected
     * @param {Buffer} data
     * @memberof DMclient
     */
    protected async _ParseClientData(data: Buffer) {
        switch (data.readInt32BE(8)) {
            case 3:
                // 每次发送心跳包都会接收到此类消息, 所以用来判断是否超时
                clearTimeout(this._timeout)
                this.emit('online', data.readInt32BE(16))
                break
            case 5: {
                const dataJson = await tools.JSONparse<DanmuJson>(data.toString('utf-8', 16))
                if (dataJson !== undefined) this._ClientData(dataJson)
                else {
                    // 格式化消息失败则跳过
                    const errorInfo: DMdanmakuError = {
                        status: dmErrorStatus.danmaku,
                        error: new TypeError('意外的弹幕信息'),
                        data
                    }
                    this._ClientErrorHandler(errorInfo)
                }
            }
                break
            case 8:
                this.emit('connect')
                break
            default: {
                const errorInfo: DMdanmakuError = {status: dmErrorStatus.danmaku, error: new TypeError('未知的弹幕内容'), data}
                this._ClientErrorHandler(errorInfo)
            }
                break
        }
    }

    /**
     * 发送消息事件
     *
     * @protected
     * @param {DanmuJson} dataJson
     * @memberof DMclient
     */
    protected _ClientData(dataJson: DanmuJson) {
        dataJson._roomid = this.roomID
        this.emit('ALL_MSG', dataJson)
        this.emit(dataJson.cmd, dataJson)
    }

    /**
     * 解压数据
     *
     * @protected
     * @param {Buffer} data
     * @returns {Promise<Buffer | undefined>}
     * @memberof DMclient
     */
    protected _Uncompress(data: Buffer): Promise<Buffer | undefined> {
        return new Promise<Buffer>((resolve, reject) => {
            inflate(data, (error, result) => {
                if (error === null) return resolve(result)
                else {
                    console.error(data, error)
                    return reject()
                }
            })
        })
    }
}

export default DMclient