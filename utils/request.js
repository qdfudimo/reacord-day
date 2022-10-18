import util from "@/utils/util";
let token;
export const request = (name = '', data = {}) => {
    if (token) data.token = token;
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中'
        });
        uniCloud.callFunction({
                name,
                data
            })
            .then(res => {
                resolve(res);
            }).catch(error => {
                util.tip("请求失败", "error")
                reject(error)
            }).finally(() => {
                uni.hideLoading()
            });
    });
}

export function login() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: "weixin",
            success: (res) => {
                request("login", {
                        code: res.code
                    })
                    .then(res => {
                        if (res.result && res.result.token) token = res.result.token;
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    })
            }
        })
    })
}