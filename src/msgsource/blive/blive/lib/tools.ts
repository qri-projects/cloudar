import {rejects} from "assert";

class Tools {
    /**
     * 格式化JSON
     *
     * @template T
     * @param {string} text
     * @param {((key: any, value: any) => any)} [reviver]
     * @returns {(Promise<T | undefined>)}
     * @memberof tools
     */
    public JSONparse<T>(text: string, reviver?: ((key: any, value: any) => any)): Promise<T | undefined> {
        return new Promise<T | undefined>((resolve, reject) => {
            try {
                const obj = JSON.parse(text, reviver)
                return resolve(obj)
            }
            catch (error) {
                console.error('JSONparse', error)
                return reject()
            }
        })
    }
}

export default new Tools()