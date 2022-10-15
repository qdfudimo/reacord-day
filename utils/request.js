import util from "@/utils/util";
export const request = (name = '', data = {}) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中'
        });
        uniCloud.callFunction({
                name,
                data
            })
            .then(res=> {
                resolve(res);
            }).catch(error => {
                util.tip("请求失败", "error")
                reject(error)
            }).finally(() => {
                uni.hideLoading()
            });
    });
}