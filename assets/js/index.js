$(function () {
    // 1.获取用户信息
    gitUserInfo();

    // 2.退出
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('是否跳转到登录页面？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem("token");
            // 跳转login页面
            location.href = "login.html";
            layer.close(index);
        });
    })
})

// 获取用户信息封装函数
function gitUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为token阔气时间为12小时
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            console.log(res);
            // 判断状体码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功，渲染用户头像信息
            renderAvatar(res.data);
        }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    // 1.用户名
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 2.用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}