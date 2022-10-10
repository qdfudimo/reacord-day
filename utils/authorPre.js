/**
 * 向用户发起授权
 * @param {*} name 需要获取权限的 scope，详见 scope 列表https://uniapp.dcloud.net.cn/api/other/authorize.html#scope-%E5%88%97%E8%A1%A8
 * @param {*} title totast提示内容
 * @returns 
 */
export const authorize = (name, title="授权失败") => {
    return new Promise((resolve, reject) => {
        uni.authorize({
            scope: name,
            success() {
                resolve()
            },
            fail(error) {
                console.log(error);
                wx.showToast({
                    title,
                    icon: 'error'
                });
                reject()
            }
        })
    })
}
/**
 * 获取用户的当前设置
 * @param {*} name 需要获取当前权限的 scope
 * @returns 用户授权结果，其中 key 为 scope 值，value 为 Boolean 值，表示用户是否允许授权
 */
export const getSetting =(name)=> {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                resolve(res.authSetting[name])
            },
            fail(error) {
                reject(error)
            }
        })
    })
}
/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果。
 * @param {*} name 需要获取当前权限的 scope
 * @returns 
 */
export const openSetting =(name)=> {
    return new Promise((resolve, reject) => {
        uni.openSetting({
            success(res) {
                resolve(res.authSetting[name])
            },
            fail(error) {
                reject(error)
            }
        })
    })
}