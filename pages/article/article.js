import { ARTICLE, method } from "../../utils/api";
import { request } from "../../utils/request";
import { formatTime } from "../../utils/util";

//获取应用实例
const app = getApp();
Page({
    data: {
        isLoading: true, // 判断是否尚在加载中
        article: {}, // 内容数据
        data: {}
    },
    onLoad: function (option) {
        const id = option?.id ?? ""
        console.log(id);
        request(ARTICLE(id),method.GET).then(res => {
            if (res.success) {
                this.changeML(res.data)
            } else {
                
            }
        }).catch(res => {
            console.log(res);
        })
    },
    changeML(data) {
        let result = app.towxml(data.content, 'markdown', {
            base: 'https://www.nilbrains.com', // 相对资源的base路径
            theme: 'light', // 主题，默认`light`
            events: { // 为元素绑定的事件方法
                tap: (e) => {
                    console.log('tap', e);
                }
            }
        });
        data.updateTime = formatTime(data.updateTime)
        // 更新解析数据
        this.setData({
            data: data,
            article: result,
            isLoading: false
        });
    }
})