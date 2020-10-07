$(function () {
    $("#links-reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#links-login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    // 密码格式
    var layer = layui.layer
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码格式
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return "两次密码格式不一致"
            }
        }
    })

    // 4.注册功能
    $("#form-reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('注册成功，请登录！');
                // 自动跳转
                $(".links").click();
                // 重置表单
                $("#form-reg")[0].reset()
            }
        })
    })

    // 5. 登录功能
    $("#form-login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('登陆成功!');
                // 保持token, 未来的接口要使用otken
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })

})