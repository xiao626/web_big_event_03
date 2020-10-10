// 开发环境服务器得知
var baseURL = 'http://ajax.frontend.itheima.net';

// 处理参数
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url;

    //必须以my开头才行
    // 2.对需要权限的接口配置头信息
    if (params.url.indexOf('/my/' !== -1)) {
        params.headers = {
            // 重新登录，因为token阔气时间为12小时
            Authorization: localStorage.getItem("token") || ""
        }

    }

    // 3.拦截所有响应，判断身份认证信息
    params.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地 token
            localStorage.removeItem("token")
            // 跳转页面
            location.href = "/login.html";
        }
    }

})