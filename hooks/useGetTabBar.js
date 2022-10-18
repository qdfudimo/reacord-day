import {
    onShow,
} from "@dcloudio/uni-app";
/**
 * 跳转tabbar
 * @param {*} index 跳转的tabbar第几项
 */
export function useGetTabBar(index) {
    onShow(() => {
        //option Api下
        //在 Vue3 中，this 对象下的 $mp 调整为 $scope
        // if (typeof this.$scope.getTabBar === 'function' &&
        //     this.$scope.getTabBar()) {
        //     this.$scope.getTabBar().setData({
        //         selected: 0
        //     })
        // }
        const curPages = getCurrentPages()[0]; // 获取当前页面实例  
        if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
            curPages.getTabBar().setData({
                selected: index
            });
        }
    });
}