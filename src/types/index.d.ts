import EventEmitter from "events";

declare module "bilibili-danmaku-client";

export default class DanmakuClient extends EventEmitter {
    constructor(room: number, options?: object)

    start();

    terminate();
}