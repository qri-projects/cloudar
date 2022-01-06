import crypto from 'crypto'
import request from 'request'
import tools from './tools'
/**
 * 登录状态
 *
 * @enum {number}
 */
enum appStatus {
  'success',
  'captcha',
  'error',
  'httpError',
}
/**
 * Creates an instance of AppClient.
 *
 * @class AppClient
 */
class AppClient {
  /**
   * Creates an instance of AppClient.
   * @memberof AppClient
   */
  constructor() {
    // 设置 Buvid
    this.headers['Buvid'] = AppClient.RandomID(37).toUpperCase()
    // 设置 Display-ID
    this.headers['Display-ID'] = `${this.headers['Buvid']}-${AppClient.TS}`
    // 设置 Device-ID
    this.headers['Device-ID'] = AppClient.RandomID(54)
  }
  public static readonly actionKey: string = 'appkey'
  public static readonly device: string = 'android'
  // bilibili 客户端
  private static readonly __secretKey: string = '560c52ccd288fed045859ed18bffd973'
  public static readonly appKey: string = '1d8b6e7d45233436'
  public static readonly build: string = '5431000'
  public static readonly mobiApp: string = 'android'
  public static readonly platform: string = 'android'
  // bilibili 国际版
  // private static readonly __secretKey: string = '36efcfed79309338ced0380abd824ac1'
  // public static readonly appKey: string = 'bb3101000e232e27'
  // public static readonly build: string = '112000'
  // public static readonly mobiApp: string = 'android_i'
  // bilibili 概念版
  // private static readonly __secretKey: string = '25bdede4e1581c836cab73a48790ca6e'
  // public static readonly appKey: string = '07da50c9a0bf829f'
  // public static readonly build: string = '591204'
  // public static readonly mobiApp: string = 'android_b'
  // bilibili TV
  // private static readonly __secretKey: string = '59b43e04ad6965f34319062b478f83dd'
  // public static readonly appKey: string = '4409e2ce8ffd12b8'
  // public static readonly build: string = '140600'
  // public static readonly mobiApp: string = 'android_tv'
  // bilibili link
  // private static readonly __secretKey: string = 'e988e794d4d4b6dd43bc0e89d6e90c43'
  // public static readonly appKey: string = '37207f2beaebf8d7'
  // public static readonly build: string = '3900007'
  // public static readonly mobiApp: string = 'biliLink'
  // public static readonly platform: string = 'android_link'
  /**
   * 谜一样的TS
   *
   * @readonly
   * @static
   * @type {number}
   * @memberof AppClient
   */
  public static get TS(): number {
    return Math.floor(Date.now() / 1000)
  }
  /**
   * 谜一样的RND
   *
   * @readonly
   * @static
   * @type {number}
   * @memberof AppClient
   */
  public static get RND(): number {
    return Math.floor(Math.random() * 1e+8) + 1e+7
  }
  /**
   * 谜一样的RandomID
   *
   * @static
   * @param {number} length
   * @returns {string}
   * @memberof AppClient
   */
  public static RandomID(length: number): string {
    const words = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let randomID = ''
    for (let i = 0; i < length; i++) randomID += words[Math.floor(Math.random() * 62)]
    return randomID
  }

  /**
   * 登录状态
   *
   * @static
   * @type {typeof appStatus}
   * @memberof AppClient
   */
  public static readonly status: typeof appStatus = appStatus
  /**
   * 验证码, 登录时会自动清空
   *
   * @type {string}
   * @memberof AppClient
   */
  public captcha: string = ''
  /**
   * 用户名, 推荐邮箱或电话号
   *
   * @abstract
   * @type {string}
   * @memberof AppClient
   */
  public userName!: string
  /**
   * 密码
   *
   * @abstract
   * @type {string}
   * @memberof AppClient
   */
  public passWord!: string
  /**
   * 登录后获取的B站UID
   *
   * @abstract
   * @type {number}
   * @memberof AppClient
   */
  public biliUID!: number
  /**
   * 登录后获取的access_token
   *
   * @abstract
   * @type {string}
   * @memberof AppClient
   */
  public accessToken!: string
  /**
   * 登录后获取的refresh_token
   *
   * @abstract
   * @type {string}
   * @memberof AppClient
   */
  public refreshToken!: string
  /**
   * 登录后获取的cookieString
   *
   * @abstract
   * @type {string}
   * @memberof AppClient
   */
  public cookieString!: string
  /**
   * 请求头
   *
   * @type {request.Headers}
   * @memberof AppClient
   */
  public headers: request.Headers = {
    'User-Agent': 'Mozilla/5.0 BiliDroid/5.43.1 (bbcallen@gmail.com)',
    'Connection': 'Keep-Alive',
  }
  /**
   * cookieJar
   *
   * @private
   * @type {request.CookieJar}
   * @memberof AppClient
   */
  private __jar: request.CookieJar = request.jar()
}
export default AppClient