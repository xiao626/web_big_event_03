// 开发环境服务器得知
var baseURL = 'http://ajax.frontend.itheima.net';

// 处理参数
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url;
})